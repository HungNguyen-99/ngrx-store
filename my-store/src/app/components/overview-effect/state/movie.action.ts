import { createActionGroup, props } from '@ngrx/store';

export const moviesAction = createActionGroup({
  source: 'Moviews API',
  events: {
    'Retrieved Movie List': props<{ movies: ReadonlyArray<string> }>(),
  },
});
