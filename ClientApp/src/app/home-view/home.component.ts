import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../Item';
import { ItemService } from '../service/item.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	formGroup: FormGroup;
	items: Item[];

  faPlus = faPlus;

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
	) {
		this.formGroup = this.formBuilder.group({
			name: '',
		});
	}

	ngOnInit(): void {
		this.getItems();
	}

	onSubmit(formData: FormGroup): FormGroup {
		const name = formData['name'];
		if (!name) { return; }
		this.itemService.addItem({id: this.itemService.getNextAvailableIdFrom(this.items), name: name, isChecked: false})
			.subscribe(item => this.items.push(item));

		this.formGroup = this.formBuilder.group({
			name: '',
		});
	}

	getItems(): void {
		this.itemService.getItems().subscribe(items => this.items = items);
	}
}
