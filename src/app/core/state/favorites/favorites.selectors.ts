import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';


export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');


export const selectFavoriteIds = createSelector(
  selectFavoritesState,
  (state) => state.ids || []
);


export const selectIsFavorite = (id: number) => createSelector(
  selectFavoriteIds,
  (ids) => ids.includes(id)
);

export const selectFavoritesCount = createSelector(
  selectFavoriteIds,
  (ids) => ids.length
);