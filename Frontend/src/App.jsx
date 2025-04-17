import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLayout from './components/UserLayout'
import RestaurantLayout from './components/RestaurantLayout'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<UserLayout/>} />
      <Route path='/restaurant/*' element={<RestaurantLayout/>} />
    </Routes>
    </>
  )
}

export default App
