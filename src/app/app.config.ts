import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CharacterHttpService } from './core/services/character-http.service';
import { CharacterRepository } from './core/repositories/character.repository';
import { provideStore } from '@ngrx/store';
import { favoritesReducer } from './core/state/favorites/favorites.reducer';
import { storageMetaReducer } from './core/state/favorites/favorites.metareducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(
      withEventReplay(),
      // Evita que SSR y el cliente disparen la misma petición HTTP dos veces.
      withHttpTransferCacheOptions({}),
    ),
    provideHttpClient(withFetch()),
     { 
      provide: CharacterRepository, 
      useClass: CharacterHttpService 
    },
    provideStore(
      { favorites: favoritesReducer }, 
      { metaReducers: [storageMetaReducer] } 
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: false,
    }),  
  ],
};
