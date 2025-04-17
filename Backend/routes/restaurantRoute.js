import express from 'express'
import { allRestaurant, restaurantLogin, restaurantSignup, singleRestaurant } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/all',allRestaurant)
restaurantRouter.post('/login',restaurantLogin)
restaurantRouter.post('/register',restaurantSignup)
restaurantRouter.get('/:id',singleRestaurant)

export default restaurantRouter;