import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
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
  ],
};
