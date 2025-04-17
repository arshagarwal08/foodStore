import React from 'react'
import assets from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <>
    <div className='mt-10 pb-10 bg-[#323232] text-[#d9d9d9] flex flex-col pt-[80px] px-[6vw] gap-[30px] '>
        <div className='grid grid-cols-3 gap-[80px]'>
            <div>
                <h1 className='text-4xl text-[#ff6347] font-bold'>Foodie</h1>
                <p className='mt-3'>Social handles-</p>
                <div className='flex gap-[20px] mt-2'>
                    <img className='w-[30px]' src={assets.facebook_icon} />
                    <img className='w-[30px]' src={assets.twitter_icon} />
                    <img className='w-[30px]' src={assets.linkedin_icon} />
                </div>
            </div>
            <div>
                <h2 className='text-xl font-bold'>COMPANY</h2>
                <br/>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <h2 className='text-xl font-bold'>Get in Touch</h2>
                <br />
                <ul>
                    <li>+91 9876xxxxxx</li>
                    <li>contact@foodie.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className='flex justify-center'>
        <p>Copyright 2025 @ Foodie.com - All rights reserved</p>
        </div>
    </div>
    </>
  )
}

export default Footer
