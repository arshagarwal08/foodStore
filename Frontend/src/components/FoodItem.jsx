import React, { useContext, useState } from 'react'
import assets from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'

const FoodItem = ({ item }) => {

    const { url } = useContext(StoreContext)

    return (
        <>
            <div className='hover:scale-105 transition-transform duration-300 rounded-[15px] shadow-[10px_10px_10px_#00000015]'>
                <Link to={`/user/restaurant/${item.restaurantId}`}>
                    <div className='relative'>
                        <img
                            className="w-full h-48 object-cover rounded-t-[15px]"
                            src={url + "/images/" + item.image}
                            alt={item.name}
                        />

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center mb-[10px]'>
                            <p className='font-semibold text-lg'>{item.name}</p>
                            <img src={assets.rating_starts} />
                        </div>
                        <p className='text-[#676767] text-sm'>{item.description}</p>
                        <p className='text-[#ff6347] my-[10px] text-lg font-bold'>${item.price}</p>

                    </div>
                </Link>
            </div>
        </>
    )
}

export default FoodItem
