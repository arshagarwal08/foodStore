import React, { useEffect } from 'react'
import RestaurantSidebar from './RestaurantSidebar'
import RestaurantOrders from './RestaurantOrders'
import { Route, Routes, useNavigate } from 'react-router-dom'
import RestaurantFoodList from './RestaurantFoodList'
import RestaurantAddFood from './RestaurantAddFood'
import RestaurantDashboard from './RestaurantDashboard'

const Restaurant = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("role") !== "restaurant"){
      navigate('/restaurant/login')
    }
  },[])

  return (
    <>
      <div className="flex h-screen">
      
      <div className="w-1/4 ">
        <RestaurantSidebar />
      </div>

      
      <div className="w-3/4 overflow-y-auto">
        <Routes>
          <Route path='/' element={<RestaurantDashboard />} />
          <Route path='orders' element={<RestaurantOrders />} />
          <Route path='foodlist' element={<RestaurantFoodList />} />
          <Route path='addfood' element={<RestaurantAddFood />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default Restaurant
