const express = require('express');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const User = require('../models/user');  

const router = express.Router();  

// Inscription  
router.post('/register', async (req, res) => {  
    const { username, email, password } = req.body;  

    // Vérifier si l'utilisateur existe déjà  
    const existingUser = await User.findOne({ email });  
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });  

    // Hachage du mot de passe  
    const hashedPassword = await bcrypt.hash(password, 10);  
    
    const user = new User({ username, email, password: hashedPassword });  
    await user.save();  

    res.status(201).json({ message: 'User registered successfully!' });  
});  

// Connexion  
router.post('/login', async (req, res) => {  
    const { email, password } = req.body;  

    // Vérifier l'utilisateur  
    const user = await User.findOne({ email });  
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });  

    // Vérifier le mot de passe  
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });  

    // Générer le JWT  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });  

    res.json({ token });  
});  

module.exports = router;  