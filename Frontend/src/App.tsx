import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import CartPage from './components/CartPage';
import AdminBooks from './components/AdminBooks';

const App: React.FC = () => {
    return (
        <Router>
            <nav className="navbar navbar-light bg-light">
                <Link to="/" className="navbar-brand">Bookstore</Link>
                <Link to="/cart" className="btn btn-primary">View Cart</Link>
                <Link to="/adminbooks" className="btn btn-secondary ms-2">Admin</Link>
            </nav>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/adminbooks" element={<AdminBooks />} />
            </Routes>
        </Router>
    );
};



export default App;
