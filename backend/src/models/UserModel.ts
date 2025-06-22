import { pool } from "../database/db";

class UserModel {
    async createUser(email: string, password: string): Promise<void> {
        const query = "INSERT INTO users (email, password) VALUES ($1, $2)";
        const values = [email, password];

        try {
            await pool.query(query, values);
            console.log("Usuário criado no banco de dados.");
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw error;
        }
    }

    async findUserByEmail(email: string): Promise<{ id: number; email: string; password: string } | null> {
        const query = "SELECT id, email, password FROM users WHERE email = $1";
        const values = [email];

        try {
            const result = await pool.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw error;
        }
    }
}

export default new UserModel();
