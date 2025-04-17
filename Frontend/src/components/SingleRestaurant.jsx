import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import assets from '../assets/frontend_assets/assets';

const SingleRestaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { url, food_list, cartItems, addToCart, removeFromCart, } = useContext(StoreContext);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(url + "/api/restaurant/" + id);
                setRestaurant(response.data.data);
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        };
        fetchRestaurant();
        
    }, [id]);

    if (!restaurant) return <div className="text-center text-xl">Loading...</div>;

    const filteredFoodItems = food_list.filter((item) => item.restaurantId === id);

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <h3 className="text-lg text-gray-500">{restaurant.description}</h3>
            </div>

            <div className="mt-12">
                <h2 className="text-3xl font-semibold mb-6">Menu</h2>

                {filteredFoodItems.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">No menu items available</p>
                ) : (
                    filteredFoodItems.map((item) => (
                        <div key={item._id} className="flex bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
                            <div className="flex-1 pr-6">
                                <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-xl font-bold text-orange-500">Price: ${item.price}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img className="w-32 h-32 object-cover rounded-lg" src={url + "/images/" + item.image} alt={item.name} />
                            </div>

                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                {
                                    !cartItems[item._id] ? (
                                        <img
                                            className="w-8 cursor-pointer"
                                            onClick={() => addToCart(item._id)}
                                            src={assets.add_icon_white}
                                            alt="Add to cart"
                                        />
                                    ) : (
                                        <div className="bg-white flex gap-2 items-center p-2 rounded-full">
                                            <img
                                                className="w-6 cursor-pointer"
                                                onClick={() => removeFromCart(item._id)}
                                                src={assets.remove_icon_red}
                                                alt="Remove from cart"
                                            />
                                            <p className="text-sm font-semibold">{cartItems[item._id]}</p> {/* Display the current quantity */}
                                            <img
                                                className="w-6 cursor-pointer"
                                                onClick={() => addToCart(item._id)}
                                                src={assets.add_icon_green}
                                                alt="Add more"
                                            />
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SingleRestaurant;
