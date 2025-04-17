import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/frontend_assets/assets";
import {StoreContext} from '../context/StoreContext'
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RestaurantLogin = () => {

    const navigate = useNavigate();
    const {url,setToken,setRole,setRestaurantName} = useContext(StoreContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(url+"/api/restaurant/login",formData)
        if(response.data.success){
            setToken(response.data.token)
            setRole("restaurant")
            setRestaurantName(response.data.name)
            localStorage.setItem("restaurantName",response.data.name)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("role","restaurant")
            navigate('/restaurant')
        }else{
            alert(response.data.message)
        }
    };

    return (
        <>
    <div className='w-[80%] m-auto font-outfit'>

        <Navbar />
        <div className="py-10 bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-orange-600">Restaurant Login</h2>
                    <Link to={'/'}>
                        <img src={assets.cross_icon} alt="Close" className="w-5 h-5 cursor-pointer" />
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
                        >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-700">
                        Don't have an account?{" "}
                        <span className="text-[#ff6347] font-medium cursor-pointer hover:underline">
                            <Link to={'/restaurant/signup'}>
                                Create Account
                            </Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
        </div>
        <Footer />
        </>
    );
};

export default RestaurantLogin;
