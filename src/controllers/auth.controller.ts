import { Request, response, Response } from "express"
import authModel from "../models/auth.model"
import authMiddleware from "../middleware/auth.middleware"

const registerAdmin =  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            return res.status(409).json({ message: 'Campos inválidos!' })
        }
        const data = {
            name,
            email,
            password
        }
        console.log(data)
        const userAdmin = await authModel.registerAdmin(data)
        return res.status(201).json({message: 'Admin registrado!', userAdmin})
    } catch (error) {
        console.log('Erro ao fazer registro')
        return res.status(500).json({ message: 'Erro ao fazer registro!' })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(409).json({ message: 'Campos Inválidos' })
        }
        const data = {
            email,
            password
        }
        const user = await authModel.loginAdmin(data)
        const tokenPayload = {
            id: user.idAdmin,
            email: user.email || "",
        }
        const accessToken = authMiddleware.createAccessToken(tokenPayload)
        const refreshToken = authMiddleware.createRefreshToken(tokenPayload)

        const response = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: `Usuário logado com o email: ${user.email}`
        }

        return res.status(200).json({response})
    } catch (error) {
        console.log('Erro ao fazer login do admin:', error)
        return res.status(500).json({ message: 'Erro ao fazer login do admin!' })
    }
}


export default { registerAdmin, login }