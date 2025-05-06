import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, DELETE_CART_ITEM } from '../utils/mutations.js'
import { GET_CART } from '../utils/queries.js'

function ProductCard({ product }) {
    const [addToCart, { error }] = useMutation(ADD_TO_CART, {
        refetchQueries: [{ query: GET_CART }]
    });
    const { data, loading } = useQuery(GET_CART);
    const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY, {
        refetchQueries: [{ query: GET_CART }]
    });
    const [deleteCartItem] = useMutation(DELETE_CART_ITEM, {
        refetchQueries: [{ query: GET_CART }]
    });

    if (loading) return <p>Loading...</p>

    const cart = data?.getCart || [];
    const cartItem = cart.find(item => item.productId === product.id.toString());

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
            {cartItem ? (
            <div className="product-quantity">
                <button
                    onClick={() => {
                        if (cartItem.quantity <= 1) {
                          deleteCartItem({ variables: { cartItemId: cartItem.id } });
                        } else {
                          updateCartQuantity({
                            variables: {
                              cartItemId: cartItem.id,
                              quantity: cartItem.quantity - 1
                            }
                          });
                        }
                    }}
                >
                –
                </button>
                <span>{cartItem.quantity}</span>
                <button
                onClick={() =>
                    updateCartQuantity({
                    variables: {
                        cartItemId: cartItem.id,
                        quantity: cartItem.quantity + 1
                    }
                    })
                }
                >
                +
                </button>
            </div>
            ) : (
                <button onClick={handleAddToCart}>Add to Cart</button>
            )}
        </div>
    )
}

export default ProductCard;