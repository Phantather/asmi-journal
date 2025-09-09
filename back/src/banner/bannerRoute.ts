import express from "express";
import bannerController from "./bannerController";
import CheckService from "../services/CheckService";

const router = express.Router();

router.post(
  "/save",
  CheckService.isAdminToken,
  bannerController.saveBannerController
);
router.get("/list", bannerController.getBannerController);
router.delete(
  "/delete",
  CheckService.isAdminToken,
  bannerController.deleteBannerController
);
router.put(
  "/update",
  CheckService.isAdminToken,
  bannerController.updateBannerController
);
router.get("/image_file/show/:fileName", bannerController.showImage);

export default router;
