import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<string>> {
    return this.http
      .get<{ items: any[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res.items || []),
        map((items) => items.map((book) => book.id))
      );
    return throwError(new Error('Failed to load movies'));
  }
}
