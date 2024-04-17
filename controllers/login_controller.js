const loginService = require("../service/login_service")

module.exports = {
    login: async (req, res, next) => {
        try {
            let { email, password } = req.body
            const user = await loginService.login(email, password)
            if (!user) {
                return res.status(400).json({ status: false, message: "Email tidak terdaftar", data: null });
            }
            if (user.password !== password) {
                return res.status(401).json({ status: false, message: "Password tidak sesuai", data: null });
            }
            user["token"] = "lkjslfkuwn22913b3lkx93"
            delete user["password"]
            return res.status(200).json({
                status: true,
                message: "OK",
                data: user
            })
        } catch (err) {
            return res.status(400).json({ status: false, message: err.message, data: null });

        }
    }
}