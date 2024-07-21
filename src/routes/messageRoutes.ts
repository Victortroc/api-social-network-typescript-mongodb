import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/update";
import * as MessageController from "../controllers/MessageController";
import isAuth from "../middleware/isAuth";

const messageRoutes = Router();

const upload = multer(uploadConfig);

messageRoutes.get("/messages/:postId", isAuth, MessageController.index);

messageRoutes.post(
    "/messages/:postId", 
    isAuth, 
    upload.array("medias"), 
    MessageController.store
);

export default messageRoutes;
