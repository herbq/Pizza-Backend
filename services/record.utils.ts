import { executeSQL, getQuery, insertSQL } from "./mysql.utils"

export const createNewRecord = (machineId: string, foodId: string) => {
  return insertSQL(`records`, `machindId, foodId`, `'${machineId}', '${foodId}'`)
}

export const deleteRecord = (recordId: string) => {
  return executeSQL(`DELETE FROM records WHERE id='${recordId}'`)
}

export const getRecords = async (machineId: string) => {
  return (await getQuery(`SELECT * FROM records WHERE machine_id='${machineId}'`));
}