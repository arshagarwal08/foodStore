import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import assets from '../assets/frontend_assets/assets.js'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/userorders", { headers: { token } })
    setData(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <>
      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
        <div className="grid gap-6">
          {
            data.map((order, index) => {
              return (
                <div key={index} className="bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border">
                  <img src={assets.parcel_icon} alt="" className="w-12 h-12" />
                  <p className="flex-1 text-gray-700">
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity
                        } else {
                          return item.name + " x " + item.quantity + ", "
                        }
                      })
                    }
                  </p>
                  <p className="text-gray-800 font-medium">₹{order.amount}.00</p>
                  <p className="text-sm text-gray-500">Items: {order.items.length}</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <span className={`text-lg ${order.status === 'delivered' ? 'text-green-500' : 'text-yellow-500'}`}>&#x25cf;</span>
                    <b className="capitalize">{order.status}</b>
                  </p>
                  <button className="bg-[#ff6347] hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition">Track Order</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MyOrders
