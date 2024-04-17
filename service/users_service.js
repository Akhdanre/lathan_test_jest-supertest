const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    deleteAllUsers: async () => {
        try {
            await prisma.user.deleteMany()
        } catch (err) {
            return err
        }
    },
    createUser: async (name, email, password) => {
        try {
            let usersExist = await prisma.user.findUnique({ where: { email } })
            if (usersExist) throw 'email sudah dipakai'
            let users = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })
            return users
        } catch (err) {
            throw err
        }
    },
    getUserById: async (userId) => {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) throw 'User not registered';
            return user;
        } catch (err) {
            throw err;
        }
    }

}