import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemComponent } from './sidebar/item/item.component';
import { ItemsTableComponent } from './sidebar/items-table/items-table.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleComponent } from './tools/title.component';
import { SeparatorComponent } from './tools/separator.component';
import { FavoriteButtonComponent } from './tools/favorite-button/favorite-button.component';
import { DeleteButtonComponent } from './tools/delete-button/delete-button.component';

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot([
			{ path: 'item/:id', component: ItemDetailsComponent },
		]),
		FontAwesomeModule
	],
	declarations: [
		AppComponent,
		SidebarComponent,
		ItemComponent,
		ItemsTableComponent,
		ItemDetailsComponent,
		TitleComponent,
		SeparatorComponent,
		FavoriteButtonComponent,
		DeleteButtonComponent,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
