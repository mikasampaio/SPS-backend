import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ").at(1);

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    jwt.verify(token, authConfig.secretKey, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.userId = result.id;
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno ao verificar token" });
  }

  next();
}
