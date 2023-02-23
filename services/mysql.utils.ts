const e = require("express");
const mysql = require("mysql");

let con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "voting123",
  database: "pizza",
});

async function dbConnect() {
  con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "voting123",
    database: "pizza",
  });
  con.connect();
}

const formatMsg = (msg: string) => {
  return `MySQL: ${msg}`;
};

const formatError = (msg: string) => {
  return `MySQL Error: ${msg}`;
};

export async function executeSQL(sql: string) {
  console.log(`sql`, sql)
  return new Promise(async (resolve, reject) => {
    await dbConnect();
    con.query(sql, (err: any) =>
      (err) ? reject(formatError(err.sqlMessage)) : resolve(formatMsg(`1 record inserted`))
    );
  });
}

export const createTable = async (tableName: string, fields: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const sql = `CREATE TABLE ${tableName} (${fields})`;
      console.log(sql)
      await executeSQL(sql)
      resolve();
    } catch (e) {
      reject();
    }
  })
}

export const dropTable = async (tableName: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await executeSQL(`DROP TABLE ${tableName};`)
      resolve();
    } catch (e) {
      reject();
    }
  })
}

export const insertSQL = async (tableName: string, template: string, values: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await executeSQL(`INSERT INTO ${tableName} (${template}) VALUES(${values})`)
      resolve();
    } catch (e) {
      reject();
    }
  })
}

export async function getQuery(sql: string) {
  return new Promise<any[] | null>(async (resolve, reject) => {
    await dbConnect();
    con.query(sql, (err: boolean, result: { id: number }[] | null) => {
      if (err) reject();
      resolve(result);
    });
    con.end();
  });
}

export async function deleteRow(sql: string) {
  return new Promise(async (resolve, reject) => {
    await dbConnect();
    con.query(sql, function (err: boolean, result: any) {
      if (err) reject()
      resolve(result);
    });
    con.end();
  })
}