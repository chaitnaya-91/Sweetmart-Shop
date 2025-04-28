const mongoose = require('mongoose');
const dotenv = require('dotenv');

const DBCon = async () => {
    try {
        await mongoose.connect(process.env.MONGDB_ULR);
        console.log('MONGODB IS CONNECTED');
    } catch (error) {
        console.log(error);
    }
}

module.exports = DBCon;