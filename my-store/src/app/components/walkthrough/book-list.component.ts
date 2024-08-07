import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './models/book.model';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="book-item" *ngFor="let book of books">
      <p>{{ book.volumeInfo.title }}</p>
      <span> by {{ book.volumeInfo.authors }}</span>
      <button (click)="add.emit(book.id)" data-test="add-button">
        Add to Collection
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor]
})
export class BookListComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() add = new EventEmitter<string>();
}
