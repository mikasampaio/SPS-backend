import { Router } from "express";
import { v4 } from "uuid";
import chechedId from "../middlewares/checkedId.js";

export const userRoutes = Router();

export let users = [
  {
    id: "ad3332da-6def-4dcd-8c0e-9920cd40a6e3",
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
];

userRoutes.get("/", (req, res) => {
  res.json(users);
});

userRoutes.post("/", (req, res) => {
  const { email, name, password, type } = req.body;

  const isExistsUser = users.find((user) => user.email === email);

  if (isExistsUser) {
    return res.status(400).json({ message: "Usuário já existente" });
  }

  const newUser = {
    id: v4(),
    name,
    email,
    type,
    password,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

userRoutes.put("/", chechedId, (req, res) => {
  const { id, userIndex } = req;
  const user = req.body;

  const updatedUser = { ...user, id };

  users[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});

userRoutes.patch("/", chechedId, (req, res) => {
  const { id, userIndex } = req;
  const user = req.body;

  const updatedUser = { ...users[userIndex], ...user };

  users[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});

userRoutes.delete("/", chechedId, (req, res) => {
  const { id } = req;

  users = users.filter((user) => user.id !== id);

  res.status(200).json({
    message: "Usuário deletado com sucesso",
  });
});
