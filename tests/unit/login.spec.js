const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { login } = require('../../service/login_service')


describe("Test Login", () => {
    let email = 'akeon@mail.com'
    let password = 'rahasia123'

    test("test Login email dan password benar -> success", async () => {
        try {
            let result = await login(email, password)
            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('email')
            expect(result).toHaveProperty('password')
            expect(result.email).toBe(email)
            expect(result.password).toBe(password)
        } catch (err) {
            throw error
        }
    })
    test("test Login email tidak terdaftar -> failed", async () => {
        try {
            let result = await login("randome@gmail", password)
            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('email')
            expect(result).toHaveProperty('password')
            expect(result.email).toBe(email)
            expect(result.password).toBe(password)
        } catch (err) {
            expect(err).toBe('Email tidak terdaftar')
        }
    })
    test("test Login email terdaftar dan password salah -> failed", async () => {
        try {
            let result = await login(email, "password salah")
            expect(result).toHaveProperty('id')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('email')
            expect(result).toHaveProperty('password')
            expect(result.email).toBe(email)
            expect(result.password).toBe(password)
        } catch (err) {
            expect(err).toBe('Password tidak sesuai')
            
        }
    })


    
})