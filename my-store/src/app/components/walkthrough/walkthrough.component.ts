import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookCollectionComponent } from './book-collection.component';
import { BookListComponent } from './book-list.component';
import { GoogleBooksService } from './services/books.service';
import { BooksActions, BooksApiActions } from './state/book.action';
import { selectBookCollection, selectBooks } from './state/books.selectors';

@Component({
  selector: 'app-walkthrough',
  template: `
    <h2>Books</h2>
    <app-book-list
      class="book-list"
      [books]="(books$ | async)!"
      (add)="onAdd($event)"
    ></app-book-list>

    <h2>My Collection</h2>
    <app-book-collection
      class="book-collection"
      [books]="(bookCollection$ | async)!"
      (remove)="onRemove($event)"
    >
    </app-book-collection>
  `,
  standalone: true,
  imports: [BookListComponent, BookCollectionComponent, AsyncPipe],
})
export class WalkthroughComponent {
  private store = inject(Store);
  private booksService = inject(GoogleBooksService);

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) => {
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      });
  }
  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}
