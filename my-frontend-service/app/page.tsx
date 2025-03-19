import Header from './components/Header';
import Footer from './components/Footer';
import { fetchProducts } from './services/api';
import ProductCard from './components/productcard';


export default async function Home() {
    const products = await fetchProducts();

    return (
        <main className="bg-gray-100 min-h-screen">
            <Header />

            {/* Section Hero */}
            <section className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white" 
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Bienvenue sur Phone Accessoires</h1>
                    <p className="mt-4 text-lg md:text-xl drop-shadow-lg">Découvrez nos accessoires innovants pour votre smartphone</p>
                    <a href="#products" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg transition">Découvrir</a>
                </div>
            </section>

            {/* Section Produits */}
            <section id="products" className="py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Nos Produits Populaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Section Témoignages */}
            <section className="bg-white py-12 px-6 text-center">
                <h2 className="text-3xl font-bold mb-6">Ce que disent nos clients</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="bg-gray-200 p-6 rounded-lg w-80 shadow">
                        <p className="text-gray-700 italic">Des produits de qualite, livraison rapide !</p>
                        <p className="mt-2 font-bold">- Alice D.</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg w-80 shadow">
                        <p className="text-gray-700 italic">Tres satisfait de mon achat, je recommande !</p>
                        <p className="mt-2 font-bold">- Karim B.</p>
                    </div>
                </div>
            </section>

            {/* Section Abonnement Newsletter */}
            <section className="bg-blue-500 text-white text-center py-12">
                <h2 className="text-3xl font-bold">Restez informé des promotions !</h2>
                <p className="mt-2 text-lg">Abonnez-vous à notre newsletter</p>
                <form className="mt-4 flex justify-center">
                    <input type="email" placeholder="Votre email" className="p-3 rounded-l-lg w-64 text-gray-800"/>
                    <button type="submit" className="bg-black px-4 py-3 rounded-r-lg hover:bg-gray-800 transition">abonner</button>
                </form>
            </section>

            <Footer />
        </main>
    );
}
