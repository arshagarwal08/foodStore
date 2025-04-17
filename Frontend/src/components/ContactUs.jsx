import React from 'react'
import { Link } from 'react-router-dom'
import assets from '../assets/frontend_assets/assets'

const ContactUs = () => {
  return (
    <>
      <div className="m-5 p-8 max-w-md mx-auto border rounded-2xl shadow-md bg-white">
        <form className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
            <Link to={'/'}>
              <img src={assets.cross_icon} alt="Close" className="w-5 h-5 cursor-pointer" />
            </Link>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <textarea
              placeholder="Your message"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 h-32 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff6347] text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      </div>

    </>
  )
}

export default ContactUs
