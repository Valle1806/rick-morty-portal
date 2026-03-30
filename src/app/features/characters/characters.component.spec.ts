import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { CharactersFacade } from '../../core/facades/characters.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let facadeSpy: jasmine.SpyObj<CharactersFacade>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const fSpy = jasmine.createSpyObj('CharactersFacade', ['loadCharacters'], {
      characters$: of([]),
      loading$: of(false),
      totalPages$: of(1)
    });
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CharactersComponent],
      providers: [
        { provide: CharactersFacade, useValue: fSpy },
        { provide: Router, useValue: rSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    facadeSpy = TestBed.inject(CharactersFacade) as jasmine.SpyObj<CharactersFacade>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    fixture.detectChanges();
    expect(facadeSpy.loadCharacters).toHaveBeenCalledWith(1);
  });

  it('should update page and load characters when input page changes', () => {
    fixture.detectChanges();
    component.page = '2';
    expect(component.currentPage).toBe(2);
    expect(facadeSpy.loadCharacters).toHaveBeenCalledWith(2);
  });

  it('should navigate to new page on handlePageChange', () => {
    component.handlePageChange(3);
    expect(routerSpy.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 3 },
      queryParamsHandling: 'merge'
    });
  });
});
