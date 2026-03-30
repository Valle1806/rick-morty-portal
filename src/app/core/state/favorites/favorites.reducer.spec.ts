import { favoritesReducer, initialState } from './favorites.reducer';
import * as FavoritesActions from './favorites.actions';

describe('Favorites Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = favoritesReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should add an id to favorites when toggleFavorite is dispatched and id is not present', () => {
    const action = FavoritesActions.toggleFavorite({ id: 1 });
    const state = favoritesReducer(initialState, action);
    expect(state.ids).toContain(1);
    expect(state.ids.length).toBe(1);
  });

  it('should remove an id from favorites when toggleFavorite is dispatched and id is present', () => {
    const startState = { ids: [1, 2] };
    const action = FavoritesActions.toggleFavorite({ id: 1 });
    const state = favoritesReducer(startState, action);
    expect(state.ids).not.toContain(1);
    expect(state.ids).toContain(2);
    expect(state.ids.length).toBe(1);
  });
});
