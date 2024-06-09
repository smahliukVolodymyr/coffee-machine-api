import Router from "express";
import Controller from "../controllers/controller.js";

const router = new Router();

router.put("/user/topup/:money", Controller.balanceTopUp);
router.post("/user/buy", Controller.buyDrinks);

export default router;
