using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todolist_aspnet_angular.Models
{
	[Table("Item")]
    public class Item
    {
		[Key]
		[Required]
        public int Id { get; set; }

		[Required]
		[StringLength(50)]
		public string Name { get; set; }

		[Required]
		public bool IsChecked { get; set; }

		public override string ToString() {
       		return string.Format("*********** {0} - {1} - {2}", Id, Name, IsChecked);
    	}
    }
}