import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import restaurantRouter from './routes/restaurantRoute.js'


dotenv.config()
const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

//db connection
connectDB()

//api
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/restaurant',restaurantRouter)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})