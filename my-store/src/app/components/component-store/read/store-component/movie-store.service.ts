import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
export type Movie = {
  id: string;
  name: string;
};

export interface MoviesState {
  movies: Movie[];
  userPreferredMoviesIds: string[];
  userPreferredMovies?: Movie[];
}

const initialState: MoviesState = {
  movies: [
    {
      id: '1',
      name: 'Movie 1',
    },
    {
      id: '2',
      name: 'Movie 2',
    },
    {
      id: '3',
      name: 'Movie 3',
    },
    {
      id: '4',
      name: 'Movie 4',
    },
  ],
  userPreferredMoviesIds: ['1', '2'],
};

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  constructor() {
    super(initialState);
  }

  readonly movies$: Observable<Movie[]> = this.select((s) => s.movies);
  readonly userPreferredMoviesIds$: Observable<string[]> = this.select(
    (s) => s.userPreferredMoviesIds
  );

  readonly userPreferredMovies$: Observable<Movie[]> = this.select(
    this.movies$,
    this.userPreferredMoviesIds$,
    (movies, ids) => movies.filter((movies) => ids.includes(movies.id))
  );

  readonly vm$ = this.select({
    movies: this.movies$,
    userPreferredMoviesIds: this.userPreferredMoviesIds$,
    userPreferredMovies: this.userPreferredMovies$,
  });
}
