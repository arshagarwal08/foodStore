import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";
    
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [restaurantName,setRestaurantName] = useState("");
    const [restaurantId,setRestaurantId] = useState("");
    

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.get(url + "/api/cart/get", { headers: { token } });
        setCartItems(response?.data?.cartData || {});
    };
      

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                const storedToken = localStorage.getItem("token");
                setToken(storedToken);
                const storedRole = localStorage.getItem("role");
                setRole(storedRole);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    

    const addToCart = async (itemID) => {
        const item = food_list.find((foodItem) => foodItem._id === itemID);
        if (!item) return;
        
        const itemRestaurantId = item.restaurantId;
        
        if (!restaurantId || Object.keys(cartItems).length === 0) {
            setRestaurantId(itemRestaurantId);
        }
    
        if (restaurantId && restaurantId !== itemRestaurantId) {
            const confirmClear = window.confirm(
                "Your cart contains items from another restaurant. Do you want to clear the cart and add items from this restaurant instead?"
            );
    
            if (!confirmClear) return;
    
            setCartItems({ [itemID]: 1 });
            setRestaurantId(itemRestaurantId);
        } else {
            if (!cartItems[itemID]) {
                setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
            } else {
                setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
            }
        }
    
        if (token) {
            await axios.post(url + "/api/cart/add", { itemID }, { headers: { token } });
        }
    };    
    

    const removeFromCart = async (itemID) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
    
            if (updatedCart[itemID] > 1) {
                updatedCart[itemID] -= 1;
            } else {
                delete updatedCart[itemID];
            }
    
            return updatedCart;
        });
    
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemID }, { headers: { token } });
        }
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        role,
        setRole,
        restaurantName,
        setRestaurantName,
        restaurantId,
        setRestaurantId
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
