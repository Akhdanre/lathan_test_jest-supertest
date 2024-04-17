const userService = require('../service/users_service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;
            try {
                let user = await userService.createUser(name, email, password);
                res.status(201).json({
                    status: true,
                    message: 'OK',
                    data: user
                });
            } catch (err) {
                res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            next(err)
        }
    },
    getUserById: async (req, res) => {
        let userId = req.params.id;
        try {
            let user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
};
