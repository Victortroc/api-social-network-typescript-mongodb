import { Router } from "express";

import postRoutes from "./postRoutes";
import messageRoutes from "./messageRoutes";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const routes = Router();

routes.use(postRoutes);
routes.use(messageRoutes);
routes.use(userRoutes);
routes.use(authRoutes);

export default routes;