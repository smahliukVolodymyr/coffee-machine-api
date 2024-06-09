import Router from "express";
import Controller from "../controllers/controller.js";

const router = new Router();

router.get("/coffee_machine/drinks", Controller.getDrinksList);
router.get("/coffee_machine/balance", Controller.getBalance);

export default router;
