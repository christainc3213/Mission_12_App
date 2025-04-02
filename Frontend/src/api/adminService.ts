const API_BASE = "http://localhost:5230/api/books";

// Fetch all books using a large page size (so we effectively get everything)
export const getBooks = async () => {
    const response = await fetch(`${API_BASE}?pageNumber=1&pageSize=9999`);
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    // The backend might return { totalItems, paginatedBooks }
    // so let's extract the array if that's the case:
    const data = await response.json();
    // If data has .paginatedBooks, return that array; otherwise assume data is the array
    return data.paginatedBooks || data;
};

export const createBook = async (book: any) => {
    const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error("Failed to create book");
    }
    return await response.json();
};

export const updateBook = async (bookID: number, book: any) => {
    const response = await fetch(`${API_BASE}/${bookID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error("Failed to update book");
    }
    return await response.json();
};

export const deleteBook = async (bookID: number) => {
    const response = await fetch(`${API_BASE}/${bookID}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete book");
    }
};
