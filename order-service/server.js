const express = require('express');  
const mongoose = require('mongoose');  
const orderRoutes = require('./routes/order');  
const cartRoutes = require('./routes/cart');  
require('dotenv').config();  

const app = express();  

// Middleware  
app.use(express.json());  

// Connexion à MongoDB  
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('MongoDB connected'))  
    .catch(err => console.log(err));  

// Routes  
app.use('/api/orders', orderRoutes);  
app.use('/api/carts', cartRoutes);  

// Démarrer le serveur  
const PORT = process.env.PORT || 5001;  
app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});  