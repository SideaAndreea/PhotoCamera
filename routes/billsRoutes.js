import {
  addBillsController,
  getBillsController,
} from "../controllers/billsController.js";
import express from "express";

const billsRouter = express.Router();

billsRouter.post("/addbills", addBillsController);

billsRouter.get("/getbills", getBillsController);

export default billsRouter;
