import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations.js'

function ProductCard({ product }) {
    const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);

    const handleAddToCart = async () => {
        try {
            await addToCart({
                variables: { 
                    productData:{
                        productId: product.id.toString(),
                        title: product.title,
                        price: product.price.toString(),
                        image: product.thumbnail
                    }
                }
            });
            alert('Added to cart!');
        } catch (err) {
            console.error('Error adding to cart:', err.message);
            alert('Please log in to add items to your cart.')
        }
    };

    return (
        <div className="product-card">
            <img
                src={product.thumbnail}
                alt={product.title}
            />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>ADD TO CART</button> 
        </div>
    )
}

export default ProductCard;