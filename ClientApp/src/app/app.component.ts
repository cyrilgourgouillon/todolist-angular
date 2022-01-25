import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './Item';

import { ItemService } from './service/item.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	items: Item[];
	title = 'ToDoList';

	constructor(
		private itemService: ItemService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.itemService.getItems().subscribe(items => this.items = items);
	}

	addItem(item: Item) {
		this.itemService.addItem(item)
		.subscribe(itemAdded => this.items.push(itemAdded));
		this.router.navigateByUrl(`/item/${item.id}`);
	}

	deleteItem(item: Item): void {
		this.itemService.deleteItem(item).subscribe(() => {
			this.items.splice(this.items.indexOf(item) , 1);
			this.router.navigateByUrl('/');
		});
	}

	changeCheckboxItem(item: Item): void {
		item.isChecked = !item.isChecked;
		this.itemService.updateItem(item).subscribe(updatedItem => {
			this.items[this.items.indexOf(item)] = updatedItem;
		});
	}
}
