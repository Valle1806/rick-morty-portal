import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { CharactersFacade } from '../../core/facades/characters.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Character } from '../../core/models/character.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let facadeSpy: jasmine.SpyObj<CharactersFacade>;

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
  } as any;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharactersFacade', ['toggleFavorite'], {
      favorites$: of([mockCharacter]),
      loading$: of(false)
    });

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: CharactersFacade, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    facadeSpy = TestBed.inject(CharactersFacade) as jasmine.SpyObj<CharactersFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle toggle favorite', () => {
    component.handleToggle(mockCharacter);
    expect(facadeSpy.toggleFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });
});
