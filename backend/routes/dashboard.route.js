const router = require('express').Router()
const DashboardController = require('../controllers/dashboard.controller')


router.post('/',DashboardController.addListCard)


module.exports = router