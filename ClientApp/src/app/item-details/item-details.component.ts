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
	@ViewChild('nameInput', {static: false}) nameInput: ElementRef;

	savingState: 'Saving...' | 'Saved!' | 'Title can\'t be empty...';

	debouncedUpdateContent = debounce(() => {
		this.updateContent();
	}, 1500, {});

	debouncedUpdateName = debounce(() => {
		this.updateName();
	}, 1000, {});

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

	contentKeyUpEvent() {
		this.savingState = 'Saving...';
		this.debouncedUpdateContent();
	}

	nameKeyUpEvent() {
		this.savingState = 'Saving...';
		this.debouncedUpdateName();
	}

	updateContent() {
		this.item.content = this.contentTextArea.nativeElement.value;
		this.itemService.updateItem(this.item).subscribe((updatedItem) => {
			this.item = updatedItem;
			this.savingState = 'Saved!';
		});
	}

	updateName() {
		const nextName = this.nameInput.nativeElement.value;
		if (nextName !== '') {
			this.item.name = nextName;
			this.itemService.updateItem(this.item).subscribe((updatedItem) => {
				this.item = updatedItem;
				this.savingState = 'Saved!';
			});
		} else {
			this.savingState = 'Title can\'t be empty...';
		}
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
