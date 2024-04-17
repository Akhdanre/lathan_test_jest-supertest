const request = require('supertest')
const app = require('../../app')


describe("test POST /api/v1/login", () => {
    let name = 'ouken'
    let email = 'ouken@mail.com'
    let password = 'rahasia123'
    let token = "lkjslfkuwn22913b3lkx93"


    test('test email dan password benar -> success', async () => {
        try {
            let { statusCode, body } = await request(app).post('/api/v1/auth').send({ name, email, password })

            expect(statusCode).toBe(200)
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('email')
            expect(body.data).toHaveProperty('token')
            expect(body.data.name).toBe(name)
            expect(body.data.email).toBe(email)
            expect(body.data.token).toBe(token)
        } catch (error) {
            expect(error).toBe("error")
        }
    })
    test('test email tidak terdaftar -> failed', async () => {
        try {
            let email = "random@gmail.com"
            let { statusCode, body } = await request(app).post('/api/v1/auth').send({ name, email, password })
            expect(statusCode).toBe(400)
        } catch (error) {
            expect(error).toBe('Email tidak terdaftar');
        }
    })
    test('test email terdaftar tetapi password salah -> failed', async () => {
        try {
            let password = "passwordSalah"
            let { statusCode, body } = await request(app).post('/api/v1/auth').send({ name, email, password })
            expect(statusCode).toBe(400)
        } catch (error) {
            expect(error).toBe('Password tidak sesuai');
        }
    })
})