import { Character } from './../../core/models/character.model';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CharactersFacade } from '../../core/facades/characters.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './character-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent implements OnInit {
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

  toggleFavorite(character: Character): void {
    this.facade.toggleFavorite(character.id);
  }
}
