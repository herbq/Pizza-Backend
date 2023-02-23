import express from "express";
import { createNewMachine, deleteMachine, getMachine, getMachines, updateMachine } from "../services/machine.utils";
import { createNewRecord, deleteRecord } from "../services/record.utils";

const router = express.Router();

router.get("/list/:id", async (req: any, res: any) => {
  const ownerId = req.params.id
  try {
    const machines = await getMachines(ownerId);
    console.log(machines)
    res.status(200).json(machines)
  } catch {
    res.status(400).json([])
  }
});

router.get("/:id", async (req: any, res: any) => {
  const machineId = req.params.id;
  try {
    res.status(200).json(await getMachine(machineId))
  } catch {
    console.log(`bad`)
    res.status(400).json([])
  }
});

router.post("/new", async (req: any, res: any) => {
  const name = req.body.name,
    maxStock = req.body.maxStock,
    maxRows = req.body.maxRows,
    stock = req.body.stock,
    location = req.body.location,
    token = req.body.token
  try {
    createNewMachine(name, maxStock, maxRows, location, token)
    res.status(200).end()
  } catch {
    res.status(400).end();
  }
});

router.post("/delete", async (req: any, res: any) => {
  const machineId = req.body.id
  try {
    await deleteMachine(machineId)
    res.status(200).end()
  } catch {
    res.status(400).end()
  }
});

router.put(`/:id`, async (req: any, res: any) => {
  const machineId = req.params.id;
  const props = req.body;
  console.log({ props })
  try {
    updateMachine(machineId, props)
    res.status(200).end();
  } catch {
    res.status(400).end();
  }
})

router.put(`/validate/:machineId/:userId`, async (req: any, res: any) => {
  const { machineId, userId } = req.params;
  console.log({machineId})
  try {
    const machine = await getMachine(machineId);
    if (machine == null) {
      console.log(`invalid id`)
      res.status(400).send({ msg: `Invalid Machine Id` });
      return;
    }
    if (machine.owner == null) {
      console.log(`updated owner`)
      await updateMachine(machineId, { owner: userId })
      res.status(200).send({ msg: `Success` })
      return null;
    }
    res.status(400).send({ msg: `This machine is already taken` });
  } catch {
    res.status(400).send({ msg: `Something went wrong!F` });
  }
})

module.exports = router;