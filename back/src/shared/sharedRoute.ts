import express from "express";
import SharedController from "./sharedController";

const router = express.Router();

router.get("/vehicle", SharedController.vehicleList);
router.get("/guide", SharedController.guideList);

export default router;
