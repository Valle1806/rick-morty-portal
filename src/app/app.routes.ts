import { Routes } from '@angular/router';

export const routes: Routes =  [
    {
        path: 'characters',
        loadComponent: () => import('./features/characters/characters.component').then(m => m.CharactersComponent)
    },
    {
        path: 'characters/:id',
        loadComponent: () => import('./features/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
    },
    {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent)
    },
    {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'characters'
    }
];
