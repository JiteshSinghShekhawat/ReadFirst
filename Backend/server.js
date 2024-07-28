import app from './app.js';
import db_connect from './db/index.js';
import dotenv, { config } from 'dotenv';

dotenv.config({
    path: '../.env',
});

const PORT = process.env.PORT || 8001;

db_connect()
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server listening on PORT ${PORT}`);
        });
    })
    .catch((e) => {
        console.log('MongoDb connection error', e);
    });
