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

    const cartItems = data.cart;

    if (!cartItems.length) {
        return (
            <div>
                <p>Your cart is empty.</p>
                <button onClick={() => navigate('/')}>Start Shopping</button>
            </div>
        );
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
    )

    return (
        <div style = {{padding: '20px'}}>
            <h1>Your Cart</h1>
            {cartItems.map(item => (
                <div key={item.id} style={{borderBottom: '1px solid #ccc', padding: '10px'}}>
                    <img src={item.product.thumbnail} alt={item.product.title} style={{width: '100px'}}/>
                    <h2>{item.product.title}</h2>
                    <p>
                        ${item.product.price} * {item.quantity}
                    </p>
                    <p>Subtotal: ${(item.quantity * item.product.price).toFixed(2)}</p>
                    <button onClick={() => removeFromCart({ variables: { cartItemId: item.id } })}>
                        Remove
                    </button>
                </div>
            ))}
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    )
}

export default Cart;
