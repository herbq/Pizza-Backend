import express from "express";
import { createNewFood, deleteFood, getFood, getFoodList, updateFood } from "../services/food.utils";

const router = express.Router();

router.post("/:userId", async (req: any, res: any) => {
  console.log(`/POST`)
  const { userId } = req.params;
  const { name, image, actualPrice, sellingPrice } = req.body;

  try {
    createNewFood(userId, name, image, actualPrice, sellingPrice)
    res.status(200).end()
  } catch {
    res.status(400).end()
  }
});

router.put("/:userId/:foodId", async (req: any, res: any) => {
  console.log(`/PUT`)
  const { userId, foodId } = req.params;
  const props = req.body;
  
  try {
    updateFood(userId, foodId, { name: props.name, image: props.image, actual_price: props.actualPrice, selling_price: props.sellingPrice })
    res.status(200).end()
  } catch {
    res.status(400).end()
  }
});

router.delete("/:userId/:foodId", async (req: any, res: any) => {
  console.log(`/DELETE`)
  const { userId, foodId } = req.params;

  try {
    deleteFood(userId, foodId)
    res.status(200).end()
  } catch {
    res.status(400).end()
  }
});

router.get("/list/:userId", async (req: any, res: any) => {
  console.log(`/GET LIST`)
  const { userId } = req.params
  try {
    const foodList = await getFoodList(userId);
    res.status(200).json(foodList)
  } catch {
    res.status(400).json([])
  }
});

router.get("/:userId/:foodId", async (req: any, res: any) => {
  console.log(`/GET`)
  const { userId, foodId } = req.params
  try {
    res.status(200).json(await getFood(userId, foodId))
  } catch {
    res.status(400).json([])
  }
});

module.exports = router;