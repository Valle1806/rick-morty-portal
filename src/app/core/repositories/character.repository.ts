import { Observable } from 'rxjs';
import { Character, ApiResponse } from '../models/character.model';

export abstract class CharacterRepository {
    abstract getCharacters(page: number): Observable<ApiResponse>;
    abstract getCharacterById(id: string | number): Observable<Character>;
    abstract getMultipleCharacters(ids: number[]): Observable<Character[]>;
}