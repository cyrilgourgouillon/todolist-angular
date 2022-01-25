import { Item } from '../../Item';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Router, ActivatedRoute } from '@angular/router';

enum sortType {
	UNSORTED,
	ASCENDING,
	DESCENDING,
}

@Component({
	selector: 'app-items-table',
	templateUrl: './items-table.component.html',
	styleUrls: ['./items-table.component.css'],
})
export class ItemsTableComponent implements OnInit, OnChanges {
	@Input() items?: Item[];
	@Output() deleteItemEvent = new EventEmitter<Item>();
	@Output() changeCheckboxItemEvent = new EventEmitter<Item>();

	@ViewChild('sortButton', {static: true}) sortButtonElement: ElementRef;

	private currentSort: sortType;

	constructor() {
	}

	ngOnInit(): void {
		this.currentSort = sortType.UNSORTED;
		this.initSortButton();
	}

	ngOnChanges(): void {
		if (this.items) {
			this.sortByChecked();
		}
	}

	private initSortButton() {
		this.sortButtonElement.nativeElement.value = sortType.UNSORTED + 1;
		this.sortButtonElement.nativeElement.textContent = sortType[0];
	}

	sortByChecked() {
		this.items.sort(this.compareByCheck);
	}

	private compareByCheck(a: Item, b: Item): number {
		if (a.isChecked < b.isChecked) {
			return 1;
		}
		if (a.isChecked > b.isChecked) {
			return -1;
		}
		return 0;
	}

	sortButtonEvent() {
		this.setSort();
		this.applySortByName();
	}

	private setSort() {
		if (this.currentSort === sortType.DESCENDING) {
			this.currentSort = sortType.UNSORTED;
		} else {
			this.currentSort++;
		}

		this.sortButtonElement.nativeElement.value = this.currentSort;
		this.sortButtonElement.nativeElement.textContent = sortType[this.currentSort];
	}

	private applySortByName() {
		if (this.currentSort === sortType.ASCENDING) {
			this.items.sort(this.compareByNameAscending);
		}
		if (this.currentSort === sortType.DESCENDING) {
			this.items.sort(this.compareByNameDescending);
		}
		if (this.currentSort === sortType.UNSORTED) {
			this.items.sort(this.compareByNameNone);
		}

		this.items.sort(this.compareByCheck);
	}

	private compareByNameAscending(a: Item, b: Item): number {
		return (a.name > b.name) ? 1 : -1;
	}

	private compareByNameDescending(a: Item, b: Item): number {
		return (a.name < b.name) ? 1 : -1;
	}

	private compareByNameNone(a: Item, b: Item): number {
		return (a.id > b.id) ? 1 : -1;
	}

	deleteItem(item: Item) {
		this.deleteItemEvent.emit(item);
	}

	changeCheckboxItem(item: Item) {
		this.changeCheckboxItemEvent.emit(item);
	}

}
