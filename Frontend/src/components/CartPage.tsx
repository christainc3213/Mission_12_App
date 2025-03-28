import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
    const { cart, totalItems, totalPrice, clearCart } = useCart();

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.bookID}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.subtotal.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartPage;
