import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js";
import Cors from "cors";

const app = express();
const port = process.env.PORT || 8000
const connection_url = "mongodb+srv://dinesh:dinesh1997@cluster0.cuuqa.mongodb.net/Tinder-DB?retryWrites=true&w=majority"

//  Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) =>res.status(200).send("Hollo, world!"))    
    
app.post("/tinder/card", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get("/tinder/cars", (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});