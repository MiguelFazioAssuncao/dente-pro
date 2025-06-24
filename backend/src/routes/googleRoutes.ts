import { handleGoogleCallback, redirectGoogle } from '../controllers/AuthGoogleController';
import { Router } from 'express';

const router = Router();

router.get("google", async (req, res) => {
    await redirectGoogle(req, res);
});

router.get("/google/callback", async (req, res) => {
    await handleGoogleCallback(req, res);
});

export default router;