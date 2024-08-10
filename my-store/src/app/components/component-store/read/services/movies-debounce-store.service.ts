import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MovieFakeData {
  id: number;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movies: MovieFakeData[] = [
    { id: 1, title: 'Movie 1', description: 'Description 1' },
    { id: 2, title: 'Movie 2', description: 'Description 2' },
    { id: 3, title: 'Movie 3', description: 'Description 3' },
    { id: 11, title: 'Movie 11', description: 'Description 11' },
    { id: 22, title: 'Movie 22', description: 'Description 22' },
    { id: 33, title: 'Movie 33', description: 'Description 33' },
    { id: 111, title: 'Movie 111', description: 'Description 111' },
    { id: 222, title: 'Movie 222', description: 'Description 222' },
    { id: 333, title: 'Movie 333', description: 'Description 333' },
    { id: 15555, title: 'Movie 1', description: 'Description 1' },
    { id: 25555, title: 'Movie 2', description: 'Description 2' },
    { id: 35555, title: 'Movie 3', description: 'Description 3' },
    { id: 115555, title: 'Movie 11', description: 'Description 11' },
    { id: 225555, title: 'Movie 22', description: 'Description 22' },
    { id: 335555, title: 'Movie 33', description: 'Description 33' },
    { id: 1115555, title: 'Movie 111', description: 'Description 111' },
    { id: 2225555, title: 'Movie 222', description: 'Description 222' },
    { id: 3335555, title: 'Movie 333', description: 'Description 333' },
  ];

  loadMovies(
    moviesPerPage: number,
    currentPageIndex: number
  ): Observable<MovieFakeData[]> {
    const startIndex = currentPageIndex * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = this.movies.slice(startIndex, endIndex);

    return of(paginatedMovies);
  }

  getLegnth(): Observable<number> {
    return of(this.movies.length);
  }
}
