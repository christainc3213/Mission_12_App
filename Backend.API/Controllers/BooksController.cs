using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DefaultNamespace; // Add this to reference your models and DbContext
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Bookstore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookDBContext _context;

        public BooksController(BookDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(
            int pageNumber = 1, int pageSize = 5, string sortBy = "title", bool ascending = true)
        {
            IQueryable<Book> books = _context.Books;

            books = sortBy.ToLower() switch
            {
                "title" => ascending ? books.OrderBy(b => b.Title) : books.OrderByDescending(b => b.Title),
                "author" => ascending ? books.OrderBy(b => b.Author) : books.OrderByDescending(b => b.Author),
                "price" => ascending ? books.OrderBy(b => b.Price) : books.OrderByDescending(b => b.Price),
                _ => ascending ? books.OrderBy(b => b.Title) : books.OrderByDescending(b => b.Title)
            };

            var paginatedBooks = await books
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(paginatedBooks);
        }
    }
}