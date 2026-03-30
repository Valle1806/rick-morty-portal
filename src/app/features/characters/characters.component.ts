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
  styles: ``
})
export class CharactersComponent {
  private platformId = inject(PLATFORM_ID); 
  public facade = inject(CharactersFacade);
  private router = inject(Router);
  
  public currentPage = 1;
  
  @Input() set page(value: string) {
    const pageNumber = parseInt(value, 10);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      this.currentPage = pageNumber;
      this.facade.loadCharacters(this.currentPage);
    } else {
      this.router.navigate(['/characters'], { queryParams: { page: 1 } });
    }    
  }

  handlePageChange(page: number): void {
    this.router.navigate([], { queryParams: { page }, queryParamsHandling: 'merge' });
    if(isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
