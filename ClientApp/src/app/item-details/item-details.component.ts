import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
	@Input() item?: Item;

	constructor(
		private route: ActivatedRoute,
		private itemService: ItemService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.route.params.subscribe((routeParam) => {
			this.getItem(routeParam.id);
		});
	}

	goBack(): void {
		this.location.back();
	}

	getItem(id: Item['id']) {
		this.itemService.getItem(id).subscribe(item => this.item = item);
	}

}
