import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';

const RestaurantFoodList = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(StoreContext);

  const fetchFood = async () => {
    const response = await axios.get(url + "/api/food/listRestaurant", { headers: { token } });
    if (response.data.success) {
      setFood(response.data.data);
    } else {
      console.error("Failed to fetch food items");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchFood();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xl text-gray-600 font-semibold">Loading food items...</p>
      </div>
    );
  }

  return (
    <div>
      {food.length === 0 ? (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600 font-semibold mb-4">
            Currently no food in your restaurant
          </p>
          <Link
            to="/restaurant/addfood"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
          >
            Add food
          </Link>
        </div>

      ) : (
        <div className="h-screen p-6 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-6">Your Food Items</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Food</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Remove</th>
                </tr>
              </thead>
              <tbody>
                {food.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-6 py-4 text-sm text-center">
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${item.price}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantFoodList;
