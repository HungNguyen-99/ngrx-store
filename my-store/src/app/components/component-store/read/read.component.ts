import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesState, MoviesStore } from './movie-store.service';

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
  `,
  standalone: true,
  imports: [AsyncPipe],
  providers: [MoviesStore],
})
export class ReadComponent {
  private readonly moviesStore = inject(MoviesStore);
  vm$: Observable<MoviesState> = this.moviesStore.vm$;
}
