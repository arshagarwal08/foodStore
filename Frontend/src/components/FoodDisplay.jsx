import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <>
    <div className='mt-5'>
      <h2 className='mb-5 text-3xl font-semibold'>Top dishes near you</h2>
      <div className='grid grid-cols-4 gap-[30px] gap-y-[50px]'>
        {
            food_list.map((item,index)=>{
                if(category==='All' || category===item.category){
                    return <FoodItem key={index} item={item}/>
                }
            })
        }
      </div>
    </div>
    </>
  )
}

export default FoodDisplay
