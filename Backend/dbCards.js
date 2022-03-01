import mongoose from "mongoose"

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgData: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        required: true
    }
}, { timestamp: true });


export default mongoose.model("card", cardSchema);