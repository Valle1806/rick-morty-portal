import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Character } from '../models/character.model';
import { CharacterRepository } from '../repositories/character.repository';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class CharacterHttpService extends CharacterRepository {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}?page=${page}`);
  }

  getCharacterById(id: string | number): Observable<Character> {
    return this.http.get<Character>(`${this.API_URL}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    if (ids.length === 0) return of([]);

    const idParams = ids.join(',');

    return this.http
      .get<Character | Character[]>(`${this.API_URL}/${idParams}`)
      .pipe(
        map((response) => {
          return Array.isArray(response) ? response : [response];
        }),
      );
  }
}
