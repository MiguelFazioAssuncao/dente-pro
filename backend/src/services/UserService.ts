import UserModel from "../models/UserModel";
import { RegisterInput, LoginInput } from "../schemas/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    async createUser(userData: RegisterInput) {
        const { email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.createUser(email, hashedPassword);
    }

    async loginUser(loginData: LoginInput) {
        const { email, password } = loginData;
        const user = await UserModel.findUserByEmail(email);

        if (!user) {
            const error: any = new Error("Usuário não encontrado.");
            error.name = "AuthError";
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error: any = new Error("Senha incorreta.");
            error.name = "AuthError";
            throw error;

        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        return token;
    }
}

export default new UserService();
