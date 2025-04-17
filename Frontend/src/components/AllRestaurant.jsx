import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';

const AllRestaurant = () => {
    const { url, food_list } = useContext(StoreContext);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(url + "/api/restaurant/all");
                setRestaurants(response.data.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    const getRestaurantImage = (restaurantId) => {
        const foodItem = food_list.find(item => item.restaurantId === restaurantId);
        return foodItem ? `${url}/images/${foodItem.image}` : "https://via.placeholder.com/300x180?text=No+Image";
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Top Restaurants Near you</h1>

            {restaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <Link to={`/user/restaurant/${restaurant._id}`} key={restaurant._id}>
                            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-5 h-full flex flex-col">
                                <img
                                    src={getRestaurantImage(restaurant._id)}
                                    alt={restaurant.name}
                                    className="h-48 w-full object-cover rounded-xl mb-4"
                                />
                                <h2 className="text-2xl font-semibold mb-1">{restaurant.name}</h2>
                                <p className="text-gray-600 text-sm">{restaurant.address.street},{restaurant.address.city}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">No restaurants found.</p>
            )}
        </div>
    );
};

export default AllRestaurant;


