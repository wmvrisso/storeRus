import { useQuery, useMutation } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import { DELETE_CART_ITEM, UPDATE_CART_QUANTITY } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { loading, error, data } = useQuery(GET_CART)
    const [deleteCartItem] = useMutation(DELETE_CART_ITEM, {
        refetchQueries: [{query: GET_CART}], 
    });
    const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY, {
        refetchQueries: [{ query: GET_CART }],
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
                            <div className="cart-item-quantity">
                                Qty:
                                <button className=".cart-item-quantity" onClick={() => updateCartQuantity({
                                    variables: { cartItemId: item.id, quantity: item.quantity - 1 }
                                })} disabled={item.quantity <= 1}>–</button>

                                <span>{item.quantity}</span>

                                <button className=".cart-item-quantity" onClick={() => updateCartQuantity({
                                    variables: { cartItemId: item.id, quantity: item.quantity + 1 }
                                })}>+</button>
                            </div>
                            <div className="cart-item-subtotal">
                                Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}
                            </div>
                            <button 
                                className="cart-item-remove"
                                onClick={() => deleteCartItem({ variables: { cartItemId: item.id } })}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 01-1-1V5a1 1 0 00-1-1H9a1 1 0 00-1 1v1a1 1 0 01-1 1h10z"
                                    />
                                </svg>
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
