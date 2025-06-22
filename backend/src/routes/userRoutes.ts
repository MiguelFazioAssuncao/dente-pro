import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/register", async (req, res) => {
  await UserController.createUser(req, res);
});
router.post("/login", async (req, res) => {
 await UserController.loginUser(req, res);
});

router.get("/profile", async (req, res) => {
    await UserController.getUserProfile(req, res);
});


export default router;