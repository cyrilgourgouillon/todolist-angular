import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/Item';

@Component({
	selector: 'app-favorite-button',
	template: '<input type="checkbox" [checked]="this.item.isChecked"/>',
	styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {
	@Input() item: Item;

	constructor() { }

	ngOnInit() {
	}

}
