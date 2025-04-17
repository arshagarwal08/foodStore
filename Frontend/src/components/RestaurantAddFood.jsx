import React, { useState, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import assets from '../assets/admin_assets/assets.js'

const RestaurantAddFood = () => {
  const { url, token } = useContext(StoreContext)

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  })

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setData({ ...data, image: e.target.files[0] })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", data.price)
      formData.append("category", data.category)
      formData.append("image", data.image)

      const response = await axios.post(url + "/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token
        }
      })

      if (response.data.success) {
        alert("Food item added successfully!")
        setData({
          name: '',
          description: '',
          price: '',
          category: '',
          image: null
        })
        document.getElementById('image').value = ""
      } else {
        alert(response.data.message || "Failed to add food")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!")
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <p className="text-sm font-medium text-gray-700">Product name</p>
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={data.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Food description</p>
            <textarea
              name="description"
              placeholder="Description"
              value={data.description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Price</p>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={data.price}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Select the category</p>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a category</option>
              <option value="Paratha">Paratha</option>
              <option value="Rolls">Rolls</option>
              <option value="Cakes">Cakes</option>
              <option value="Noodles">Noodles</option>
              <option value="Chicken">Chicken</option>
              <option value="Burger">Burgers</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pizza">Pizza</option>
              <option value="Momos">Momos</option>
              <option value="Dosa">Dosa</option>
              <option value="Pasta">Pasta</option>
              <option value="Ice Cream">Ice Cream</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Upload food image</p>
            <label
              htmlFor="image"
              className="block w-full cursor-pointer border-dashed border-2 border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-all"
            >
              <img
                src={data.image ? URL.createObjectURL(data.image) : assets.upload_area}
                alt="Upload"
                className="mx-auto w-24 h-24 object-cover rounded"
              />
              <span className="text-sm text-gray-500">{data.image ? "Change image" : "Click to upload"}</span>
            </label>
            <input
              type="file"
              id='image'
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              hidden
              required
            />
          </div>


          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-all"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  )
}

export default RestaurantAddFood
