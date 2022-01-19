import { Item } from './../../Item';
import { Component, Input } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';

@Component({
	selector: 'app-items-table',
	templateUrl: './items-table.component.html',
})
export class ItemsTableComponent {
	@Input() items: Item[];

	constructor(
		private itemService: ItemService,
	) {
	}

	deleteItem(item: Item): void {
		this.itemService.deleteItem(item).subscribe(() => {
			this.items.splice(this.items.indexOf(item) , 1);
		});
	}

}
