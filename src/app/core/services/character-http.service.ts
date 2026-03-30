import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Character } from '../models/character.model';
import { CharacterRepository } from '../repositories/character.repository';

@Injectable()
export class CharacterHttpService extends CharacterRepository {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  getCharacters(page: number = 1) {
    return this.http.get<ApiResponse>(`${this.API_URL}?page=${page}`);
  }

  getCharacterById(id: number) {
    return this.http.get<Character>(`${this.API_URL}/${id}`);
  }
}
