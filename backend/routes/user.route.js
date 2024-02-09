const UserController = require('../controllers/user.controller')

const router = require('express').Router()

router.post('/login', UserController.login)
router.get('/getUser', UserController.getUser)
router.get('/get/all', UserController.getAllUsers)
router.post('/logout', UserController.logout)

module.exports = router