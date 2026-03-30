import { inject, Injectable } from '@angular/core';
import { CharacterRepository } from '../repositories/character.repository';
import { Character } from '../models/character.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, finalize, Observable, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersFacade {

  private repository = inject(CharacterRepository);

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalPagesSubject = new BehaviorSubject<number>(1);

  public characters$ = this.charactersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public totalPages$ = this.totalPagesSubject.asObservable();

  loadCharacters(page: number): void {
    this.loadingSubject.next(true); 
    this.repository.getCharacters(page).pipe(
      debounceTime(300), // Espera 300ms antes de disparar (evita clics locos)
      distinctUntilChanged(), // Solo si la página realmente cambió
      finalize(() => this.loadingSubject.next(false)) 
    ).subscribe({
      next: (response) => {
        this.charactersSubject.next(response.results);  
        this.totalPagesSubject.next(response.info.pages);
      },
      error: (err) => {
        console.error('Error loading characters:', err);
        this.loadingSubject.next(false);
      }
    });
  }

  getCharacterDetail(id: number): Observable<Character> {
    return this.repository.getCharacterById(id).pipe(
      shareReplay(1)
    );
  }
}
