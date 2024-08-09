import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-walkthrough',
    pathMatch: 'full',
  },
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
  {
    path: 'my-component-store',
    loadComponent: () =>
      import('./components/component-store/my-component-store.component').then(
        (m) => m.MyComponentStoreComponent
      ),
  },
];
