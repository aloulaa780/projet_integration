// src/pages/admin/dashboard.js  

import Link from 'next/link';  

const AdminDashboard = () => {  
    return (  
        <div>  
            <h1>Tableau de bord administrateur</h1>  
            <nav>  
                <ul>  
                    <li><Link href="/admin/products">Gérer les produits</Link></li>  
                    <li><Link href="/">Retour à accueil</Link></li>  
                </ul>  
            </nav>  
        </div>  
    );  
};  

export default AdminDashboard;