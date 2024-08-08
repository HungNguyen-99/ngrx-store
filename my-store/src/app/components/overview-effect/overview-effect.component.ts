import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesService } from './movies.service';
import { moviesAction } from './state/movie.action';

@Component({
  selector: 'app-overview-effect',
  template: ` <h1>Overview Effect</h1> `,
  standalone: true,
})
export class OverviewEffectComponent {
  private store = inject(Store);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.store.dispatch(moviesAction.retrievedMovieList({ movies: [] }));
  }
}
