import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DebounceStoreComponent } from './debounce-store.component';
import { DebounceStore } from './store-component/debounce-store.service';
import { MoviesState, MoviesStore } from './services/movie-store.service';

@Component({
  selector: 'read-component',
  template: `
    @if (vm$ | async; as vm) {
    <h3>Read Component</h3>

    <p>movies</p>
    @for (item of vm.movies; track $index) {
    <li>{{ item.name }}</li>
    }

    <p>userPreferredMoviesIds</p>
    @for(item of vm.userPreferredMoviesIds; track $index) {
    <li>{{ item }}</li>
    }

    <p>userPreferredMoviesIds</p>
    @for(item of vm.userPreferredMovies; track $index) {
    <li>{{ item.name }}</li>
    } }
    <debounce-store />
  `,
  standalone: true,
  imports: [AsyncPipe, DebounceStoreComponent],
  providers: [MoviesStore, DebounceStore],
})
export class ReadComponent {
  private readonly moviesStore = inject(MoviesStore);
  private readonly debounceStore = inject(DebounceStore);
  vm$: Observable<MoviesState> = this.moviesStore.vm$;
}
