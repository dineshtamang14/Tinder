import mongoose from "mongoose"

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamp: true });


export default mongoose.model("card", cardSchema);