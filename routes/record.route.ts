import express from "express";
import { getFood, getFoodList } from "../services/food.utils";
import { createNewRecord, deleteRecord } from "../services/record.utils";

const router = express.Router();

router.post("/new", async (req: any, res: any) => {
  const machineId = req.body.machineId,
    foodId = req.body.foodId
  try {
    res.json(await createNewRecord(machineId, foodId))
  } catch {
    res.json(false);
  }
});

router.post("/delete", async (req: any, res: any) => {
  const recordId = req.body.id
  try {
    res.json(await deleteRecord(recordId))
  } catch {
    res.json(false);
  }
});

module.exports = router;