import express from "express";
import PostController from "./postController";
import CheckService from "../services/CheckService";

const router = express.Router();

router.get("/get/id", PostController.getPostByIdController);
router.post(
  "/create",
  CheckService.isAdminToken,
  PostController.createController
);
router.get("/get/:id", PostController.getAllPostsController);
router.get("/image_file/show/:fileName", PostController.showImage);
router.delete(
  "/delete/:id_post",
  CheckService.isAdminToken,
  PostController.deletePost
);
router.put(
  "/update/:id_post",
  CheckService.isAdminToken,
  PostController.updatePost
);

export default router;
