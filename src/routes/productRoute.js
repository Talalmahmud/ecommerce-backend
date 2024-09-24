import express from "express";
import {
  createProduct,
  deleteProduct,
  getAll,
  getById,
  updateProduct,
} from "../controllers/productController.js";
import { userAuth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/product", userAuth, roleCheck("Admin"), createProduct);
router.get("/product", getAll);
router.get("/product/:id", getById);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;
