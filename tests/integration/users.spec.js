const request = require('supertest')
const app = require('../../app')


describe("test POST /api/v1/users", () => {
    let name = 'ouken'
    let email = 'ouken@mail.com'
    let password = 'rahasia123'


    test('test email belum terdaftar -> success', async () => {
        try {
            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password })

            expect(statusCode).toBe(201)
            expect(body).toHaveProperty('status')
            expect(body).toHaveProperty('message')
            expect(body).toHaveProperty('data')
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('email')
            expect(body.data).toHaveProperty('password')
            expect(body.data.name).toBe(name)
            expect(body.data.email).toBe(email)
            expect(body.data.password).toBe(password)
        } catch (error) {
            expect(error).toBe("error")
        }
    })
    test('test email sudah di daftarkan -> failed', async () => {
        try {
            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password })
            expect(statusCode).toBe(400)
        } catch (error) {
            expect(error).toBe('email sudah dipakai');
        }
    })
})