// src/pages/catalog.js  

import { useEffect, useState } from 'react';  

const Catalog = () => {  
    const [products, setProducts] = useState([]);  

    useEffect(() => {  
        const fetchProducts = async () => {  
            const res = await fetch('/api/products'); // Remplacez par votre API  
            const data = await res.json();  
            setProducts(data);  
        };  
        fetchProducts();  
    }, []);  

    return (  
        <div>  
            <h1>Catalogue des produits</h1>  
            <ul>  
                {products.map((product) => (  
                    <li key={product.id}>  
                        <h2>{product.name}</h2>  
                        <p>Prix: {product.price}€</p>  
                        <button>Ajouter au panier</button>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default Catalog;