import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book.model';
import { BooksApiActions } from '../book.action';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (_state, { books }) => [...books])
);
