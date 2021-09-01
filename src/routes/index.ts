import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as Auth from "../middlewares/AuthMiddleware";
import * as Verify from "../verifications/Verify";

const router = Router();

router.post("/signup", Verify.signup, UserController.signup);

router.post("/signin", Verify.signin, UserController.signin);

router.get("/users", Auth.get, UserController.users);

router.get("/user/:idUser", Auth.get, UserController.user);

router.put("/update/:idUser", Verify.update, Auth.post, UserController.update);

router.delete("/deletar/:idUser", Auth.post, UserController.deletar);

export default router;