import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { booksReducer } from './components/walkthrough/state/reduces/book.reduce';
import { collectionReducer } from './components/walkthrough/state/reduces/collection.reducer';

const APP_STORE = {
  books: booksReducer,
  collection: collectionReducer
}

const CONFIG_STORE_DEV_TOOL = {
  maxAge: 25, // Retains last 25 states
  logOnly: !isDevMode(), // Restrict extension to log-only mode
  autoPause: true, // Pauses recording actions and state changes when the extension window is not open
  trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
  traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
  connectInZone: true // If set to true, the connection is established within the Angular zone
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(), provideStore(),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore(APP_STORE),
    provideStoreDevtools(CONFIG_STORE_DEV_TOOL)
]
};
