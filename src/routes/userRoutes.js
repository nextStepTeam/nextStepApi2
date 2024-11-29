import userController from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getUsers);


export default router;