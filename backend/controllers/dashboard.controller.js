const { ListCard } = require('../model/dashboard.model')

const DashboardController = {
    addListCard: async (req, res) => {
        try {
            const newListCard = new ListCard(req.body)
            return res.status(200).json(newListCard)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = DashboardController