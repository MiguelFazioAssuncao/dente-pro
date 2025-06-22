import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  email: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    // Adiciona o usuário decodificado ao objeto req para uso nas rotas protegidas
    // O TypeScript não reconhece por padrão a propriedade 'user' no objeto Request.
    // Por isso, o uso de 'as any' para evitar erros de tipagem ao adicionar a propriedade personalizada.
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado." });
    return;
  }
}
