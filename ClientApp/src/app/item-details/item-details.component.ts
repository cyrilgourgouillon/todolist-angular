import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
	@Input() item?: Item;
	@ViewChild('contentTextArea', {static: false}) contentTextArea: ElementRef;

	constructor(
		private route: ActivatedRoute,
		private itemService: ItemService,
	) { }

	ngOnInit(): void {
		this.route.params.subscribe((routeParam) => {
			this.getItem(routeParam.id);
		});
	}

	getItem(id: Item['id']) {
		this.itemService.getItem(id).subscribe(item => this.item = item);
	}

	updateContent() {
		console.log(this.contentTextArea.nativeElement.value);
	}

}
