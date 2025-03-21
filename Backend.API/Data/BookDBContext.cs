using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace
{
    public class BookDBContext : DbContext
    {
        public BookDBContext(DbContextOptions<BookDBContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Use SQLite as the database provider
            optionsBuilder.UseSqlite("Data Source=Bookstore.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().ToTable("Books");

            modelBuilder.Entity<Book>().HasKey(b => b.BookID);
            modelBuilder.Entity<Book>().Property(b => b.Title).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Author).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Publisher).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.ISBN).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Classification).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Category).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.PageCount).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Price).IsRequired();
        }
    }
}