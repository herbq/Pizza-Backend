import { authUser, createNewUser, deleteUser } from "../services/user.utils";
import express from "express";

const router = express.Router();

router.post("/auth", async (req: any, res: any) => {
  const username = req.body.username,
    password = req.body.password;
  try {
    res.json(await authUser(username, password))
  } catch {
    res.json(null);
  }
});

router.post("/new", async (req: any, res: any) => {
  const username = req.body.username,
    email = req.body.email,
    password = req.body.password;
  try {
    res.json(await createNewUser(username, email, password))
  } catch {
    res.json(false);
  }
});

router.post("/delete", async (req: any, res: any) => {
  const username = req.body.username
  try {
    res.json(await deleteUser(username))
  } catch {
    res.json(false);
  }
});

router.get("/auth", async (req: any, res: any) => {
  res.json({ text: `hello world` })
});

module.exports = router;