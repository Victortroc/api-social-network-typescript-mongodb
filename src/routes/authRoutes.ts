import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as SessionController from "../controllers/SessionController";
import isAuth from "../middleware/isAuth";

const authRoutes = Router();

authRoutes.post("/signup", UserController.create);
authRoutes.post("/login", SessionController.store);
authRoutes.post("/refresh_token", SessionController.update);
authRoutes.delete("/logout", isAuth, SessionController.remove);
authRoutes.get("/me", isAuth, SessionController.me);

export default authRoutes;