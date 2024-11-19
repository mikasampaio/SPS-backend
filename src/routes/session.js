import { Router } from "express";
import jwt from "jsonwebtoken";
import { users } from "./user.js";
import authConfig from "../config/authConfig.js";

export const sessionRoutes = Router();

sessionRoutes.post("/", (req, res) => {
  const { email, password } = req.body;

  const isExistsUser = users.find((user) => user.email === email);

  if (!isExistsUser) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (isExistsUser.password !== password) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }

  res.status(200).json({
    ...isExistsUser,
    token: jwt.sign({ id: isExistsUser.id }, authConfig.secretKey, {
      expiresIn: authConfig.expiresIn,
    }),
  });
});
