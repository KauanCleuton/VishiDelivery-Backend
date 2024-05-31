import prisma from "../config/database";
import criptoPassword from "../utils/criptoPassword";

interface IUser {
    name: string,
    email: string,
    password: string
}

interface ILogin {
    email: string,
    password: string 
}

const registerAdmin = async (data: IUser) => {
    try {
        const hashPassword = await criptoPassword.hashPassowrd(data.password);

        const admin = await prisma.admin.create({
            data: {
                name: data.name,
                email: data.email,
                senha: hashPassword,
            }
        });

        return admin;
    } catch (error) {
        console.error("Erro ao registrar um novo admin:", error);
        throw error;
    }
}


const loginAdmin = async (data: ILogin) => {
    try {
        const login = await prisma.admin.findMany({
            where: {
                email: data.email
            }
        })

        if (login.length === 0) {
            throw new Error("User not exists")
        }

        const hashedPassword = login[0].senha;
        if (hashedPassword === null) {
            throw new Error("A senha está faltando para este usuário");
        }
        
        const comparePassword = await criptoPassword.comparePassword(data.password, hashedPassword);

        if (!comparePassword) {
            throw new Error('Email or password is invalid')
        }

        return login[0]; // Retorna os dados do usuário logado
    } catch (error) {
        console.error('Erro ao fazer login do admin:', error)
        throw error
    }
}

export default { registerAdmin, loginAdmin }