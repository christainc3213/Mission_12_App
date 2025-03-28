import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import CartPage from './components/CartPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container p-4">
                <nav className="navbar navbar-light bg-light mb-4">
                    <Link to="/" className="navbar-brand">Bookstore</Link>
                    <Link to="/cart" className="btn btn-primary">View Cart</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
