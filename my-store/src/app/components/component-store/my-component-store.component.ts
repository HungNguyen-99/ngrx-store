import { Component } from '@angular/core';
import { ReadComponent } from './read/read.component';

@Component({
  selector: 'my-component-store',
  standalone: true,
  template: `
    <h1>My Component Store</h1>
    <read-component />
  `,
  imports: [ReadComponent],
})
export class MyComponentStoreComponent {}
