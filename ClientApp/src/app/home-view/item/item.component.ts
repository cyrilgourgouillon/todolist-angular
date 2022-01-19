import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/Item';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
	@Input() item: Item;
	@Output() deleteItemEvent = new EventEmitter<Item>();

	constructor() { }

	ngOnInit() {
	}

	deleteItem(item: Item) {
		this.deleteItemEvent.emit(item);
	}

}
