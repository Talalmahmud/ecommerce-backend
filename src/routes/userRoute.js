import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUserById,
  userLogin,
} from "../controllers/userController.js";
import { userAuth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/user/login", userLogin);
router.post("/user", createUser);
router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUserById);
router.put("/user/:id", userAuth, roleCheck("User"), updateUserById);

export default router;
