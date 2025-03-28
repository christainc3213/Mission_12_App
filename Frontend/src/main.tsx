import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Import Cyborg Bootswatch theme from the installed package
import "bootswatch/dist/lux/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>
);
