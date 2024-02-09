const { User } = require("../model/user.model")

const UserController = {
    login: async (req, res) => {
        try {
            const user = User(req.body)
            await user.save()
            res.status(200).json({
                success: true,
                result: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findOne({
                "token": req.query.token
            })
            console.log("🚀 ~ getUser: ~ user:", user)
            res.status(200).json({
                success: true,
                result: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json({
                success: true,
                result: users
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    logout: async (req, res) => {
        try {
            const id = req.query.id
            const user = await User.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                result: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    }
}

module.exports = UserController


