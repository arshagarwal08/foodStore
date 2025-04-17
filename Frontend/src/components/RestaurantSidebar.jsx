import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import assets from '../assets/frontend_assets/assets.js'
import { StoreContext } from '../context/StoreContext.jsx';
const RestaurantSidebar = () => {
    const location = useLocation();
    const { setToken, setRole, restaurantName, setRestaurantName } = useContext(StoreContext)
    const navigate = useNavigate()

    useEffect(()=>{
        setRestaurantName(localStorage.getItem("restaurantName"))
    },[])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("restaurantName")
        setToken("")
        setRole("")
        setRestaurantName("")
        navigate('/')
    }

    return (
        <div className="bg-orange-100 p-6 border-r border-orange-200 flex flex-col h-full w-full">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
                <Link to={'/restaurant'}>
                    Dashboard
                </Link>
            </h2>
            <p className="text-sm font-semibold text-gray-700 truncate">
                {restaurantName}
            </p>
            <hr />
            <ul className="mt-4 space-y-4">
                <li className={`${location.pathname === '/restaurant/orders' ? 'font-semibold text-orange-600' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
                    <Link to={'/restaurant/orders'}>Orders</Link>
                </li>
                <li className={`${location.pathname === '/restaurant/foodlist' ? 'font-semibold text-orange-600' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
                    <Link to={'/restaurant/foodlist'}>Food Items</Link>
                </li>
                <li className={`${location.pathname === '/restaurant/addfood' ? 'font-semibold text-orange-600' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
                    <Link to={'/restaurant/addfood'}>Add Food Items</Link>
                </li>

            </ul>

            <div className='mt-auto flex flex-col space-y-4'>
                <div
                    className='flex flex-row cursor-pointer hover:text-[#ff6347] transition duration-300 items-center gap-2 px-2'
                    onClick={logout}
                >
                    <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                    <p>Logout</p>
                </div>

                <div className='flex flex-row pt-4 border-t border-orange-200 text-sm text-gray-600 items-center'>
                    <h2 className='text-2xl font-semibold text-orange-600'>Foodie</h2>
                    <p className='ml-2 mt-1 font-semibold'>For Restaurant</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantSidebar
