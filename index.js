const express = require('express')
const connectMongo = require('./config/database')
const app = express()
const AdminRoutes = require('./routes/Admin/AdminRoutes')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const router = require('./routes/Route')
var cloudinary = require('cloudinary');
const multer = require('multer')()

app.use(express.json())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

// app.use(bodyParser.json());

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({useTempFiles:true}))


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL, process.env.CONSOLE_URL);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
})


app.use('/api/infos', router)

app.use('/api/admin', AdminRoutes)

connectMongo().then(
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
)

