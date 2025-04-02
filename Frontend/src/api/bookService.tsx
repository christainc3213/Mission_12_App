export const getBooks = async (
    pageNumber: number = 1,
    pageSize: number = 5,
    sortBy: string = "title",
    ascending: boolean = true,
    category: string = ""
) => {
    try {
        const url = new URL("https://bookstore-cc-backend.azurewebsites.net/api/books");
        url.searchParams.append("pageNumber", pageNumber.toString());
        url.searchParams.append("pageSize", pageSize.toString());
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("ascending", ascending.toString());

        if (category) {
            url.searchParams.append("category", category);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        return {
            totalItems: data.totalItems,
            paginatedBooks: data.paginatedBooks,
        };
    } catch (error) {
        console.error("Error fetching books:", error);
        return { totalItems: 0, paginatedBooks: [] };
    }
};


export const getCategories = async () => {
    try {
        const response = await fetch(`http://localhost:5230/api/books/categories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

