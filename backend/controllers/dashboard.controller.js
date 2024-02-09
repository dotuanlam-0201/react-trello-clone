const { ListCard, Card } = require('../model/dashboard.model')

const DashboardController = {
    addListCard: async (req, res) => {
        try {
            let payload = req.body
            const order = await ListCard.countDocuments() + 1
            payload['order'] = order
            const newListCard = new ListCard(payload)
            const saveListCard = await newListCard.save()
            return res.status(200).json({
                success: true,
                result: saveListCard
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    addCard: async (req, res) => {
        try {
            if (!req.param('listCardId')) {
                res.status(200).json({
                    success: false,
                    result: 'Missing list card id!'
                })
                return
            }
            const newCard = new Card(req.body)
            const saveCard = await newCard.save()
            const listCard = ListCard.findById(req.param('listCardId'))
            await listCard.updateOne({
                $push: {
                    cards: saveCard._id
                }
            })
            return res.status(200).json({
                success: true,
                result: saveCard
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    updateCard: async (req, res) => {
        try {
            if (!req.param('cardId')) {
                res.status(200).json({
                    success: false,
                    result: 'Missing list card id!'
                })
                return
            }
            const card = Card.findById(req.param('cardId'))
            await card.updateOne({
                $set: new Card(req.body)
            })
            res.status(200).json({
                success: true,
                result: new Card(req.body)
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    getListCard: async (req, res) => {
        try {
            const listCard = await ListCard.find().populate('cards').sort({ order: 'asc' })
            res.status(200).json({
                success: true,
                result: listCard
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    deleteListCard: async (req, res) => {
        try {
            if (!req.param('listCardId')) {
                res.status(200).json({
                    success: false,
                    result: 'Missing list card id!'
                })
                return
            }
            const listCard = await ListCard.findByIdAndDelete(req.param('listCardId'))
            res.status(200).json({
                success: true,
                result: listCard
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    deleteCard: async (req, res) => {
        try {
            if (!req.param('cardId') || !req.param('listCardId')) {
                res.status(200).json({
                    success: false,
                    result: 'Missing params!'
                })
                return
            }
            await Card.findByIdAndDelete(req.param('cardId'))

            const filter = { _id: req.param('listCardId') };
            const update = { $pull: { cards: req.param('cardId') } }
            await ListCard.findByIdAndUpdate(
                filter,
                update, {
                new: true
            }
            )
            res.status(200).json({
                success: true,
                result: {}
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    },
    updateListCardByDragDrop: async (req, res) => {
        try {
            const payload = req.body
            if (!payload) {
                res.status(200).json({
                    success: true,
                    result: 'Missing payload!'
                })
            }
            payload.forEach(async (list) => {
                await ListCard.updateMany({
                    _id: list._id,
                }, {
                    $set: list
                })
            })
            res.status(200).json({
                success: true,
                result: payload
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                result: error
            })
        }
    }
}

module.exports = DashboardController