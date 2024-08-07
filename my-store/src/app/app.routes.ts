import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'app-walkthrough',
    loadComponent: () =>
      import('./components/walkthrough/walkthrough.component').then(
        (m) => m.WalkthroughComponent
      ),
  },
];
