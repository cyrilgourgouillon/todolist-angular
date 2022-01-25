using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using todolist_aspnet_angular.Models;

namespace todolist_angular.Controllers
{
	[Route("api/[controller]")]
	public class ItemController : Controller
	{
		private ItemContext _itemContext;

		public ItemController(ItemContext itemContext)
		{
			_itemContext = itemContext;
		}

		[HttpGet]
		public IEnumerable<Item> Get()
		{
			return _itemContext.Items.ToList();
		}

		[HttpGet("{id}")]
		public Item Get(int id)
		{
			return _itemContext.Items.Where(o => o.Id == id).FirstOrDefault();
		}

		[HttpPost]
		public Item Post([FromBody] Item item)
		{
			_itemContext.Add(item);
			_itemContext.SaveChanges();
			return item;
		}

		[HttpPut("{id}")]
		public Item Put(int id,[FromBody] Item item)
		{
			var itemToPut = _itemContext.Items.Where(o => o.Id == id).FirstOrDefault();
			itemToPut.Name = item.Name;
			itemToPut.IsChecked = item.IsChecked;
			itemToPut.Content = item.Content;
			_itemContext.SaveChanges();
			return itemToPut;
		}

		[HttpDelete("{id}")]
		public int Delete(int id)
		{
			_itemContext.Items.Remove(_itemContext.Items.Where(o => o.Id == id).FirstOrDefault());
			_itemContext.SaveChanges();
			return id;
		}
	}
}
