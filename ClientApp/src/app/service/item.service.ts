import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Item';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ItemService {

	private itemApiUrl = 'https://localhost:5001/api/item';
	items: Item[];

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(
		private http: HttpClient,
	) {
		this.getItems().subscribe((items) => {
			this.items = items;
		});
	}

	getItems(): Observable<Item[]> {
		return this.http.get<Item[]>(this.itemApiUrl);
	}

	getItem(id: Item['id']): Observable<Item> {
		return this.http.get<Item>(`${this.itemApiUrl}/${id}`);
	}

	addItem(item: Item): Observable<Item> {
		return this.http.post<Item>(this.itemApiUrl, item, this.httpOptions);
	}

	updateItem(item: Item): Observable<Item> {
		return this.http.put<Item>(`${this.itemApiUrl}/${item.id}`, item, this.httpOptions);
	}

	deleteItem(item: Item): Observable<Item> {
		return this.http.delete<Item>(`${this.itemApiUrl}/${item.id}`, this.httpOptions);
	}

	getNextAvailableIdFrom(items: Item[]): Item['id'] {
		let maxId = 0;
		items.map((e) => {
			if (e.id > maxId) {
				maxId = e.id;
			}
		});
		return maxId + 1;
	}

}
