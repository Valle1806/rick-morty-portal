import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';


export interface FavoritesState {
  ids: number[];
}

export const initialState: FavoritesState = {
  ids: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.toggleFavorite, (state, { id }) => {
    const exists = state.ids.includes(id);
    return {
      ...state,
      ids: exists 
        ? state.ids.filter(itemId => itemId !== id) 
        : [...state.ids, id]
    };
  })
);