import express from "express"
import mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 8000

//  Middlewares

// DB config

// API Endpoints
app.get("/", (req, res) =>res.status(200).send("Hollo, world!"))    
    
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});