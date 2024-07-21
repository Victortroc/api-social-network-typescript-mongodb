import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import isAuth from "../middleware/isAuth";

const userRoutes = Router();

userRoutes.get('/users', isAuth, UserController.index);
userRoutes.post('/users', isAuth, UserController.create);

export default userRoutes;
