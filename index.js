const express = require('express')
const connectMongo = require('./config/database')
const app = express()
const EventRoutes = require('./routes/Events/upcomingEvents')
const AdminRoutes = require('./routes/Admin/AdminRoutes')
const { Connection } = require('mongoose')

app.use(express.json())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

app.use(express.urlencoded({ extended: true }))

app.use('/api/event', EventRoutes)


app.use('/api/admin', AdminRoutes)

connectMongo().then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${Connection.urlencoded}`);
    })
)
