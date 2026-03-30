import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterHttpService } from './character-http.service';
import { Character, ApiResponse } from '../models/character.model';

describe('CharacterHttpService', () => {
  let service: CharacterHttpService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://rickandmortyapi.com/api/character';

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'url'
  };

  const mockApiResponse: ApiResponse = {
    info: { count: 1, pages: 1, next: null, prev: null },
    results: [mockCharacter]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterHttpService]
    });
    service = TestBed.inject(CharacterHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch characters by page', () => {
    service.getCharacters(1).subscribe(response => {
      expect(response).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should fetch character by id', () => {
    service.getCharacterById(1).subscribe(char => {
      expect(char).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });

  it('should fetch multiple characters by ids', () => {
    const ids = [1, 2];
    const mockResults = [mockCharacter, { ...mockCharacter, id: 2 }];
    
    service.getMultipleCharacters(ids).subscribe(chars => {
      expect(chars.length).toBe(2);
      expect(chars).toEqual(mockResults);
    });

    const req = httpMock.expectOne(`${apiUrl}/1,2`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should return empty array when no ids provided for multiple characters', (done) => {
    service.getMultipleCharacters([]).subscribe(chars => {
      expect(chars).toEqual([]);
      done();
    });
  });

  it('should handle single object response for multiple characters and wrap in array', () => {
    const ids = [1];
    service.getMultipleCharacters(ids).subscribe(chars => {
      expect(Array.isArray(chars)).toBeTrue();
      expect(chars.length).toBe(1);
      expect(chars[0]).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    req.flush(mockCharacter);
  });
});
