import { executeSQL, getQuery, insertSQL } from "./mysql.utils"

export const createNewMachine = (name: string, max_stock: number, max_rows: number, location: string, token: string) => {
  insertSQL(`machines`, `name, status, max_stock, max_rows, stock, temperature, available, location, reason, token, owner`, `'${name}', '${false}', '${max_stock}', '${max_rows}', '${0}', '${0}', '${false}', '${location}', null, '${token}', null`)
}

export const deleteMachine = (machineId: string) => {
  return executeSQL(`DELETE FROM machines WHERE id='${machineId}'`)
}

export const updateMachine = async (machineId: string, props: object) => {
  const propsKeys = Object.keys(props);
  const propsValues = Object.values(props);
  const cols = (propsKeys.map((arrKey, i) => `${arrKey} = '${propsValues[i]}'`)).toString();
  console.log(cols)
  await executeSQL(`UPDATE machines SET ${cols} WHERE id='${machineId}'`)
}

export const getMachine = async (machineId: string) => {
  const machine = (await getQuery(`SELECT * FROM machines WHERE id='${machineId}'`));
  if (machine == null || machine.length == 0) return null;
  return machine[0];
}

export const getMachines = async (userId: string) => {
  return (await getQuery(`SELECT * FROM machines WHERE owner='${userId}'`));
}