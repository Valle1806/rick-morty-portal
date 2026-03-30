import { Character } from './../../core/models/character.model';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CharactersFacade } from '../../core/facades/characters.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent implements OnInit {
  // Inyectamos solo el Facade
  public facade = inject(CharactersFacade);
  
  public character$!: Observable<Character>;
  private _id!: string;

  @Input() set id(value: string) {
    if (value && value !== this._id) {
      this._id = value;
      this.loadCharacter();
    }
  }

  displayFields = [
    { label: 'Especie', key: 'species' },
    { label: 'Género', key: 'gender' },
    { label: 'Origen', subKey: 'origin' },
    { label: 'Ubicación', subKey: 'location' },
    { label: 'Tipo', key: 'type' },
  ];

  ngOnInit(): void {
    if (!this.character$ && this._id) {
      this.loadCharacter();
    }
  }

  private loadCharacter(): void {
    this.character$ = this.facade.getCharacterDetail(this._id);
  }

  getFieldValue(char: any, field: any): string {
    if (field.subKey) {
      return char[field.subKey]?.name || 'N/A';
    }
    return char[field.key] || 'N/A';
  }

  checkIfFavorite(id: number): boolean {
    return this.facade.isFavorite(id);
  }

  toggleFavorite(Character: Character): void {
    this.facade.toggleFavorite(Character.id);
  }
 
}