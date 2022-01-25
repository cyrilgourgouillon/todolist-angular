import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { debounce } from 'lodash';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
	@Input() item?: Item;
	@ViewChild('contentTextArea', {static: false}) contentTextArea: ElementRef;

	debouncedUpdateContent = debounce(() => this.updateContent(), 1500, {});

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
		console.log('UPDATED');
		this.item.content = this.contentTextArea.nativeElement.value;
		this.itemService.updateItem(this.item).subscribe((updatedItem) => { this.item = updatedItem; });
	}

}
