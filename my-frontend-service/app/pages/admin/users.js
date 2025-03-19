// src/pages/admin/users.js  

import { useEffect, useState } from 'react';  

const Users = () => {  
    const [users, setUsers] = useState([]);  

    useEffect(() => {  
        const fetchUsers = async () => {  
            const res = await fetch('/api/admin/users'); // Remplacez par votre API  
            const data = await res.json();  
            setUsers(data);  
        };  
        fetchUsers();  
    }, []);  

    const handleDelete = async (userId) => {  
        const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });  
        if (res.ok) {  
            setUsers(users.filter((user) => user.id !== userId));  
            console.log("Utilisateur supprimé avec succès !");  
        } else {  
            console.error("Erreur lors de la suppression de l'utilisateur");  
        }  
    };  

    return (  
        <div>  
            <h1>Gestion des Utilisateurs</h1>  
            <ul>  
                {users.map((user) => (  
                    <li key={user.id}>  
                        {user.email}  
                        <button onClick={() => handleDelete(user.id)}>Supprimer</button>  
                    </li>  
                ))}  
            </ul>  
            <button>Ajouter un nouvel utilisateur</button>  
        </div>  
    );  
};  

export default Users;