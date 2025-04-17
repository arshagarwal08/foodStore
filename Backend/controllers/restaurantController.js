import restaurantModel from "../models/restaurantModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const createToken = (id,role) => {
    return jwt.sign({id,role},process.env.JWT_SECRET)
}

const restaurantLogin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const restaurant = await restaurantModel.findOne({email})
        if(!restaurant){
            return res.json({success:false,message:"No restaurant with this email"})
        }

        const isMatch = await bcrypt.compare(password,restaurant.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }

        const token = createToken(restaurant._id,"restaurant")
        res.json({success:true,token,name:restaurant.name})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const restaurantSignup = async (req,res) => {

    const {name,ownerName,email,password,address,phone} = req.body;

    try {
        const exists = await restaurantModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"Restaurant already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newRestaurant = new restaurantModel({
            name,
            ownerName,
            email,
            password:hashedPassword,
            phone,
            address
        })

        const restaurant = await newRestaurant.save();
        const token = createToken(restaurant._id,"restaurant")

        res.json({success:true,token,name:restaurant.name})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const singleRestaurant = async (req,res) => {
    const {id} =req.params;

    try {
        const restaurant = await restaurantModel.findById(id)

        if(!restaurant){
            return res.json({success:false,message:"No such restaurant present"})
        }

        res.json({success:true,data:restaurant})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const allRestaurant = async (req,res) => {
    try {
        const restaurant = await restaurantModel.find({});
        res.json({success:true,data:restaurant})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { restaurantSignup, restaurantLogin, singleRestaurant, allRestaurant }