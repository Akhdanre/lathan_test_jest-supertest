const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { deleteAllUsers, createUser, getUserById } = require('../../service/users_service')

let user = {}
describe('Test createUser()', () => {
    let name = 'akeon'
    let email = 'akeon@mail.com'
    let password = 'rahasia123'

    beforeAll(async () => {
        await deleteAllUsers()
    })

    test('test Email belum terdaftar -> success', async () => {
        try {


            let result = await createUser(name, email, password)
            user = result
            //response
            // id: 1
            // name: 'akeon'
            // email: 'akeon@mail.com'
            // password: 'rahasia123'


            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('email')
            expect(result).toHaveProperty('password')
            expect(result.name).toBe(name)
            expect(result.email).toBe(email)
            expect(result.password).toBe(password)
        } catch (err) {
            expect(err).toBe('error')
        }

    })


    test('test Email sudah dipakai -> failed', async () => {
        try {
            await createUser(name, email, password)
        } catch (err) {
            expect(err).toBe('email sudah dipakai')

        }
    })
})



describe("test getUserById", () => {
    test("test user exist or registered -> success", async () => {
        try {
            let result = await getUserById(user.id)

            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('email')
            expect(result).toHaveProperty('password')
            expect(result.name).toBe(user.name)
            expect(result.email).toBe(user.email)
            expect(result.password).toBe(user.password)
        } catch (err) {
            expect(err).toBe('error')
        }
    })
    test("test user doesn't exist or not registered -> failed", async () => {
        try {
            await getUserById(user.id)
        } catch (err) {
            expect(err).toBe('User not registered')
        }
    })
})