

import { generateRandomNumber } from "./general.utils";
import { createTable, dropTable, executeSQL, getQuery, insertSQL } from "./mysql.utils";

export const authUser = async (username: string, password: string) => {
    const user = (await getQuery(`SELECT id FROM users WHERE username='${username}' AND password='${password}'`));
    if (user == null || user.length == 0) return null;
    return user[0].id;
}

export const userExists = async (username: string | null, email: string | null) => {
    const userE = (await getQuery(`SELECT id FROM users WHERE username='${username}'`));
    const emailE = (await getQuery(`SELECT id FROM users WHERE email='${email}'`));
    return ((username && userE?.length != 0) || (email && emailE?.length != 0));
}

export const getUser = async (username: string) => {
    const user = (await getQuery(`SELECT * FROM machines WHERE username='${username}'`));
    if (user == null || user.length == 0) return null;
    return user[0];
}

export const createNewUser = async (username: string, email: string, password: string) => {
    if (await userExists(username, email)) return false;
    const random = generateRandomNumber();
    insertSQL(`users`, `id, username, email, password`, `'${random}', '${username}', '${email}', '${password}'`)
    createTable(`food_${random}`, `id int NOT NULL AUTO_INCREMENT, name varchar(255), image varchar(255), actual_price varchar(255), selling_price varchar(255), PRIMARY KEY (id)`)
    return true;
}

export const deleteUser = async (username: string) => {
    if (!(await userExists(username, null))) return false;
    executeSQL(`DELETE FROM users WHERE username='${username}'`)
    dropTable(`food_${username}`)
    return true;
}