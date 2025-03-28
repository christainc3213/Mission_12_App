import React, { useState, useEffect } from 'react';
import { getBooks, getCategories } from '../api/bookService';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string>("title");
    const [ascending, setAscending] = useState<boolean>(true);
    const [totalItems, setTotalItems] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    // Access cart functions and state from the context
    const { addToCart, totalItems: cartTotalItems, totalPrice: cartTotalPrice } = useCart();

    const handleAddToCart = (book: Book) => {
        addToCart(book.bookID, book.title, book.price);
    };

    // Fetch categories for the dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
        fetchCategories();
    }, []);

    // Fetch books from the API
    const fetchBooks = async () => {
        const { totalItems, paginatedBooks } = await getBooks(pageNumber, pageSize, sortBy, ascending, selectedCategory);
        setBooks(paginatedBooks);
        setTotalItems(totalItems); // Set the total items count
    };

    // Handle sorting by column
    const handleSort = (column: string) => {
        if (sortBy === column) {
            setAscending(!ascending);  // Toggle sorting order
        } else {
            setSortBy(column);
            setAscending(true);  // Default to ascending when changing columns
        }
    };

    // Handle category change
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setPageNumber(1);  // Reset to first page on category change
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // Fetch books when page number, page size, sort column, sort order, or category changes
    useEffect(() => {
        fetchBooks();
    }, [pageNumber, pageSize, sortBy, ascending, selectedCategory]);

    return (
        <div className="container mt-4">

            {/* Cart Summary */}
            <div className="alert alert-info">
                <h4>Cart Summary</h4>
                <p>Total Items: {cartTotalItems}</p>
                <p>Total Price: ${cartTotalPrice.toFixed(2)}</p>
            </div>

            {/* Category Filter */}
            <div className="form-group mb-3">
                <label>Filter by Category:</label>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="form-select"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Page Size Selector */}
            <div className="form-group mb-3">
                <label>Results per page:</label>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(parseInt(e.target.value))}
                    className="form-select"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* Book Table */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th onClick={() => handleSort("title")}>Title</th>
                    <th onClick={() => handleSort("author")}>Author</th>
                    <th onClick={() => handleSort("publisher")}>Publisher</th>
                    <th onClick={() => handleSort("isbn")}>ISBN</th>
                    <th onClick={() => handleSort("classification")}>Classification</th>
                    <th onClick={() => handleSort("category")}>Category</th>
                    <th onClick={() => handleSort("pagecount")}>Page Count</th>
                    <th onClick={() => handleSort("price")}>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.bookID}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.isbn}</td>
                        <td>{book.classification}</td>
                        <td>{book.category}</td>
                        <td>{book.pageCount}</td>
                        <td>${book.price.toFixed(2)}</td>
                        <td>
                            <button
                                className="btn btn-success"
                                onClick={() => handleAddToCart(book)}
                                data-bs-toggle="tooltip"
                                title="Add this book to your cart"
                            >
                                Add to Cart
                            </button>


                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>
                <span>Page {pageNumber} of {totalPages}</span>
                <button
                    className="btn btn-primary"
                    disabled={pageNumber >= totalPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;
