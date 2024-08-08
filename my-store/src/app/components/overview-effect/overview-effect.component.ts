import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { moviesAction } from './state/movie.action';
import { selectDataMovies } from './state/movies.selector';

@Component({
  selector: 'app-overview-effect',
  template: ` 
    @for (item of movies$ | async; track $index) {
      <p>{{ item }}</p>
    }
  `,
  standalone: true,
  imports: [AsyncPipe]
})
export class OverviewEffectComponent {
  private store = inject(Store);

  movies$ = this.store.select(selectDataMovies);

  ngOnInit(): void {
    this.store.dispatch(moviesAction.retrievedMovieList());
  }
}
