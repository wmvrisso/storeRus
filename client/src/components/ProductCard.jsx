import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations.js'

function ProductCard({ product }) {
    const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);

    const handleAddToCart = async () => {
        try {
            await addToCart({
                variables: { productId: product.id }
            });
            alert('Added to cart!');
        } catch (err) {
            console.error('Error adding to cart:', err.message);
            alert('Please log in to add items to your cart.')
        }
    };

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
            <button onClick={handleAddToCart}>Add to Cart</button> 
        </div>
    )
}

export default ProductCard;