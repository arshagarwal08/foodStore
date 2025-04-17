import React, { useState, useRef } from 'react'
import { menu_list } from '../assets/frontend_assets/assets'
import FoodDisplay from './FoodDisplay'

const Menu = () => {
  const [category, setCategory] = useState("All")

  const sliderRef = useRef(null)
  
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <div id="explore-menu" className="mt-5">
        <h2 className="text-3xl text-[#262626] mb-4">Explore our menu</h2>
        <p className="text-[#808080] w-[60%] mb-4">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        
        <div className="relative">
          <div 
            ref={sliderRef} 
            className="flex gap-[30px] text-center my-[20px] overflow-x-auto scrollbar-hide"
          >
            {
              menu_list.map((item, index) => (
                <div 
                  onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                  key={index} 
                  className="cursor-pointer flex-shrink-0"
                >
                  <img
                    src={item.menu_image}
                    className={`w-[7.5vw] h-[7.5vw] rounded-full object-cover ${category === item.menu_name ? 'p-[2px] border-[4px] border-[#ff6347]' : ''}`}
                  />
                  <p className="mt-[10px] text-[#747474]">{item.menu_name}</p>
                </div>
              ))
            }
          </div>

          
        </div>

        <hr className="my-[10px] text-[#e2e2e2]" />
      </div>

      <FoodDisplay category={category} />
    </>
  )
}

export default Menu
