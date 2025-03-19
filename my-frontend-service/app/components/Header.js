// src/components/Header.js  

import Link from 'next/link';  

const Header = () => {  
    return (  
        <header>  
            <h1>Ma Boutique des Accessoires</h1>  
            <nav>  
                <ul>  
                    <li><Link href="/">Accueil</Link></li>  
                    <li><Link href="/catalog">Catalogue</Link></li>  
                    <li><Link href="/cart">Mon Panier</Link></li>  
                    <li><Link href="/login">identifier</Link></li>  
                    <li><Link href="/register">enregistrer</Link></li>  
                </ul>  
            </nav>  
        </header>  
    );  
};  

export default Header;