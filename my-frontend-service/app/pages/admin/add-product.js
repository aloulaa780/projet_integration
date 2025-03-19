// src/pages/admin/add_product.js  

import { useState } from 'react';  

const AddProduct = () => {  
    const [name, setName] = useState('');  
    const [price, setPrice] = useState('');  
    const [description, setDescription] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        
        // Logique pour ajouter le produit via votre API  
        const newProduct = { name, price, description };  
        const res = await fetch('/api/admin/products', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify(newProduct),  
        });  

        if (res.ok) {  
            // Gérer le succès (par exemple, redirection ou notification)  
            console.log("Produit ajouté avec succès !");  
        } else {  
            // Gérer l'échec  
            console.error("Erreur lors de l'ajout du produit");  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Ajouter un Produit</h1>  
            <input  
                type="text"  
                value={name}  
                onChange={(e) => setName(e.target.value)}  
                placeholder="Nom du produit"  
                required  
            />  
            <input  
                type="number"  
                value={price}  
                onChange={(e) => setPrice(e.target.value)}  
                placeholder="Prix"  
                required  
            />  
            <textarea  
                value={description}  
                onChange={(e) => setDescription(e.target.value)}  
                placeholder="Description"  
                required  
            />  
            <button type="submit">Ajouter Produit</button>  
        </form>  
    );  
};  

export default AddProduct;