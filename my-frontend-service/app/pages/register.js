// src/pages/register.js  

import { useState } from 'react';  

const Register = () => {  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        // Logique d'inscription ici  
        console.log("Essayer de s'inscrire avec", email, password);  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Inscription</h1>  
            <input  
                type="email"  
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
                placeholder="Email"  
                required  
            />  
            <input  
                type="password"  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
                placeholder="Mot de passe"  
                required  
            />  
            <button type="submit">inscrire</button>  
        </form>  
    );  
};  

export default Register;