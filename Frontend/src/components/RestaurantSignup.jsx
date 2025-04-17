import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/frontend_assets/assets";
import axios from 'axios'
import {StoreContext} from '../context/StoreContext'
import Navbar from "./Navbar";
import Footer from "./Footer";

const RestaurantSignup = () => {

    const navigate = useNavigate()
    const {url,setToken,setRole,setRestaurantName} = useContext(StoreContext);

    const [formData, setFormData] = useState({
        name: "",
        ownerName: "",
        email: "",
        phone: "",
        password: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
          state: "",
          country: ""
        }
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
        const response = await axios.post(url+"/api/restaurant/register",formData);
        if(response.data.success){
            setToken(response.data.token)
            setRole("restaurant")
            setRestaurantName(response.data.name)
            localStorage.setItem("restaurantName",response.data.name)
            localStorage.setItem("role","restaurant")
            localStorage.setItem("token",response.data.token)
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
                    <h2 className="text-3xl font-bold text-orange-600">Restaurant SignUp</h2>
                    <Link to={'/'}>
                        <img src={assets.cross_icon} alt="Close" className="w-5 h-5 cursor-pointer" />
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Restaurant Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                    <input
                        type="text"
                        name="ownerName"
                        placeholder="Owner's Name"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                        />
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
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
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
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={formData.address.street || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, street: e.target.value }
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.address.city || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, city: e.target.value }
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.address.state || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, state: e.target.value }
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />

                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zip Code"
                            value={formData.address.zipcode || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, zipcode: e.target.value }
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />

                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.address.country || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, country: e.target.value }
                                }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" required />
                        <p>
                            By continuing, I agree to the{" "}
                            <span className="text-[#ff6347] underline cursor-pointer">terms of use</span> &{" "}
                            <span className="text-[#ff6347] underline cursor-pointer">privacy policy</span>.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
                        >
                        SignUP
                    </button>
                    <p className="text-center text-sm text-gray-700">
                        Already have an account?{" "}
                        <span className="text-[#ff6347] font-medium cursor-pointer hover:underline">
                            <Link to={'/restaurant/login'}>
                                Login
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

export default RestaurantSignup;
