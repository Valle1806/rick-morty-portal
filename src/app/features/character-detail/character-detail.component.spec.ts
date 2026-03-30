import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailComponent } from './character-detail.component';
import { CharactersFacade } from '../../core/facades/characters.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Character } from '../../core/models/character.model';
import { provideRouter } from '@angular/router';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
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
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharactersFacade', ['getCharacterDetail', 'toggleFavorite', 'isFavorite']);

    await TestBed.configureTestingModule({
      imports: [CharacterDetailComponent],
      providers: [
        { provide: CharactersFacade, useValue: spy },
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    facadeSpy = TestBed.inject(CharactersFacade) as jasmine.SpyObj<CharactersFacade>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load character detail when id is set', () => {
    facadeSpy.getCharacterDetail.and.returnValue(of(mockCharacter));
    component.id = '1';
    expect(facadeSpy.getCharacterDetail).toHaveBeenCalledWith('1');
    component.character$.subscribe(char => {
      expect(char).toEqual(mockCharacter);
    });
  });

  it('should get field value correctly', () => {
    const field = { label: 'Origen', subKey: 'origin' };
    const value = component.getFieldValue(mockCharacter, field);
    expect(value).toBe('Earth');

    const simpleField = { label: 'Especie', key: 'species' };
    const simpleValue = component.getFieldValue(mockCharacter, simpleField);
    expect(simpleValue).toBe('Human');
  });

  it('should toggle favorite', () => {
    component.toggleFavorite(mockCharacter);
    expect(facadeSpy.toggleFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });
});
