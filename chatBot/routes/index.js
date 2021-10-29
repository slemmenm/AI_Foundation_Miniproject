import express from "express";
const router = express.Router();
import { IndexController } from "../controllers/indexController.js";

/* GET home page. */
router.get("/", IndexController.showChatBot.bind(IndexController));
router.post("/answer", IndexController.calculateAnswer.bind(IndexController));
router.get("/resetContext", IndexController.newSessionId.bind(IndexController));

export const indexRouter = router;
