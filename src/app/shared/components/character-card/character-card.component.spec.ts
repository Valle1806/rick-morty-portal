import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Character } from '../../../core/models/character.model';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

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
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = mockCharacter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleFavorite when favorite button clicked', () => {
    spyOn(component.toggleFavorite, 'emit');
    const event = new Event('click');
    component.onFavoriteClick(event);
    expect(component.toggleFavorite.emit).toHaveBeenCalledWith(mockCharacter);
  });

  it('should handle image error by setting placeholder', () => {
    const event = { target: { src: '' } };
    component.handleImgError(event);
    expect(event.target.src).toBe('images/portal-placeholder.png');
  });
});
