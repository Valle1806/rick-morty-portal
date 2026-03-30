import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'characters',
    renderMode: RenderMode.Server,
  },
  {
    path: 'characters/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'favorites',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
