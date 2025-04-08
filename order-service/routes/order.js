const express = require('express');  
const Order = require('../models/order');  

const router = express.Router();  

// Ajouter une commande  
router.post('/', async (req, res) => {  
    const newOrder = new Order(req.body);  
    try {  
        const savedOrder = await newOrder.save();  
        res.status(201).json(savedOrder);  
    } catch (err) {  
        res.status(500).json(err);  
    }  
});  

// Obtenir toutes les commandes pour un utilisateur  
router.get('/:userId', async (req, res) => {  
    try {  
        const orders = await Order.find({ userId: req.params.userId });  
        res.status(200).json(orders);  
    } catch (err) {  
        res.status(500).json(err);  
    }  
});  

module.exports = router;  