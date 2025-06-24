import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { pool } from "../database/db";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const redirectGoogle = (req: Request, res: Response) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });

  res.redirect(authUrl);
};

export const handleGoogleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send("Invalid token payload");
    }

    const { email, name, sub: googleId } = payload;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    let user = result.rows[0];

    if (!user) {
      const insertResult = await pool.query(
        "INSERT INTO users (email, google_id, name) VALUES ($1, $2, $3) RETURNING *",
        [email, googleId, name]
      );
      user = insertResult.rows[0];
    }

    console.log("Usuário autenticado:", user);

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.redirect(`http://localhost:5173/auth/callback?token=${jwtToken}`);
  } catch (error) {
    console.error("Erro ao processar o callback do Google:", error);
    res.status(500).json({ error: "Erro ao processar o login com Google" });
  }
};
