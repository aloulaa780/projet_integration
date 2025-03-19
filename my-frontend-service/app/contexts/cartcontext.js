// src/context/cartContext.js  

import { createContext, useContext, useState } from 'react';  

const CartContext = createContext();  

export const CartProvider = ({ children }) => {  
    const [cart, setCart] = useState([]);  

    const addToCart = (item) => {  
        setCart([...cart, item]);  
    };  

    const removeFromCart = (id) => {  
        setCart(cart.filter((item) => item.id !== id));  
    };  

    const total = cart.reduce((acc, item) => acc + item.price, 0);  

    return (  
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>  
            {children}  
        </CartContext.Provider>  
    );  
};  

export const useCart = () => useContext(CartContext);