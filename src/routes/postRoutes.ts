import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/update";
import * as PostController from "../controllers/PostController";
import isAuth from "../middleware/isAuth";

const postRoutes = Router();

const upload = multer(uploadConfig);

postRoutes.get("/posts", isAuth, PostController.index);

postRoutes.post(
    "/posts", 
    isAuth, 
    upload.array("medias"), 
    PostController.create
);

export default postRoutes;
