import React from 'react';
import assets from '../assets/frontend_assets/assets';

const Header = () => {
    return (
        <>
            <div className='h-[34vw] my-[30px] mx-auto'>
                <div className="relative">
                    <img src={assets.header_img} alt="Food" className="w-full h-auto" />

                    <div className="text-white absolute bottom-10 left-0 w-[50%] gap-[1.5vw] items-start flex flex-col ml-20 p-[20px]">
                        <h2 className="text-5xl font-bold mb-4">Order your <br />favourite food here</h2>
                        <p className="mb-4">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                        <button className="px-6 py-2 bg-white text-[#747474] rounded-full cursor-pointer">View Menu</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
