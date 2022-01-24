import { ActivatedRoute } from '@angular/router';
import { Item } from '../../Item';
import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';

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

	@ViewChild('sortButton', {static: true}) sortButtonElement: ElementRef;

	private currentSort: sortType;

	constructor(
		private itemService: ItemService,
	) {
		this.currentSort = sortType.UNSORTED;
	}

	ngOnInit(): void {
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

	deleteItem(item: Item): void {
		this.itemService.deleteItem(item).subscribe(() => {
			this.items.splice(this.items.indexOf(item) , 1);
			this.ngOnChanges();
		});
	}

	changeCheckboxItem(item: Item): void {
		item.isChecked = !item.isChecked;
		this.itemService.changeCheckboxItem(item).subscribe(updatedItem => {
			this.items[this.items.indexOf(item)] = updatedItem;
			this.ngOnChanges();
		});
	}

}
