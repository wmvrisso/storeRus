import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function ProductSearch () {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts(){
            try {
                const response = await fetch('https://dummyjson.com/products?limit=100');
                const data = await response.json();
                setProducts(data.products);
                setFilteredProducts(data.products);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProducts(false);
    }, [])


    function handleSearch(e) {
        const term = e.target.value;
        setSearchTerm(term);

        if(term.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => 
                product.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }

    if(loading) return <p>Loading products...</p>
    if (!products.length) return <div>No products found.</div>

    return (
        <div style={{ padding: '20px' }}>
            <h2 className='slogan'>Everything you need. All in one place.</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        //need to add add to cart functionality here.
                    />
                ))
                ) : (
                <p>No products found for "{searchTerm}"</p>
                )}
            </div>
        </div>
    );  
}

export default ProductSearch;