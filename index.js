require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/ErrorMiddleware')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started at ${PORT} port`))
    } catch (err) {
        console.log(err)
    }
    
}

start()