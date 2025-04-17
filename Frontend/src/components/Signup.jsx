import React, { useContext, useState } from 'react'
import assets from '../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'

const Signup = () => {

    const {url,setRole,setToken} = useContext(StoreContext)

    const [data,setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }
    const navigate = useNavigate()

    const onSignup = async (event) => {
        event.preventDefault();
        let newUrl = url + "/api/user/register"
        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            setRole("user")
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("role","user")
            navigate('/')
        }else{
            alert(response.data.message)
        }
    }

    return (
        <>
            <div className="m-5 p-8 max-w-md mx-auto border rounded-2xl shadow-md bg-white">
                <form onSubmit={onSignup} className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
                        <Link to={'/'}>
                            <img src={assets.cross_icon} alt="Close" className="w-5 h-5 cursor-pointer" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            name='email'
                            onChange={onChangeHandler}
                            value={data.email}
                            type="email"
                            placeholder="Your email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type="password"
                            placeholder="Your password"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ff6347] text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                        Create account
                    </button>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" required />
                        <p>
                            By continuing, I agree to the{" "}
                            <span className="text-[#ff6347] underline cursor-pointer">terms of use</span> &{" "}
                            <span className="text-[#ff6347] underline cursor-pointer">privacy policy</span>.
                        </p>
                    </div>

                    <p className="text-center text-sm text-gray-700">
                        Already have an account?{" "}
                        <span className="text-[#ff6347] font-medium cursor-pointer hover:underline">
                            <Link to={'/user/login'}>
                                Login
                            </Link>
                        </span>
                    </p>
                </form>
            </div>

        </>
    )
}

export default Signup
