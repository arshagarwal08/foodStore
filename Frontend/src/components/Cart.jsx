import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext)

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("role")!=="user"){
      alert("You are not logged in")
      navigate('/user/login')
    }else if(getTotalCartAmount()===0){
      alert("Cart is empty Please add something")
      navigate('/')
    }
  },[])

  return (
    <>
      <div>
        <div className="p-6">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 font-semibold text-gray-600 border-b pb-3 mb-4">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {
            food_list.map((item, index) => {
              const itemID = item._id.toString()
              if (cartItems[itemID] > 0) {
                return (
                  <div
                    key={itemID}
                    className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 items-center border-b py-3"
                  >
                    <img src={url+"/images/"+item.image} className="w-16 h-16 object-cover rounded" alt={item.name} />
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-700">${item.price}</p>
                    <p className="text-sm">{cartItems[itemID]}</p>
                    <p className="text-sm font-semibold">${(item.price * cartItems[itemID]).toFixed(2)}</p>
                    <p
                      className="text-red-500 cursor-pointer text-lg font-bold"
                      onClick={() => removeFromCart(itemID)}
                    >
                      ×
                    </p>
                  </div>
                )
              }
              return null
            })
          }
        </div>

        <div className='flex gap-6 flex-wrap justify-center'>
          <div className="p-6 w-[350px] bg-white rounded-lg shadow-md my-6">
            <h2 className="text-xl font-semibold mb-4">Cart totals</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <p>Subtotals</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-700 my-2">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold mt-4">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            <button onClick={()=>navigate('/order')} className="mt-6 w-full bg-[#ff6347] hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-200">
              Proceed to checkout
            </button>
          </div>

          <div className="p-6 w-[350px] bg-white rounded-lg shadow-md my-6">
            <p className="mb-2 text-gray-700">If you have a promo code, enter it here:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200">
                Submit
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Cart
