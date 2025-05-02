import { useQuery, useMutation } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import { REMOVE_FROM_CART } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { loading, error, data } = useQuery(GET_CART)
    const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
        refetchQueries: ['GetCart'], 
    });

    const navigate = useNavigate();

    if(loading) return <p>Loading cart...</p>;
    if(error) {
        console.error(error);
        return <p>Error loading cart. Are you logged in?</p>
    }

    const cartItems = data.getCart;

    if (!cartItems.length) {
        return (
            <div>
                <p>Your cart is empty.</p>
                <button onClick={() => navigate('/')}>Start Shopping</button>
            </div>
        );
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
    )

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <div className="cart-item-left">
                        <img src={item.image} alt={item.title}/>
                        <div>
                            <div className="cart-item-title">{item.title}</div>
                        </div>
                    </div>
                    <div>
                        <div className="cart-item-right">
                            <div className="cart-item-price">${item.price}</div>
                            <div className="cart-item-quantity">QTY: {item.quantity}</div>
                            <div className="cart-item-subtotal">
                                Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}
                            </div>
                            <button 
                                className="cart-item-remove"
                                onClick={() => removeFromCart({ variables: { cartItemId: item.id } })}
                            >
                                Remove
                            </button>
                        </div>
                    </div>  
                </div>
            ))}
            <div className="cart-total-container">
                <div className="cart-total-label">Cart Total</div>
                <div className="cart-total-value">${total.toFixed(2)}</div>
            </div>
        </div>
    )
}

export default Cart;
