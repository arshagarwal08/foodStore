import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Restaurant from './Restaurant'
import RestaurantLogin from './RestaurantLogin'
import RestaurantSignup from './RestaurantSignup'

const RestaurantLayout = () => {
  return (
    <>
    <Routes>
    <Route path='/*' element={<Restaurant />} />
    <Route path='/signup' element={<RestaurantSignup />} />
    <Route path='/login' element={<RestaurantLogin />} />
    </Routes>

    </>
  )
}

export default RestaurantLayout
