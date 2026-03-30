import { inject, Injectable } from '@angular/core';
import { CharacterRepository } from '../repositories/character.repository';
import { Character } from '../models/character.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  switchMap,
  of,
  shareReplay,
  tap,
  catchError,
  Subject,
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

  private pageRequest$ = new Subject<number>();

  // Estados locales (Loading y paginación)
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalPagesSubject = new BehaviorSubject<number>(1);

  public characters$ = this.charactersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable();

  // Obtenemos los IDs directamente del Store
  public favoriteIds$ = this.store.select(FavSelectors.selectFavoriteIds);

  /**
   * Genera los objetos completos de personajes favoritos cruzando los IDs 
   * persistidos en la Store con la información en tiempo real de la API.
   * * OPTIMIZACIÓN DE ARQUITECTURA: 
   * En lugar de persistir el objeto JSON completo (que puede quedar desactualizado), se almacenan únicamente los IDs. Al navegar a favoritos, se utiliza 
   * el endpoint multiobjeto de la API (/character/[1,2,3]) para obtener datos frescos, 
   * garantizando la consistencia del estado (Status, Location, etc.) con la fuente oficial.
   */
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

  constructor() {
    this.pageRequest$
      .pipe(
        distinctUntilChanged(), // Evita recargar si es la misma página
        debounceTime(300), // anti-click spam
        tap(() => this.loadingSubject.next(true)),
        switchMap((page) =>
          this.repository.getCharacters(page).pipe(
            catchError((err) => {
              console.error('Error loading characters:', err);
              return of({ results: [], info: { pages: 1 } });
            }),
            finalize(() => this.loadingSubject.next(false)),
          ),
        ),
      )
      .subscribe((response) => {
        if (response && response.results) {
          this.charactersSubject.next(response.results);
          this.totalPagesSubject.next(response.info.pages);
        }
      });
  }
  loadCharacters(page: number): void {
    this.pageRequest$.next(page);
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
