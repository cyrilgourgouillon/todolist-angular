import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/Item';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'app-item',
	templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
	@Input() item: Item;
	@Output() deleteItemEvent = new EventEmitter<Item>();
	@Output() changeCheckboxItemEvent = new EventEmitter<Item>();

	faTrash = faTrash;

	constructor() { }

	ngOnInit() {
	}

	changeCheckboxItem(item: Item) {
		this.changeCheckboxItemEvent.emit(item);
	}

	deleteItem(item: Item) {
		this.deleteItemEvent.emit(item);
	}

}
