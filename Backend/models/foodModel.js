import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    image: {
        type: String,
        required : true
    },
    category: {
        type: String,
        required : true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant", 
        required: true
    }    
})

const foodModel = mongoose.model("food",foodSchema)

export default foodModel