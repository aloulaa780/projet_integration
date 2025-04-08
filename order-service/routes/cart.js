const express = require('express');  
const Cart = require('../models/cart');  

const router = express.Router();  

// Ajouter un produit au panier  
router.post('/', async (req, res) => {  
    const newCart = new Cart(req.body);  
    try {  
        const savedCart = await newCart.save();  
        res.status(201).json(savedCart);  
    } catch (err) {  
        res.status(500).json(err);  
    }  
});  

// Obtenir le panier d'un utilisateur  
router.get('/:userId', async (req, res) => {  
    try {  
        const cart = await Cart.findOne({ userId: req.params.userId });  
        res.status(200).json(cart);  
    } catch (err) {  
        res.status(500).json(err);  
    }  
});  

// Mettre à jour un produit dans le panier  
router.put('/:userId/products', async (req, res) => {  
    try {  
        const cart = await Cart.findOneAndUpdate(  
            { userId: req.params.userId },  
            { $push: { products: req.body } },  
            { new: true, upsert: true }  
        );  
        res.status(200).json(cart);  
    } catch (err) {  
        res.status(500).json(err);  
    }  
});  

module.exports = router;  