import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../core/models/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-grid',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './character-grid.component.html',
  styles: ``
})
export class CharacterGridComponent {
  @Input() characters: Character[] = [];
  @Input() favoriteIds: number[] = [];
  @Input() isFavoritesView: boolean = false;

  @Input() showPagination: boolean = true;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<Character>();

  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageChange.emit(newPage);
    }
  }

  handleToggleFavorite(character: Character): void {
    this.toggleFavorite.emit(character);
  }

}
