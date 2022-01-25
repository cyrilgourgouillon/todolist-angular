import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { debounce } from 'lodash';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
	item?: Item;
	@ViewChild('contentTextArea', {static: false}) contentTextArea: ElementRef;
	savingState: 'Saving...' | 'Saved!';

	debouncedUpdateContent = debounce(() => {
		this.updateContent();
	}, 1500, {});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private itemService: ItemService,
	) { }

	ngOnInit(): void {
		this.savingState = 'Saved!';
		this.route.params.subscribe((routeParam) => {
			this.getItem(routeParam.id);
		});
	}

	getItem(id: Item['id']) {
		this.itemService.getItem(id).subscribe(item => this.item = item);
	}

	keyUpEvent() {
		this.savingState = 'Saving...';
		this.debouncedUpdateContent();
	}

	updateContent() {
		this.item.content = this.contentTextArea.nativeElement.value;
		this.itemService.updateItem(this.item).subscribe((updatedItem) => {
			this.item = updatedItem;
			this.savingState = 'Saved!';
		});
	}

	deleteItem() {
		this.itemService.deleteItem(this.item).subscribe(() => {
			window.location.replace('/');
		});
	}

	changeCheckboxItem() {
		this.itemService.changeCheckboxItem(this.item).subscribe((item) => this.item = item);
	}

}
