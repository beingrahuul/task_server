import express from "express" ; 
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary'
import cors from "cors"
import { dbConnection } from "./dbConnectio/dbConnection.js"
import fileUpload from "express-fileupload";
import {errorMiddleware} from "./middlewares/error.js"
import user_router from "./routes/user_router.js"
import task_router from "./routes/task_router.js"

 const app = express();


dotenv.config({path: "./config/config.env"});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

  
app.use(cors({
  origin: 'http://localhost:5173', // Specify the frontend origin
  credentials: true
}));


app.use(fileUpload({
tempFileDir : "/tmp/" ,
useTempFiles : true
}))



app.use("/api/v1/user" , user_router);
app.use("/api/v1/task" , task_router);


dbConnection();

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECERT,
});

app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
  console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`)
}) 
