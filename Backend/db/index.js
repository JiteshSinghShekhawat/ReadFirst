import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const db_connect = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            `\nconnection successfull to MONGO_DB host : ${connectionInstance.connection.host}`
        );
    } catch (e) {
        console.log(`mongo_db connection error `, e);
    }
};

export default db_connect;
