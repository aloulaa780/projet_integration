// src/pages/index.js  

import Link from 'next/link';  

const Home = () => {  
    return (  
        <div style={{   
            display: 'flex',   
            flexDirection: 'column',   
            alignItems: 'center',   
            justifyContent: 'center',   
            height: '100vh',   
            backgroundColor: '#f5f5f5',   
            color: '#333'   
        }}>  
            <h1 style={{   
                fontSize: '2.5rem',   
                marginBottom: '20px'   
            }}>  
                Bienvenue sur notre boutique des accessoires téléphoniques!  
            </h1>  
            <nav>  
                <ul style={{   
                    listStyleType: 'none',   
                    padding: '0'   
                }}>  
                    <li style={{ margin: '10px 0' }}>  
                        <Link href="/catalog">  
                            <a style={{   
                                display: 'inline-block',   
                                padding: '10px 20px',   
                                backgroundColor: '#0070f3',   
                                color: '#fff',   
                                borderRadius: '5px',   
                                textDecoration: 'none'   
                            }}>Voir le catalogue</a>  
                        </Link>  
                    </li>  
                    <li style={{ margin: '10px 0' }}>  
                        <Link href="/login">  
                            <a style={{   
                                display: 'inline-block',   
                                padding: '10px 20px',   
                                backgroundColor: '#0070f3',   
                                color: '#fff',   
                                borderRadius: '5px',   
                                textDecoration: 'none'   
                            }}>Se connecter</a>  
                        </Link>  
                    </li>  
                    <li style={{ margin: '10px 0' }}>  
                        <Link href="/register">  
                            <a style={{   
                                display: 'inline-block',   
                                padding: '10px 20px',   
                                backgroundColor: '#0070f3',   
                                color: '#fff',   
                                borderRadius: '5px',   
                                textDecoration: 'none'   
                            }}>inscrire</a>  
                        </Link>  
                    </li>  
                    <li style={{ margin: '10px 0' }}>  
                        <Link href="/cart">  
                            <a style={{   
                                display: 'inline-block',   
                                padding: '10px 20px',   
                                backgroundColor: '#0070f3',   
                                color: '#fff',   
                                borderRadius: '5px',   
                                textDecoration: 'none'   
                            }}>Mon Panier</a>  
                        </Link>  
                    </li>  
                </ul>  
            </nav>  
        </div>  
    );  
};  

export default Home;