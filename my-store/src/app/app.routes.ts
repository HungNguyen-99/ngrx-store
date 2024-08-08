import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'app-walkthrough',
    loadComponent: () =>
      import('./components/walkthrough/walkthrough.component').then(
        (m) => m.WalkthroughComponent
      ),
  },
  {
    path: 'app-overview-effect',
    loadComponent: () =>
      import('./components/overview-effect/overview-effect.component').then(
        (m) => m.OverviewEffectComponent
      ),
  },
];
