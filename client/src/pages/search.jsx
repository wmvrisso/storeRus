import { useState, useEffect } from 'react';

function ProductSearch () {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);//may not need
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
            <h1>Product List</h1>
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
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                    <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                    <h2 style={{ fontSize: '1rem' }}>{product.title}</h2>
                    <p>${product.price}</p>
                    </div>
                ))
                ) : (
                <p>No products found for "{searchTerm}"</p>
                )}
            </div>
        </div>
    );  
}

export default ProductSearch;