import {
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import express from "express";

const productRouter = express.Router();

productRouter.get("/getproducts", getProductController);

productRouter.post("/addproducts", addProductController);

productRouter.put("/updateproducts", updateProductController);

productRouter.post("/deleteproducts", deleteProductController);

export default productRouter;
