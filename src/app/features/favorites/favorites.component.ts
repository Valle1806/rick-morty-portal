import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
export class FavoritesComponent implements OnInit {
  public facade = inject(CharactersFacade);

  ngOnInit(): void {
    this.facade.loadFavorites();
  }

  handleToggle(char: Character) {
    this.facade.toggleFavorite(char.id);
  }
}
