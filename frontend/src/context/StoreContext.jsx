import { createContext } from "react";
import { food_list } from '../assets/assets.js';
export const StoreContext = createContext(null)
import { useState } from "react";
import { useEffect } from "react";

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

    }
    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])


    const ContextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
    }

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
