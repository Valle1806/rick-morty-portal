import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CharactersFacade } from './characters.service';
import { CharacterRepository } from '../repositories/character.repository';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { Character, ApiResponse } from '../models/character.model';
import * as FavActions from '../state/favorites/favorites.actions';
import * as FavSelectors from '../state/favorites/favorites.selectors';

describe('CharactersFacade', () => {
  let facade: CharactersFacade;
  let repositorySpy: jasmine.SpyObj<CharacterRepository>;
  let store: MockStore;

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
    const spy = jasmine.createSpyObj('CharacterRepository', ['getCharacters', 'getCharacterById', 'getMultipleCharacters']);

    TestBed.configureTestingModule({
      providers: [
        CharactersFacade,
        { provide: CharacterRepository, useValue: spy },
        provideMockStore({
          selectors: [
            { selector: FavSelectors.selectFavoriteIds, value: [] }
          ]
        })
      ]
    });

    facade = TestBed.inject(CharactersFacade);
    repositorySpy = TestBed.inject(CharacterRepository) as jasmine.SpyObj<CharacterRepository>;
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should load characters and update state', fakeAsync(() => {
    repositorySpy.getCharacters.and.returnValue(of(mockApiResponse));

    facade.loadCharacters(1);
    tick(300);

    facade.characters$.subscribe(chars => {
      expect(chars.length).toBe(1);
      expect(chars[0]).toEqual(mockCharacter);
    });

    facade.totalPages$.subscribe(pages => {
      expect(pages).toBe(1);
    });

    expect(repositorySpy.getCharacters).toHaveBeenCalledWith(1);
  }));

  it('should handle error when loading characters', fakeAsync(() => {
    repositorySpy.getCharacters.and.returnValue(throwError(() => new Error('API Error')));

    facade.loadCharacters(1);
    tick(300);

    facade.characters$.subscribe(chars => {
      expect(chars.length).toBe(0);
    });

    facade.loading$.subscribe(loading => {
      expect(loading).toBeFalse();
    });
  }));

  it('should get character detail', (done) => {
    repositorySpy.getCharacterById.and.returnValue(of(mockCharacter));

    facade.getCharacterDetail(1).subscribe(char => {
      expect(char).toEqual(mockCharacter);
      expect(repositorySpy.getCharacterById).toHaveBeenCalledWith(1);
      done();
    });
  });

  it('should dispatch toggleFavorite action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    facade.toggleFavorite(1);
    expect(dispatchSpy).toHaveBeenCalledWith(FavActions.toggleFavorite({ id: 1 }));
  });

  it('should return favorite status from store', (done) => {
    store.overrideSelector(FavSelectors.selectFavoriteIds, [1]);
    store.refreshState();
    
    facade.isFavorite(1).subscribe(isFav => {
      expect(isFav).toBeTrue();
      done();
    });
  });

  it('should load favorites and cross-reference with API', fakeAsync(() => {
    store.overrideSelector(FavSelectors.selectFavoriteIds, [1]);
    repositorySpy.getMultipleCharacters.and.returnValue(of([mockCharacter]));

    facade.favorites$.subscribe(favs => {
      expect(favs.length).toBe(1);
      expect(favs[0]).toEqual(mockCharacter);
    });

    tick();
    expect(repositorySpy.getMultipleCharacters).toHaveBeenCalledWith([1]);
  }));
});
