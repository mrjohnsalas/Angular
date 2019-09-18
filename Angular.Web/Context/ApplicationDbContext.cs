using Angular.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular.Web.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}