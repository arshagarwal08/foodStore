import React from 'react'
import assets from '../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <>
    <div className='my-25 text-4xl font-semibold text-center items-center'>
        <p>For better experience Download <br />Tomato App</p>
        <div className='mt-5 flex justify-center gap-10'>
            <img className='hover:scale-105 transition-transform duration-300 cursor-pointer w-40' src={assets.play_store} />
            <img className='hover:scale-105 transition-transform duration-300 cursor-pointer w-40' src={assets.app_store} />
        </div>
    </div>
    </>
  )
}

export default AppDownload
