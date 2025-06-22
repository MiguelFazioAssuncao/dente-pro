import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/userSchema";
import UserService from "../services/UserService";

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const userData = registerSchema.parse(req.body);
            await UserService.createUser(userData);
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error: any) {
            console.error("erro ao tentar criar usuário:", error);
            if (error.code === "23505") {
                return res.status(409).send("Email já cadastrado");
            }
            res.status(500).send("Erro no cadastro");
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const loginData = loginSchema.parse(req.body);
            const token = await UserService.loginUser(loginData);
            return res.status(200).json({ token });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    async getUserProfile(req: Request, res: Response) {
        try {
            const user = req.body.user;
            return res.status(200).json({
                message: "Perfil acessado com sucesso!",
                user,
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();
