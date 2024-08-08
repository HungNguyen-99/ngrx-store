import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const moviesAction = createActionGroup({
  source: 'Moviews API',
  events: {
    'Retrieved Movie List': emptyProps(),
    'Movies Loaded Success': props<{ movies: ReadonlyArray<string> }>(),
    'Movies Loaded Error': props<{ error: string }>(),
  },
});