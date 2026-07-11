import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

//app. config
const app = express();
const port = 4000;

//db connection
connectDB();

//middleware

app.use(express.json());
app.use(cors());

app.get('/', (req , res) =>{
    res.send("the api is working")
});

app.listen(port, () =>{
    console.log(`Server running on port http://localhost:${port}`)
})
 