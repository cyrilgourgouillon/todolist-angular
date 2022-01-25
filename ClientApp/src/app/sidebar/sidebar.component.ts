import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../Item';
import { ItemService } from '../service/item.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	@Input() items: Item[];
	@Output() deleteItemEvent = new EventEmitter<Item>();
	@Output() changeCheckboxItemEvent = new EventEmitter<Item>();
	@Output() addItemEvent = new EventEmitter<Item>();
	formGroup: FormGroup;

	faPlus = faPlus;

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
	) {
		this.formGroup = this.formBuilder.group({
			name: '',
		});
	}

	addItem(formData: FormGroup): FormGroup {
		const name = formData['name'];
		if (!name) { return; }

		this.formGroup = this.formBuilder.group({
			name: '',
		});
		this.addItemEvent.emit({id: this.itemService.getNextAvailableIdFrom(this.items), name: name, isChecked: false, content: ''});
	}

	deleteItem(item: Item) {
		this.deleteItemEvent.emit(item);
	}

	changeCheckboxItem(item: Item) {
		this.changeCheckboxItemEvent.emit(item);
	}

}
