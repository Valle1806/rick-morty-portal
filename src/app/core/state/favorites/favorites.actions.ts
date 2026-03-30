import { createAction, props } from '@ngrx/store';

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorite',
  props<{ id: number }>()
);