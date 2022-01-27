import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../Item';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	private itemApiUrl = 'https://localhost:5001/api/item';
	private subjectItem = new Subject<any>();
	currentItem =  this.subjectItem.asObservable();
	private subjectItems = new Subject<any>();
	currentItems =  this.subjectItem.asObservable();

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(
		private http: HttpClient,
	) {}

	getItems(): Observable<Item[]> {
		return this.http.get<Item[]>(this.itemApiUrl);
	}

	getItem(id: Item['id']): Observable<Item> {
		return this.http.get<Item>(`${this.itemApiUrl}/${id}`);
	}

	addItem(item: Item): Observable<Item> {
		return this.http.post<Item>(this.itemApiUrl, item, this.httpOptions);
	}

	switchCheckboxItem(item: Item): void {
		item.isChecked = !item.isChecked;
		this.updateItem(item);
	}

	updateItem(item: Item): void {
		this.http.put<Item>(`${this.itemApiUrl}/${item.id}`, item, this.httpOptions).subscribe(() => {
			this.subjectItem.next(item);
			this.subjectItems.next();
		});
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
