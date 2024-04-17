const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    login: async (email, password) => {
        try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) throw "Email tidak terdaftar"
            if (user.password !== password) throw "Password tidak sesuai"
            return user
        } catch (err) {
            throw err
        }
    },
};