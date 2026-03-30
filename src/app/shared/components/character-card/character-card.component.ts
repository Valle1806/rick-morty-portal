import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Character } from '../../../core/models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-card.component.html',
  styles: ``
})
export class CharacterCardComponent {
  // Datos del personaje
  @Input({required: true}) character!: Character; 

  @Input() showFavoriteButton: boolean = false; // Controla si se muestra el botón de favorito

  @Input() isFavorite: boolean = false; // Indica si el personaje es favorito (para cambiar el estilo del botón)

  @Output() toggleFavorite = new EventEmitter<Character>(); 

  onFavoriteClick(event: Event) {
    event.preventDefault(); // Evita la navegación al hacer clic en el botón
    event.stopPropagation(); //para que NO se dispare el routerLink del padre
    this.toggleFavorite.emit(this.character);
  }

  handleImgError(event: any) {
    event.target.src = 'images/portal-placeholder.png'; 
    console.warn(`Error cargando imagen de: ${this.character.name}`);
  }
}
