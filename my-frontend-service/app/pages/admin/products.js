// src/pages/admin/products.js  

import { useEffect, useState } from 'react';  

const Products = () => {  
    const [products, setProducts] = useState([]);  

    useEffect(() => {  
        const fetchProducts = async () => {  
            const res = await fetch('/api/admin/products'); // Remplacez par votre API  
            const data = await res.json();  
            setProducts(data);  
        };  
        fetchProducts();  
    }, []);  

    return (  
        <div>  
            <h1>Gestion des Produits</h1>  
            <ul>  
                {products.map((product) => (  
                    <li key={product.id}>  
                        {product.name} - {product.price}€  
                        <button>Modifier</button>  
                        <button>Supprimer</button>  
                    </li>  
                ))}  
            </ul>  
            <button>Ajouter un nouveau produit</button>  
        </div>  
    );  
};  

export default Products;