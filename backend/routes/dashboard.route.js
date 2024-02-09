const router = require('express').Router()
const DashboardController = require('../controllers/dashboard.controller')


router.post('/listCard/add',DashboardController.addListCard)
router.post('/:listCardId/:cardId/card/delete',DashboardController.deleteCard)
router.post('/listCard/:listCardId/delete',DashboardController.deleteListCard)
router.post('/:listCardId/card/add',DashboardController.addCard)
router.post('/:cardId/card/update',DashboardController.updateCard)
router.post('/listCard/get/all',DashboardController.getListCard)
router.post('/listCard/update/byDragDrop',DashboardController.updateListCardByDragDrop)


module.exports = router