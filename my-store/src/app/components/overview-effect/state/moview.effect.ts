import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { MoviesService } from '../movies.service';
import { moviesAction } from './movie.action';

@Injectable({
  providedIn: 'root',
})
export class MoviesEffects {

  private actions$ = inject(Actions);
  private moviesService = inject(MoviesService);


  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesAction.retrievedMovieList),
      exhaustMap(() =>
        this.moviesService.getAll().pipe(
          tap((movies) => console.log('data loaded', movies)),
          map((movies) => movies),
          map((movies) => moviesAction.moviesLoadedSuccess({ movies })),
          catchError((error) =>
            of(moviesAction.moviesLoadedError({ error: error.message }))
          )
        )
      )
    )
  );
}
