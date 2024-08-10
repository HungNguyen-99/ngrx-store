import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DebounceStore } from './store-component/debounce-store.service';

@Component({
  selector: 'debounce-store',
  template: `
    <h2>Debounce Store</h2>
    @if (debounceStore.vm$ | async; as vm) { @for (item of vm.movies; track
    $index) {
    <li>{{ item.title }}</li>
    }
    <br />
    @for (item of [].constructor(vm.length); track $index) {
    <a
      (click)="debounceStore.updateCurrentPageIndex($index)"
      [style.cursor]="'pointer'"
      >{{ $index + 1 }}</a
    >&nbsp; } }
  `,
  standalone: true,
  imports: [AsyncPipe],
  providers: [DebounceStore],
})
export class DebounceStoreComponent {
  readonly debounceStore = inject(DebounceStore);
}
