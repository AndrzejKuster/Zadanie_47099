const config = require('./config')
const express = require('express') 
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

mongoose
.connect(mongoUrl, {})
.then(()=> {
    console.log('mongoDb jest podłączone')
})
.catch((err)=> {
    throw err
})

const app = express()
app.use(express.json())
app.use(cors())

const actionsRoutes = require('./app/routes/ActionsRoutes')()
app.use('/actions', actionsRoutes)

const clientsRoutes = require('./app/routes/ClientsRoutes')()
app.use('/clients', clientsRoutes)

app.listen(config.app.port, () => {
    console.log('Express server is up!')
})