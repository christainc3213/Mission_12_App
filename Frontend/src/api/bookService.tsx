export const getBooks = async (pageNumber: number = 1, pageSize: number = 5, sortBy: string = "title", ascending: boolean = true) => {
    try {
        const response = await fetch(`http://localhost:5230/api/books?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&ascending=${ascending}`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};
