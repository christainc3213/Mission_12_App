import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
    bookID: number;
    title: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (bookID: number, title: string, price: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from session storage on mount
    useEffect(() => {
        const savedCart = sessionStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to session storage on change
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (bookID: number, title: string, price: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.bookID === bookID);
            if (existingItem) {
                return prevCart.map(item =>
                    item.bookID === bookID
                        ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
                        : item
                );
            } else {
                const newItem: CartItem = {
                    bookID,
                    title,
                    quantity: 1,
                    price,
                    subtotal: price,
                };
                return [...prevCart, newItem];
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.subtotal, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
