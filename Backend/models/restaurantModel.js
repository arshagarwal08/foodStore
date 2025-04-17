import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    }
})

const restaurantModel = mongoose.model.restaurant || mongoose.model("restaurant",restaurantSchema)

export default restaurantModel