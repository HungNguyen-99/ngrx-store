import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatMap, Observable, of, tap } from 'rxjs';
import {
  MovieFakeData,
  MovieService,
} from '../services/movies-debounce-store.service';

export interface MovieDebounceState {
  movies: MovieFakeData[];
  moviesPerPage: number;
  currentPageIndex: number;
  length: number;
}

@Injectable()
export class DebounceStore extends ComponentStore<MovieDebounceState> {
  private readonly movieService = inject(MovieService);
  constructor() {
    super({ movies: [], moviesPerPage: 5, currentPageIndex: 1, length: 0 });
    this.fetchLength();
    this.fetchNovies(this.fetchMoviesData$);
  }

  readonly moviesPerPage$ = this.select((state) => state.moviesPerPage);
  readonly currentPageIndex$ = this.select((state) => state.currentPageIndex);
  readonly moviesDebounced$ = this.select((state) => state.movies);
  readonly length$ = this.select((state) => state.length);

  readonly vm$ = this.select({
    movies: this.moviesDebounced$,
    moviesPerPage: this.moviesPerPage$,
    currentPageIndex: this.currentPageIndex$,
    length: this.length$,
  });

  readonly updateMoviesPerPage = this.updater(
    (state, moviesPerPage: number) => ({
      ...state,
      moviesPerPage,
    })
  );
  readonly updateCurrentPageIndex = this.updater(
    (state, currentPageIndex: number) => ({
      ...state,
      currentPageIndex,
    })
  );
  readonly updateMovieResults = this.updater(
    (state, movies: MovieFakeData[]) => ({
      ...state,
      movies,
    })
  );
  readonly updateLength = this.updater((state, length: number) => ({
    ...state,
    length,
  }));

  private readonly fetchMoviesData$ = this.select(
    {
      moviesPerPage: this.moviesPerPage$,
      currentPageIndex: this.currentPageIndex$,
    },
    { debounce: true }
  );

  readonly fetchNovies = this.effect(
    (
      moviePageData$: Observable<{
        moviesPerPage: number;
        currentPageIndex: number;
      }>
    ) => {
      return moviePageData$.pipe(
        concatMap(({ moviesPerPage, currentPageIndex }) => {
          return this.movieService
            .loadMovies(moviesPerPage, currentPageIndex)
            .pipe(tap((movies) => this.updateMovieResults(movies)));
        })
      );
    }
  );

  readonly fetchLength = this.effect((): Observable<number> => {
    return this.movieService.getLegnth().pipe(
      tap((length) => {
        const itemsPerPage = 5;
        const totalPages = Math.ceil(length / itemsPerPage);
        this.updateLength(length);
        this.updateLength(totalPages);
      })
    );
  });
}
