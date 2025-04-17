import React, { useContext } from 'react';
import assets from '../assets/frontend_assets/assets.js';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext.jsx';

const Navbar = () => {

  const location = useLocation();

  const { getTotalCartAmount, token, setToken, role, setRole } = useContext(StoreContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setToken("")
    setRole("")
    navigate('/')
  }

  return (
    <>
      <div className="px-[20px] py-5 flex justify-between items-center w-full">

        <h1 className='text-4xl text-[#ff6347] font-bold'>Foodie</h1>

        <ul className="flex gap-[20px] text-[18px] text-[#49557e] font-medium">
          <li className={`${location.pathname === '/' ? 'border-b-2 border-[#ff6347] text-[#ff6347]' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
            <Link to={'/'}>Home</Link>
          </li>
          <li className={`${location.pathname === '/menu' ? 'border-b-2 border-[#ff6347] text-[#ff6347]' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
            <Link to={'/menu'}>Menu</Link>
          </li>
          <li className={`${location.pathname === '/user/restaurant' ? 'border-b-2 border-[#ff6347] text-[#ff6347]' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
            <Link to={'/user/restaurant'}>Restaurants</Link>
          </li>
          <li className={`${location.pathname === '/contactus' ? 'border-b-2 border-[#ff6347] text-[#ff6347]' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
            <Link to={'/contactus'}>Contact Us</Link>
          </li>
          <li className={`${location.pathname === '/partner' ? 'border-b-2 border-[#ff6347] text-[#ff6347]' : ''} cursor-pointer hover:text-[#ff6347] transition duration-300`}>
            <Link to={'/partner'}>Partner</Link>
          </li>
        </ul>

        <div className="flex items-center gap-[40px]">
          <img src={assets.search_icon} className="cursor-pointer" alt="Search" />

          <div className='relative'>
            <Link to={'/cart'}>
              <img src={assets.basket_icon} className="cursor-pointer" alt="Basket" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? '' : 'absolute min-w-[10px] min-h-[10px] bg-[#ff6347] rounded-full top-[-8px] right-[-8px]'}></div>
          </div>

          {
            role==='user' ?
              <div className="relative inline-block group cursor-pointer">
                <img src={assets.profile_icon} alt="" />

                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl p-4 hidden group-hover:block z-50">
                  <li onClick={()=>navigate('/myorders')} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <hr className="my-2 border-gray-300" />
                  <li onClick={logout} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
              :
              <Link to={'/user/login'} className="bg-transparent hover:bg-[#fff4f2] transition duration-300 text-[16px] text-[#49557e] cursor-pointer border-2 border-[#ff6347] py-[10px] px-[40px] rounded-full">
                Login
              </Link>
          }

        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
