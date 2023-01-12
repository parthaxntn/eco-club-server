const express = require('express')
const connectMongo = require('./config/database')

const app = express()

app.use(express.json())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

connectMongo().then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
)