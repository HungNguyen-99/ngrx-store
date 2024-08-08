import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './moview.reduce';

export const selectMovies = createFeatureSelector<MoviesState>('movies');

export const selectDataMovies = createSelector(
  selectMovies,
  (movies) => movies.data
);
