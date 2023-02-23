import { executeSQL, getQuery, insertSQL } from "./mysql.utils"

export const createNewFood = (userId: string, name: string, image: string, actualPrice: number, sellingPrice: number) => {
  return insertSQL(`food_${userId}`, `name, image, actual_price, selling_price`, `'${name}', '${image}', '${actualPrice}', '${sellingPrice}'`)
}

export const deleteFood = (userId: string, foodId: string) => {
  return executeSQL(`DELETE FROM food_${userId} WHERE id='${foodId}'`)
}

export const updateFood = (userId: string, foodId: string, props: object) => {
  console.log(`props`, props)
  const propsKeys = Object.keys(props);
  const propsValues = Object.values(props);
  const cols = (propsKeys.map((arrKey, i) => `${arrKey} = '${propsValues[i]}'`)).toString();
  console.log(cols)
  const sql = `UPDATE food_${userId} SET ${cols} WHERE id='${foodId}'`;
  console.log(`sql`, sql)
  executeSQL(sql)
}

export const getFood = async (userId: string, foodId: string) => {
  return (await getQuery(`SELECT * FROM food_${userId} WHERE id='${foodId}'`));
}

export const getFoodList = async (userId: string) => {
  return (await getQuery(`SELECT * FROM food_${userId}`));
}