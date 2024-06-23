const mongoose = require('mongoose');
const ConnectDb = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}`,{
        useNewUrlParser: true,
    })
    console.log("DataBase connected");
}
module.exports = ConnectDb;