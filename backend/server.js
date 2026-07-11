import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';

//app. config
const app = express();
const port = 4000;

//db connection
connectDB();

//middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/images", express.static('uploads'));

app.get('/', (req , res) =>{
    res.send("the api is working")
});

app.listen(port, () =>{
    console.log(`Server running on port http://localhost:${port}`)
})
 