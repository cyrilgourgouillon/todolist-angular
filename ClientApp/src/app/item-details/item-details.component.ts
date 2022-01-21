import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent implements OnInit {
	@Input() item: Item;

	constructor(
		private route: ActivatedRoute,
		private itemService: ItemService,
		private location: Location
	) { }

	ngOnInit() {
		this.getItem();
	}

	goBack(): void {
		this.location.back();
	}

	getItem() {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.itemService.getItem(id).subscribe(item => this.item = item);
	}

}