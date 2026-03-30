import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { CharactersFacade } from '../../core/facades/characters.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CharacterGridComponent } from '../../shared/components/character-grid/character-grid.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CharacterGridComponent],
  templateUrl: './characters.component.html',
  styles: ``,
})
export class CharactersComponent {
  private platformId = inject(PLATFORM_ID);
  public facade = inject(CharactersFacade);
  private router = inject(Router);
  private _page: number = 1;
  private _isFirstLoad = true; // Tracking interno para evitar bucles de navegación
  public currentPage = 1;
  @Input() set page(value: string) {
    const incomingPage = parseInt(value, 10) || 1;

    if (incomingPage !== this._page) {
      this._page = incomingPage;
      this.currentPage = incomingPage;

      // Si el usuario cambia de página (ya en el browser), cargamos
      if (!this._isFirstLoad) {
        this.facade.loadCharacters(this._page);
      }
    }
  }

  ngOnInit() {
    // LLAMADA CRÍTICA: Solo cargamos si es la primera vez que se monta el componente
    this.facade.loadCharacters(this._page);
    
    this._isFirstLoad = false;
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
