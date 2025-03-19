// src/pages/admin/orders.js  

import { useEffect, useState } from 'react';  

const Orders = () => {  
    const [orders, setOrders] = useState([]);  

    useEffect(() => {  
        const fetchOrders = async () => {  
            const res = await fetch('/api/admin/orders'); // Remplacez par votre API  
            const data = await res.json();  
            setOrders(data);  
        };  
        fetchOrders();  
    }, []);  

    return (  
        <div>  
            <h1>Gestion des Commandes</h1>  
            <ul>  
                {orders.map((order) => (  
                    <li key={order.id}>  
                        Commande #{order.id} - Total: {order.total}€  
                        <p>Détails : {JSON.stringify(order.items)}</p>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default Orders;