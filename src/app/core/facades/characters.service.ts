import { inject, Injectable } from '@angular/core';
import { CharacterRepository } from '../repositories/character.repository';
import { Character } from '../models/character.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  map,
  switchMap,
  of,
  shareReplay,
  tap,
  catchError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import * as FavActions from '../state/favorites/favorites.actions';
import * as FavSelectors from '../state/favorites/favorites.selectors';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacade {
  private repository = inject(CharacterRepository);
  private store = inject(Store);

  // Estados locales (Loading y paginación se quedan aquí por ahora, es más ágil)
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalPagesSubject = new BehaviorSubject<number>(1);

  public characters$ = this.charactersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable();

  // Obtenemos los IDs directamente del Store
  public favoriteIds$ = this.store.select(FavSelectors.selectFavoriteIds);

  // Generamos los objetos completos de favoritos cruzando los IDs del Store con la API
  public favorites$ = this.favoriteIds$.pipe(
    tap(() => this.loadingSubject.next(true)),

    switchMap((ids) => {
      if (ids.length === 0) {
        return of([]);
      }
      return this.repository.getMultipleCharacters(ids).pipe(
        catchError((err) => {
          console.error('Error cargando favoritos:', err);
          this.loadingSubject.next(false);
          return of([]);
        }),
      );
    }),
    tap(() => this.loadingSubject.next(false)),
    shareReplay(1),
  );

  loadCharacters(page: number): void {
    this.loadingSubject.next(true);
    this.repository
      .getCharacters(page)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe({
        next: (response) => {
          this.charactersSubject.next(response.results);
          this.totalPagesSubject.next(response.info.pages);
        },
        error: (err) => {
          console.error('Error loading characters:', err);
          this.loadingSubject.next(false);
        },
      });
  }

  getCharacterDetail(id: number | string): Observable<Character> {
    return this.repository.getCharacterById(id).pipe(shareReplay(1));
  }

  toggleFavorite(id: number): void {
    this.store.dispatch(FavActions.toggleFavorite({ id }));
  }

  isFavorite(id: number): Observable<boolean> {
    return this.store.select(FavSelectors.selectIsFavorite(id));
  }
}
