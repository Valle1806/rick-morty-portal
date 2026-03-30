import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';
import { STORAGE_KEYS } from '../../constants/storage.constants';

export function storageMetaReducer(reducer: ActionReducer<{ favorites: FavoritesState }>): ActionReducer<{ favorites: FavoritesState }> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.FAVORITES_IDS) : null;
      if (storageValue) {
        try {
          const ids = JSON.parse(storageValue);
          // Retornamos el estado inicial pero inyectando los IDs guardados
          return { ...state, favorites: { ids } } as any;
        } catch (e) {
          console.error('Error recuperando favoritos:', e);
        }
      }
    }

    const nextState = reducer(state, action);

    //Si el estado cambió y estamos en el navegador, guardamos
    if (typeof window !== 'undefined' && nextState?.favorites) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES_IDS, JSON.stringify(nextState.favorites.ids));
    }

    return nextState;
  };
}