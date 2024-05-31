import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import prisma from '../config/database';

dotenv.config();

interface IToken {
    id: number,
    email: string ,
}
export interface CustomRequest extends Request {
    user?: any; // ou substitua 'any' pelo tipo correto se souber o tipo exato
}


class JWTToken {
    verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) return false
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) return res.status(500).json({ message: 'Chave secreta não definida' });

            const decoded = jwt.verify(accessToken, secret) as unknown as { data: IToken, type: string } | null;
            if (!decoded || decoded.type !== 'access') {
                return res.status(401).json({ message: 'AccessToken inválido' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'AccessToken inválido' });
        }
    }
    createAccessToken(payload: IToken, refresh = 0 || false) {
        if (!payload) return false;
        const secret = process.env.JWT_SECRET
        if (!secret) {
            return false
        }
        return jwt.sign({ data: payload, type: refresh ? 'refresh' : 'access' }, secret, {
            expiresIn: refresh
                ? process.env.JWT_REFRESH
                : process.env.JWT_ACCESS,
        });
    };

    refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const auth = new JWTToken()
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) return res.status(500).json({ message: 'Chave secreta não definida' });

            const decoded = jwt.verify(refreshToken, secret) as { data: IToken, type: string } | null;
            if (!decoded || decoded.type !== 'refresh') {
                return res.status(401).json({ message: 'Refresh token inválido' });
            }

            console.log(decoded.data, 'Kaaudansdnasdnsndasndnas 88888888888')
            const accessToken = auth.createAccessToken(decoded.data)
            console.log('data', decoded.data);
            console.log('NRT', accessToken);

            res.json({ accessToken });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Refresh token inválido' });
        }
    };

    createRefreshToken(payload: IToken) {
        return this.createAccessToken(payload, true);
    };
    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ error: 'O email é obrigatório' });
            }

            const existingUser = await prisma.admin.findMany({
                where: {
                    email: email,
                },
            });

            if (existingUser.length !== 0) {
                return res.status(409).json({ error: 'Este email já está em uso' });
            }
            next();
        } catch (error) {
            console.error('Erro ao verificar o email:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new JWTToken;