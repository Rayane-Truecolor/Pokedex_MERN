require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

//middlewares
app.use(express.json())
app.use((req, res, next) => {
console.log(req.path, req.method)
    next()
})
//routes
{/*app.get('/', (req, res) => {
res.json({mssg: 'Welcome to the app'})
})*/}

app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db & Server running on port ', process.env.PORT)
    })
})
.catch((error) => console.log(error))

//liste nfor request


