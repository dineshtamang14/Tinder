import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js";
import Cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

const app = express();
const connection_url = "mongodb+srv://dinesh:dinesh1997@cluster0.cuuqa.mongodb.net/Tinder-DB?retryWrites=true&w=majority"

//  Middlewares
//app.use(express.static("images")); 
app.use("/images", express.static("images"));
app.use(express.json());
app.use(Cors());
// app.use(errHandler);

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// define storage for the image
const storage = multer.diskStorage({
    // destination for file
    destination: './images',

    // add extension to image
    filename:function(request, file, cb){
        const { originalname } = file;
       return cb(null, `${uuidv4()}-${originalname}`); 
    }
});

// upload parameters for multer 
const upload = multer({ storage });

const errHandler = (err, req, res, next) => {
    if(err instanceof multer.MulterError){
        res.json({
            success: 0,
            message: err.message,
        })
    }
}

// API Endpoints
app.get("/", (req, res) =>res.status(200).json("Hollo, world!"));    
    
app.post("/tinder/card", upload.single("profile"), (req, res) => {
    // const dbCard = {
    //     name: req.body.name,
    //     imgUrl: `http://localhost:8000/images/${req.file.filename}`
    // }
    console.log(req.file);
    const newData = new Cards({
      name: req.body.name,
      imgUrl: `https://tinder-api.herokuapp.com/images/${req.file.path}`,
    });

    newData.save()
        .then(() => res.status(201).send("success"))
        .catch((err) => res.status(500).send(err));
});

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

export default app;
