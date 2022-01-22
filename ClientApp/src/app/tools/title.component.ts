import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-title',
	template: '<div class="text">{{ text }}</div>',
	styles: ['.text { font-weight: 600; font-size: 20px;}']
})
export class TitleComponent implements OnInit {
	@Input() text: string;

	constructor() { }

	ngOnInit() {
	}

}
