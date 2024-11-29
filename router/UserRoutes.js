import { Router } from "express";
import { login, register,logout } from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post('/register',register);

router.post("/login",login)

router.post("/logout", isAuthenticated, logout);



export default router;