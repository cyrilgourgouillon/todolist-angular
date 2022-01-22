import { Component, Input, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-delete-button',
	template: '<button class="delete-btn"><fa-icon [icon]="faTrash"></fa-icon></button>',
	styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {
	faTrash = faTrash;

	constructor() { }

	ngOnInit() {
	}

}
