import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/bookService';
import { Book } from '../types/Book';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string>("title");
    const [ascending, setAscending] = useState<boolean>(true);

    // Fetch books from the API
    const fetchBooks = async () => {
        const data = await getBooks(pageNumber, pageSize, sortBy, ascending);
        console.log('Fetched books:', data);
        setBooks(data);
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

    // Fetch books when page number, page size, sort column, or sorting order changes
    useEffect(() => {
        fetchBooks();
    }, [pageNumber, pageSize, sortBy, ascending]);

    return (
        <div className="container mt-4">
            <h2>Book List</h2>
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
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>
                <span>Page {pageNumber}</span>
                <button
                    className="btn btn-primary"
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;
