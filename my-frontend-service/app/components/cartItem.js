// src/components/CartItem.js  

const CartItem = ({ item, removeFromCart }) => {  
    return (  
        <li>  
            {item.name} - {item.price}€  
            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>  
        </li>  
    );  
};  

export default CartItem;