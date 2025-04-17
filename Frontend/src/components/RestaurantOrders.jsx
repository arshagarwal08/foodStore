import React, { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import assets from '../assets/frontend_assets/assets'

const RestaurantOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  const fetchRestaurantOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/restaurantorders`, {
        headers: { token },
      })
      setOrders(res.data.data)
    } catch (error) {
      console.log("Failed to fetch restaurant orders", error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchRestaurantOrders()
    }
  }, [token])

  
const handleStatusChange = async (orderId, newStatus) => {
  try {
    const res = await axios.put(`${url}/api/order/update-status/${orderId}`, {
      status: newStatus
    }, {
      headers: { token }
    })

    if (res.data.success) {
      fetchRestaurantOrders()
    }
  } catch (err) {
    console.error('Error updating status:', err)
  }
}


  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-6">Restaurant Orders</h2>
      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md border p-5 transition hover:shadow-lg space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Icon */}
                <img src={assets.parcel_icon} alt="parcel" className="w-12 h-12" />

                {/* Order Details */}
                <div className="flex-1">
                  <p className="text-gray-800 font-medium mb-1">Order ID: {order._id}</p>
                  <p className="text-gray-700 text-sm">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx < order.items.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Price */}

                <p className="text-gray-800 px-5 font-semibold">₹{order.amount}</p>
                <p className="text-sm text-gray-500 px-5">Items: {order.items.length}</p>


                {/* Status Dropdown */}
                <div className="min-w-[200px] flex flex-col gap-2 items-start justify-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="food processing">Food Processing</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  
                </div>

              </div>

              {/* Address */}
              <div className="text-sm text-gray-700 pl-16 md:pl-20">
                <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state}, {order.address.country}</p>
                <p className="mt-1 text-gray-500">{order.address.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RestaurantOrders
