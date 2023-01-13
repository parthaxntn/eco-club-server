const express = require('express')
const connectMongo = require('./config/database')
const app = express()
const EventRoutes = require('./routes/upcomingEvents')

app.use(express.json())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

app.use(express.urlencoded({ extended: true }))

app.use('/api/event', EventRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectMongo().then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
)
