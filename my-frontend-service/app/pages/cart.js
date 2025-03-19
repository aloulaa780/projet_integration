// src/pages/cart.js  

import { useContext } from 'react';  
import { CartContext } from '../context/cartContext';  

const Cart = () => {  
    const { cart, total, removeFromCart } = useContext(CartContext);  

    return (  
        <div>  
            <h1>Mon Panier</h1>  
            <ul>  
                {cart.map((item) => (  
                    <li key={item.id}>  
                        {item.name} - {item.price}€  
                        <button onClick={() => removeFromCart(item.id)}>Supprimer</button>  
                    </li>  
                ))}  
            </ul>  
            <h2>Total: {total}€</h2>  
            <button>Payer</button>  
        </div>  
    );  
};  

export default Cart;