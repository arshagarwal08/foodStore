import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';

//placing user order for frontend
const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId:req.userId,
            items:req.body.items,
            restaurantId:req.body.restaurantId,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        res.json({success:true,message:"Order placed successfully",orderId:newOrder._id})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//orders for user
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//orders for restaurant
const restaurantOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({restaurantId:req.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//update status
const updateOrderStatus = async (req, res) => {
    try {
      await orderModel.findByIdAndUpdate(req.params.orderId, {
        status: req.body.status,
      })
      res.json({ success: true, message: "Order status updated" })
    } catch (err) {
      res.json({ success: false, message: "Failed to update status" })
    }
  }
  

export {placeOrder,userOrders, restaurantOrders, updateOrderStatus}