// src/components/ProductCard.js  

const ProductCard = ({ product }) => {  
    return (  
        <div className="product-card">  
            <h2>{product.name}</h2>  
            <p>Prix: {product.price}€</p>  
            <p>{product.description}</p>  
            <button>Ajouter au Panier</button>  
        </div>  
    );  
};  

export default ProductCard;