import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import assets from '../assets/frontend_assets/assets'
import {StoreContext} from '../context/StoreContext'
import axios from 'axios'

const Login = () => {

    const {url,setRole,setToken} = useContext(StoreContext)

    const [data,setData] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}) )
    }

    const navigate = useNavigate()

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url+"/api/user/login";
        const response = await axios.post(newUrl,data);
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
            <div className="m-15 p-12 max-w-md mx-auto border rounded-2xl shadow-2xl bg-white">
                <form onSubmit={onLogin} className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
                        <Link to={'/'}>
                            <img src={assets.cross_icon} alt="Close" className="w-5 h-5 cursor-pointer" />
                        </Link>
                    </div>

                    <div className="space-y-4">
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
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-700">
                        Don't have an account?{" "}
                        <span className="text-[#ff6347] font-medium cursor-pointer hover:underline">
                            <Link to={'/user/signup'}>
                                Create account
                            </Link>
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login
