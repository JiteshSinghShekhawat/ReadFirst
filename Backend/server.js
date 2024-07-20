import app from "./app.js";
import db_connect from "./db/index.js"; 
import dotenv,{config} from "dotenv" ;

dotenv.config({
    path : "../.env"
}); 

db_connect()
.then(()=>{
    app.listen(3000,(req,res)=>{
        console.log('Server listening on PORT 3000'); 
    })
})
.catch((e)=>{
    console.log('MongoDb connection error',e); 
})