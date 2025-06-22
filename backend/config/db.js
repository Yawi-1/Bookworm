const mongoose = require('mongoose')
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo db connected : ${mongoose.connection.host}`)
    } catch (error) {
        console.log('Mongo db connection failed : ', error)

    }
}
module.exports = dbConnection;