namespace DefaultNamespace
{
    public class Book
    {
        public int BookID { get; set; }  // Primary Key
        public string Title { get; set; } = string.Empty;  // Book title
        public string Author { get; set; } = string.Empty;  // Author's name
        public string Publisher { get; set; } = string.Empty;  // Publisher's name
        public string ISBN { get; set; } = string.Empty;  // ISBN number
        public string Classification { get; set; } = string.Empty;  // Classification of the book
        public string Category { get; set; } = string.Empty;  // Book category
        public int PageCount { get; set; }  // Number of pages
        public decimal Price { get; set; }  // Price of the book
    }
}