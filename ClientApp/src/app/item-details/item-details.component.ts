import { ItemService } from './../service/item.service';
import { Item } from './../Item';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	) {	}

	ngOnInit(): void {
		this.savingState = 'Saved!';

		this.route.params.subscribe((routeParam) => {
			this.getItem(routeParam.id);
		});

		this.itemService.currentItem.subscribe((item) => {
			if (this.item.id === item.id) {
				this.getItem(this.item.id);
				this.savingState = 'Saved!';
			}
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
		this.itemService.updateItem(this.item);
	}

	updateName() {
		const nextName = this.nameInput.nativeElement.value;
		if (nextName !== '') {
			this.item.name = nextName;
			this.itemService.updateItem(this.item);
		} else {
			this.savingState = 'Title can\'t be empty...';
		}
	}

	deleteItem() {
		this.itemService.deleteItem(this.item).subscribe(() => {
			this.router.navigateByUrl('/');
		});
	}

	changeCheckboxItem() {
		this.itemService.switchCheckboxItem(this.item);
	}

}
