import { createReducer, on } from '@ngrx/store';
import { moviesAction } from './movie.action';

export interface MoviesState {
    data: ReadonlyArray<string>;
    status: string;
}

const initialState: MoviesState = {
    data: [],
    status: 'loading',
};

export const moviewsReducer = createReducer(
    initialState,
    on(
        moviesAction.moviesLoadedSuccess,
        (state, { movies }) => ({ ...state, data: movies, status: 'success' })
    ),
    on(
        moviesAction.moviesLoadedError,
        (state, { error }) => ({ ...state, status: 'error', error })
    )
)
