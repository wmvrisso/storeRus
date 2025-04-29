function ProductCard({ product }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: 'auto'}}
            />
            <h2 style={{ fontSize: '1rem'}}>{product.title}</h2>
            <p>${product.price}</p>
            {/* Need to add functionality here. */}
            <button>Add to Cart</button> 
        </div>
    )
}

export default ProductCard;