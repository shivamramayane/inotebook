const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://shivam:12345@cluster0.9hxmd7j.mongodb.net/test"
const connectToMongo =()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected mogno succes")
    })
}
module.exports=connectToMongo;