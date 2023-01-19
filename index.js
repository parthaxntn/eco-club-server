const express = require('express')
const connectMongo = require('./config/database')
const app = express()
const EventRoutes = require('./routes/EventRoutes')
const MemberRoutes = require('./routes/MembersRoute')

app.use(express.json())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

app.use(express.urlencoded({ extended: true }))

app.use('/api/event', EventRoutes)
app.use('/api/event', MemberRoutes)


app.get('/', (req, res) => {
    res.send('Hello ECO!')
})

connectMongo().then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
)
