const mongoose = require('mongoose')

const connectMongo = async ()=>{
    try{
        console.log(process.env.MONGO_URL);
        const conect = await mongoose.connect(
        process.env.MONGO_URL,
        {
                useNewUrlParser: true, useUnifiedTopology: true,
            }
        )
        console.log(`Connected to ${conect.connection.host}`);   
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectMongo;