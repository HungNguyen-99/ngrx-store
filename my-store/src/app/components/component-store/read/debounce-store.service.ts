import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatMap, Observable, of, tap } from 'rxjs';


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
    super({ movies: [], moviesPerPage: 5, currentPageIndex: 0, length: 0 });
    this.fetchLength();
    this.fetchNovies(this.fetchMoviesData$);
  }

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
  readonly updateLength = this.updater(
    (state, length: number) => ({
      ...state,
      length
    })
  );

  readonly moviesPerPage$ = this.select((state) => state.moviesPerPage);
  readonly currentPageIndex$ = this.select((state) => state.currentPageIndex);
  readonly moviesDebounced$ = this.select((state) => state.movies);
  readonly length$ = this.select((state) => state.length);

  readonly vm$ = this.select({
    movies: this.moviesDebounced$,
    moviesPerPage: this.moviesPerPage$,
    currentPageIndex: this.currentPageIndex$,
    length: this.length$
  });

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

  readonly fetchLength = this.effect(
    (): Observable<number> => {
        return this.movieService.getLegnth().pipe(
            tap((length) => this.updateLength(length))
        )
    }
  );
}

//===========================================SERVICE==========================================

export interface MovieFakeData {
  id: number;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: MovieFakeData[] = [
    { id: 1, title: 'Movie 1', description: 'Description 1' },
    { id: 2, title: 'Movie 2', description: 'Description 2' },
    { id: 3, title: 'Movie 3', description: 'Description 3' },
    { id: 11, title: 'Movie 11', description: 'Description 11' },
    { id: 22, title: 'Movie 22', description: 'Description 22' },
    { id: 33, title: 'Movie 33', description: 'Description 33' },
    { id: 111, title: 'Movie 111', description: 'Description 111' },
    { id: 222, title: 'Movie 222', description: 'Description 222' },
    { id: 333, title: 'Movie 333', description: 'Description 333' },
  ];

  loadMovies(
    moviesPerPage: number,
    currentPageIndex: number
  ): Observable<MovieFakeData[]> {
    const startIndex = currentPageIndex * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = this.movies.slice(startIndex, endIndex);

    return of(paginatedMovies);
  }

  getLegnth(): Observable<number> {
    return of(this.movies.length);
  }
}
