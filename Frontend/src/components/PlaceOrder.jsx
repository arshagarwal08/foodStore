import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token,food_list, cartItems,url ,restaurantId } = useContext(StoreContext)

  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("role")!=="user"){
      alert("You are not logged in")
      navigate('/user/login')
    }else if(getTotalCartAmount() === 0){
      alert("Cart is empty Please add items")
      navigate('/')
    }
  },[])

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
  console.log(restaurantId)
    if (!restaurantId) {
      alert("Restaurant ID is missing. Please try again.");
      return;
    }
  
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      restaurantId: restaurantId,
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
  
      if (response.data.success) {
        alert("Order placed successfully");
        window.location.replace("/");
      } else {
        alert("Error placing the order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order");
    }
  };
  
  

  return (
    <>
      <form onSubmit={placeOrder} action="" className="flex flex-col lg:flex-row gap-8 px-6 py-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-4">Delivery Information</p>
          <div className="flex gap-4 mb-4">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' className="w-full border px-4 py-2 rounded-lg" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' className="w-full border px-4 py-2 rounded-lg" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className="w-full border px-4 py-2 mb-4 rounded-lg" />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' className="w-full border px-4 py-2 mb-4 rounded-lg" />
          <div className="flex gap-4 mb-4">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className="w-full border px-4 py-2 rounded-lg" />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className="w-full border px-4 py-2 rounded-lg" />
          </div>
          <div className="flex gap-4 mb-4">
            <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' className="w-full border px-4 py-2 rounded-lg" />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className="w-full border px-4 py-2 rounded-lg" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' className="w-full border px-4 py-2 rounded-lg" />
        </div>

        <div className="w-full lg:w-[350px] bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Cart totals</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <p>Subtotals</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between text-gray-700 my-2">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold mt-4">
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>
          <button type='submit' className="mt-6 w-full bg-[#ff6347] hover:bg-red-600 text-white py-2 rounded-lg transition-all duration-200">
            Confirm Order
          </button>
        </div>
      </form>

    </>
  )
}

export default PlaceOrder
