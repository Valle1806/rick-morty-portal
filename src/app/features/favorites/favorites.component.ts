import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterGridComponent } from '../../shared/components/character-grid/character-grid.component';
import { RouterModule } from '@angular/router';
import { CharactersFacade } from '../../core/facades/characters.service';
import { Character } from '../../core/models/character.model';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, CharacterGridComponent, RouterModule],
  templateUrl: './favorites.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  public facade = inject(CharactersFacade);


  handleToggle(char: Character) {
    this.facade.toggleFavorite(char.id);
  }
}
