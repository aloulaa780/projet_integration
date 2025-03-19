
import { useState } from 'react';  

const Login = () => {  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setLoading(true);  
        setError('');  

        try {  
            // Remplacez cette URL par celle de votre API  
            const response = await fetch('https://votre-api.com/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ email, password }),  
            });  

            if (!response.ok) {  
                throw new Error('Échec de la connexion');  
            }  

            const data = await response.json();  
            console.log("Connexion réussie", data);  
            // Gérer la redirection ou l'état après connexion  
        } catch (err) {  
            setError(err.message);  
        } finally {  
            setLoading(false);  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <h1>Connexion</h1>  
            {error && <p style={{ color: 'red' }}>{error}</p>}  
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
            <button type="submit" disabled={loading}>  
                {loading ? 'Chargement...' : 'Connexion'}  
            </button>  
        </form>  
    );  
};  

export default Login;