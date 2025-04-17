import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, restaurantOrders, updateOrderStatus, userOrders } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.get("/userorders",authMiddleware,userOrders)
orderRouter.get("/restaurantorders",authMiddleware,restaurantOrders)
orderRouter.put('/update-status/:orderId', authMiddleware, updateOrderStatus)

export default orderRouter