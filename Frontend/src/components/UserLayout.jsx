import React from 'react'
import Home from './Home'
import Admin from '../admin/admin'
import Cart from './Cart'
import PlaceOrder from './PlaceOrder'
import Menu from './Menu'
import AppDownload from './AppDownload'
import ContactUs from './ContactUs'
import Login from './Login'
import Signup from './Signup'
import MyOrders from './MyOrders'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Partner from './Partner'
import SingleRestaurant from './SingleRestaurant'
import AllRestaurant from './AllRestaurant'

const UserLayout = () => {
  return (
    <>
        <div className='w-[80%] m-auto font-outfit'>
    
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/appdownload' element={<AppDownload/>} />
        <Route path='/contactus' element={<ContactUs/>} />
        <Route path='/partner' element={<Partner/>} />
        <Route path='/user/login' element={<Login/>} />
        <Route path='/user/signup' element={<Signup/>} />
        <Route path='/user/restaurant' element={<AllRestaurant/>} />
        <Route path='/user/restaurant/:id' element={<SingleRestaurant/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
      </div>
    <Footer />
    </>
  )
}

export default UserLayout
