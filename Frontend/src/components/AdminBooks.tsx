import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../api/adminService';
import { Book } from '../types/Book';

const AdminBooks: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [newBook, setNewBook] = useState<Book>({
        bookID: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0
    });

    const fetchBooks = async () => {
        const result = await getBooks();
        const bookList = Array.isArray(result) ? result : result.paginatedBooks || result.books || [];
        setBooks(bookList);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddBook = async () => {
        await createBook(newBook);
        setNewBook({
            bookID: 0,
            title: '',
            author: '',
            publisher: '',
            isbn: '',
            classification: '',
            category: '',
            pageCount: 0,
            price: 0
        });
        fetchBooks();
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
    };

    const handleUpdate = async () => {
        if (!editingBook) return;
        await updateBook(editingBook.bookID, editingBook);
        setEditingBook(null);
        fetchBooks();
    };

    const handleDelete = async (id: number) => {
        await deleteBook(id);
        fetchBooks();
    };

    const renderInput = (
        label: string,
        value: string | number,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        type: string = "text"
    ) => (
        <input className="form-control mb-2" placeholder={label} value={value} onChange={onChange} type={type} />
    );

    return (
        <div className="container mt-4">
            <h2>Admin - Manage Books</h2>

            {/* Add New Book Form */}
            <div className="card p-3 mb-4">
                <h4>Add a New Book</h4>
                {renderInput("Title", newBook.title, e => setNewBook({ ...newBook, title: e.target.value }))}
                {renderInput("Author", newBook.author, e => setNewBook({ ...newBook, author: e.target.value }))}
                {renderInput("Publisher", newBook.publisher, e => setNewBook({ ...newBook, publisher: e.target.value }))}
                {renderInput("ISBN", newBook.isbn, e => setNewBook({ ...newBook, isbn: e.target.value }))}
                {renderInput("Classification", newBook.classification, e => setNewBook({ ...newBook, classification: e.target.value }))}
                {renderInput("Category", newBook.category, e => setNewBook({ ...newBook, category: e.target.value }))}
                {renderInput("Page Count", newBook.pageCount, e => setNewBook({ ...newBook, pageCount: parseInt(e.target.value) }), "number")}
                {renderInput("Price", newBook.price, e => setNewBook({ ...newBook, price: parseFloat(e.target.value) }), "number")}
                <button className="btn btn-primary" onClick={handleAddBook}>Add Book</button>
            </div>

            {/* Edit Existing Book */}
            {editingBook && (
                <div className="card p-3 mb-4">
                    <h4>Edit Book (ID: {editingBook.bookID})</h4>
                    {renderInput("Title", editingBook.title, e => setEditingBook({ ...editingBook, title: e.target.value }))}
                    {renderInput("Author", editingBook.author, e => setEditingBook({ ...editingBook, author: e.target.value }))}
                    {renderInput("Publisher", editingBook.publisher, e => setEditingBook({ ...editingBook, publisher: e.target.value }))}
                    {renderInput("ISBN", editingBook.isbn, e => setEditingBook({ ...editingBook, isbn: e.target.value }))}
                    {renderInput("Classification", editingBook.classification, e => setEditingBook({ ...editingBook, classification: e.target.value }))}
                    {renderInput("Category", editingBook.category, e => setEditingBook({ ...editingBook, category: e.target.value }))}
                    {renderInput("Page Count", editingBook.pageCount, e => setEditingBook({ ...editingBook, pageCount: parseInt(e.target.value) }), "number")}
                    {renderInput("Price", editingBook.price, e => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) }), "number")}
                    <button className="btn btn-success me-2" onClick={handleUpdate}>Save Changes</button>
                    <button className="btn btn-secondary" onClick={() => setEditingBook(null)}>Cancel</button>
                </div>
            )}

            {/* Book Table */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Classification</th>
                    <th>Category</th>
                    <th>Page Count</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((b) => (
                    <tr key={b.bookID}>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.publisher}</td>
                        <td>{b.isbn}</td>
                        <td>{b.classification}</td>
                        <td>{b.category}</td>
                        <td>{b.pageCount}</td>
                        <td>${b.price.toFixed(2)}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(b)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(b.bookID)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBooks;
