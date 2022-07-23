import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js";
import Cors from "cors";
import upload from "express-fileupload";
import morgan from "morgan";

const app = express();
const connection_url = "mongodb://emongodb:27017/TinderDB";

//  Middlewares
// app.use("/images", express.static("images"));
app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());
app.use(morgan('dev'));
// app.use(errHandler);

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) =>res.status(200).json("Hollo, world!"));    
    
app.post("/tinder/card", async (req, res) => {
    const {name, data} = req.files.profile;

    if(name && data){
            const newData = new Cards({
              name: req.body.name,
              imgData: name,
              img: data
            });

            await newData
              .save()
              .then(() => res.status(201).send("success"))
              .catch((err) => res.status(500).send(err));
    } else {
        res.status(500).json({
            erorr: "error"
        })
    }
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

app.get("/img/:id", async (req, res) => {
    const id = req.params.id;
    Cards.findById(id).exec().then(data => {
        res.end(data.img);
    }).catch(err => {
        console.log(err);
    })
})

export default app;
