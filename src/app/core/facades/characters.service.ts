import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CharacterRepository } from '../repositories/character.repository';
import { Character } from '../models/character.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  share,
  shareReplay,
} from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacade {
  private repository = inject(CharacterRepository);
  private platformId = inject(PLATFORM_ID);

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalPagesSubject = new BehaviorSubject<number>(1);
  private favoritesSubject = new BehaviorSubject<Character[]>([]);

  public characters$ = this.charactersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable();
  public favorites$ = this.favoritesSubject.asObservable();

  loadCharacters(page: number): void {
    this.loadingSubject.next(true);
    this.repository
      .getCharacters(page)
      .pipe(
        debounceTime(300), // Espera 300ms antes de disparar (evita clics locos)
        distinctUntilChanged(), // Solo si la página realmente cambió
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

  loadFavorites() {
    if (!isPlatformBrowser(this.platformId)) return;

    const ids = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (ids.length === 0) {
      this.favoritesSubject.next([]);
      return;
    }

    this.loadingSubject.next(true);
    this.repository.getMultipleCharacters(ids).subscribe({
      next: (chars) => {
        this.favoritesSubject.next(chars);
        this.loadingSubject.next(false);
      },
      error: () => this.loadingSubject.next(false),
    });
  }

  toggleFavorite(id: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );
    const index = favorites.indexOf(id);

    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      const currentFavs = this.favoritesSubject.getValue();
      this.favoritesSubject.next(currentFavs.filter((c) => c.id !== id));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  isFavorite(id: number): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );
    return favorites.includes(id);
  }
}
