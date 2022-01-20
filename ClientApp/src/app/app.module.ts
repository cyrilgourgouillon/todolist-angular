import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home-view/home.component';
import { ItemComponent } from './home-view/item/item.component';
import { ItemsTableComponent } from './home-view/items-table/items-table.component';

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot([
			{ path: '', component: HomeComponent, pathMatch: 'full' },
		])
	],
	declarations: [
		AppComponent,
		HomeComponent,
		ItemComponent,
		ItemsTableComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
