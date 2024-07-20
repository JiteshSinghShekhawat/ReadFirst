import express from "express" ;
import postRoute from "./routes/posts.route.js"; 
import userRoute from "./routes/user.routes.js"; 
import tagsRoute from "./routes/tags.route.js"; 
const app = express(); 


app.use('/posts',postRoute); 
app.use('/',userRoute); 
app.use('/tags',tagsRoute); 


export default app ;