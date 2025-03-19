// src/pages/admin/edit_product.js  

import { useEffect, useState } from 'react';  
import { useRouter } from 'next/router';  

const EditProduct = () => {  
    const router = useRouter();  
    const { id } = router.query; // On récupère l'id du produit à modifier  
    const [product, setProduct] = useState({ name: '', price: '', description: '' });  

    useEffect(() => {  
        if (id) {  
            const fetchProduct = async () => {  
                const res = await fetch(`/api/admin/products/${id}`);  
                const data = await res.json();  
                setProduct(data);  
            };  

            fetchProduct();  
        }  
    }, [id]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        const res = await fetch(`/api/admin/products/${id}`, {  
            method: 'PUT',  
            headers: {  
                'Content-Type': 'application/json',  
            },  
            body: JSON.stringify(product),  
        });  

        if (res.ok) {  
            // Gérer le succès  
            console.log("Produit modifié avec succès !");  
        } else {  
            // Gérer l'échec  
            console.error("Erreur lors de la modification du produit");  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Modifier le Produit</h1>  
            <input  
                type="text"  
                value={product.name}  
                onChange={(e) => setProduct({ ...product, name: e.target.value })}  
                placeholder="Nom du produit"  
                required  
            />  
            <input  
                type="number"  
                value={product.price}  
                onChange={(e) => setProduct({ ...product, price: e.target.value })}  
                placeholder="Prix"  
                required  
            />  
            <textarea  
                value={product.description}  
                onChange={(e) => setProduct({ ...product, description: e.target.value })}  
                placeholder="Description"  
                required  
            />  
            <button type="submit">Modifier Produit</button>  
        </form>  
    );  
};  

export default EditProduct;