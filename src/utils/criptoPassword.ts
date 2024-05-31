import bcrypt from 'bcrypt'

const hashPassowrd = (password: string) => {
    const saltsRoudds = 10
    return bcrypt.hash(password, saltsRoudds)
}

const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}

export default { hashPassowrd, comparePassword }