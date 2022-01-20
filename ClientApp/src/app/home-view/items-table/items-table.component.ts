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

	sortByChecked() {
		this.items.sort(this.compareByCheck);
	}

	private compareByCheck(a, b): number {
		if (a.isChecked && !b.isChecked) {
			return 1;
		}
		if (!a.isChecked && b.isChecked) {
			return -1;
		}
		if (a.isChecked && b.isChecked) {
			return 0;
		}
	}

	sortByName() {
		this.items.sort(this.compareByName);
	}

	private compareByName(a, b) {
		if (a.name > b.name) {
			return 1;
		}
		if (a.name < b.name) {
			return -1;
		}
		if (a.name = b.name) {
			return 0;
		}
	}

	deleteItem(item: Item): void {
		this.itemService.deleteItem(item).subscribe(() => {
			this.items.splice(this.items.indexOf(item) , 1);
		});
	}

	changeCheckboxItem(item: Item): void {
		item.isChecked = !item.isChecked;
		this.itemService.changeCheckboxItem(item).subscribe(updatedItem => {
			this.items[this.items.indexOf(item)] = updatedItem;
		});
	}

}
