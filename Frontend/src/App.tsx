import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import CartPage from './components/CartPage';
import { useCart } from './context/CartContext';

const App: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <Router>
            <nav className="navbar navbar-light bg-light">
                <Link to="/" className="navbar-brand">Bookstore</Link>
                <Link to="/cart" className="btn btn-primary position-relative">
                    View Cart
                    {totalItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
};

export default App;
