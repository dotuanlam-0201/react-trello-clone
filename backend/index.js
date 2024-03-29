const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const dashboardRoute = require('./routes/dashboard.route')
const userRoute = require('./routes/user.route')

const corsOption = {
    origin: ['https://main--trello-clone-do-tuan-lam.netlify.app','http://localhost:5173'],
    methods: ["POST", 'GET'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
    maxAge: 3600
}

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors(corsOption))
app.use(morgan('common'))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'https://main--trello-clone-do-tuan-lam.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});
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

app.use('/dashboard', dashboardRoute)
app.use('/user', userRoute)
