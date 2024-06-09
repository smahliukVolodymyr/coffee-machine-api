import Router from "express";
import Controller from "../controllers/controller.js";

const router = new Router();

router.put("/admin/refil", Controller.refill);

export default router;
