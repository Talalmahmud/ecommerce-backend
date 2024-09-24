import express from "express";
import {
  createCategory,
  deleteItemById,
  getAllCategory,
  getCategoryById,
  updateItemById,
} from "../controllers/categoryController.js";

import { userAuth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/category", userAuth, roleCheck("Admin"), createCategory);
router.get("/category", getAllCategory);
router.get("/category/:id", userAuth, roleCheck("Admin"), getCategoryById);
router.delete("/category/:id", userAuth, roleCheck("Admin"), deleteItemById);
router.put("/category/:id", userAuth, roleCheck("Admin"), updateItemById);

export default router;
