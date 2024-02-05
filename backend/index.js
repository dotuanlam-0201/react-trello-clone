const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const dashboardRoute = require('./routes/dashboard.route')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors)
app.use(morgan('common'))

app.use('/dashboard', dashboardRoute)

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

