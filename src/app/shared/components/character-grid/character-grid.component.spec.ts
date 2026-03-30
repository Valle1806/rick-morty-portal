import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterGridComponent } from './character-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Character } from '../../../core/models/character.model';

describe('CharacterGridComponent', () => {
  let component: CharacterGridComponent;
  let fixture: ComponentFixture<CharacterGridComponent>;

  const mockCharacter: Character = { id: 1, name: 'Rick' } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterGridComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange when onPageChange called with valid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalPages = 10;
    component.onPageChange(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange when onPageChange called with invalid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalPages = 10;
    component.onPageChange(11);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should emit toggleFavorite when handleToggleFavorite called', () => {
    spyOn(component.toggleFavorite, 'emit');
    component.handleToggleFavorite(mockCharacter);
    expect(component.toggleFavorite.emit).toHaveBeenCalledWith(mockCharacter);
  });
});
