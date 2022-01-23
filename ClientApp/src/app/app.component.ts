import { Component, OnInit } from '@angular/core';
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
	) {
	}

	ngOnInit(): void {
		this.itemService.getItems().subscribe(items => this.items = items);
	}
}
