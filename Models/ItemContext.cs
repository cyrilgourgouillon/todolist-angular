using Microsoft.EntityFrameworkCore;

namespace todolist_aspnet_angular.Models
{

	public class ItemContext : DbContext
	{
		public ItemContext (DbContextOptions<ItemContext> options): base(options)
		{

		}
		public DbSet<Item> Items { get; set; }
	}

}