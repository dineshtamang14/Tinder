import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js";
import Cors from "cors";
import multer from 'multer';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import morgan from "morgan";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const connection_url = `mongodb://${process.env.MONGOURL}:27017/TinderDB`;

//  Middlewares
// app.use("/images", express.static("images"));
app.use(Cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// app.use(errHandler);
// Create a default directory to store images
const defaultUploadDir = join(__dirname, 'uploads');
if (!fs.existsSync(defaultUploadDir)) {
  fs.mkdirSync(defaultUploadDir);
}
app.use('/uploads', express.static(defaultUploadDir));
// Configure file upload middleware using multer
const upload = multer({
    dest: defaultUploadDir,
    limits: { fileSize: 1024 * 1024 }, // 1 MB file size limit
});

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API Endpoints
app.get("/", (req, res) =>res.status(200).json("Hollo, world!"));    
    
app.post("/tinder/card", upload.single('image'), async (req, res) => {
    // console.log(req)
    if (!req.file) {
        return res.status(400).json({ message: 'No file was uploaded.' });
      }
    
      // Get the uploaded file
      const file = req.file;
    
      // Check file size
      if (file.size > 1024 * 1024) {
        fs.unlinkSync(file.path); // Delete the uploaded file
        return res.status(400).json({ message: 'File size exceeds the limit of 1 MB.' });
      }

  // Extract the name and location from the request body
  const { name, location } = req.body;
  // Get the original file extension
  const originalExtension = file.originalname.split('.').pop();

  // Generate a unique filename with the original extension
  const filename = `${location}_${name}.${originalExtension}`;

  // Move the uploaded file to the final destination with the correct filename and extension
  const finalPath = `${defaultUploadDir}/${filename}`;
  fs.renameSync(file.path, finalPath);

  // Save the image data and URL to MongoDB
  const imageUrl = `${filename}`;

    const newData = new Cards({
      name,
      location,
      imageUrl,
    });

    newData.save((error) => {
      if (error) {
        console.error('Failed to save image data:', error);
        return res.status(500).json({ message: 'Error occurred while saving image data.' });
      }

      res.json({ message: 'File uploaded successfully.', imageUrl });
    });
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
        const filePath = `${defaultUploadDir}/${data.imageUrl}`;
  
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Send the file as a response
          res.sendFile(filePath);
        } else {
          res.status(404).json({ message: 'Image not found.' });
        }
    }).catch(err => {
        console.log(err);
    })
})

// Route to serve images
app.get('/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = `${defaultUploadDir}/${filename}`;
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Send the file as a response
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: 'Image not found.' });
    }
});

export default app