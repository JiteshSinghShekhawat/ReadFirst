import express from "express" ;
import postRoute from "./routes/posts.route.js"; 
import userRoute from "./routes/user.route.js"; 
import tagsRoute from "./routes/tags.route.js"; 
import jwtValid from "./middlewares/verifyJwt.middleware.js";
const app = express(); 

app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 

app.use('/posts',jwtValid,postRoute); 
app.use('/',userRoute); 
app.use('/tags',tagsRoute); 


export default app ;