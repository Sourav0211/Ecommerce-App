import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'; 
//configure env
dotenv.config();

//database config
connectDB();

const app = express();

//middlewares
app.use(express.json()); 
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth',authRoutes);

const PORT = process.env.PORT || 8000;

app.get("/",(req,res) =>{
    res.send("<h1>Welcome to My App</h1>");
});

app.listen(PORT,()=>{
    console.log(`App is running ${process.env.DEV_MODE} on ${PORT}`.bgGreen.white);
});