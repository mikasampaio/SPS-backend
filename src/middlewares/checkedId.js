import { users } from "../routes/user.js";

export default function chechedId(req, res, next) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "ID é obrigatório" });
  }

  const findUserIndex = users.findIndex((user) => user.id === id);

  if (findUserIndex < 0) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  req.id = id;
  req.userIndex = findUserIndex;

  next();
}
