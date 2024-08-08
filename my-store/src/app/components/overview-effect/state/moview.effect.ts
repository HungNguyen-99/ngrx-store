import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesService } from '../movies.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { moviesAction } from './movie.action';

@Injectable()
export class MoviesEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesAction.retrievedMovieList),
      exhaustMap(() =>
        this.moviesService.getAll().pipe(
          tap((movies) => console.log(movies)),
          map((movies) => ({
            type: '[Movies API] Movies Loaded Success',
            payload: movies,
          })),
          catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
