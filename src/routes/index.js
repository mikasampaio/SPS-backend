import { Router } from "express";
import { baseRoutes } from "./baseRoutes.js";
import { userRoutes } from "./user.js";
import { sessionRoutes } from "./session.js";
import authMiddleware from "../middlewares/authentication.js";
import chechedId from "../middlewares/checkedId.js";

export const routes = Router();

routes.use("/", baseRoutes);
routes.use("/session", sessionRoutes);

routes.use(authMiddleware);
routes.use("/user", userRoutes);
