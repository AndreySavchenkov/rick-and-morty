import { RootState } from 'store';

export const charactersSelectors = {
  characters: (state: RootState) => state.characters.characters,
  loadingCharacters: (state: RootState) => state.characters.loadingCharacters,
  pagesCharacters: (state: RootState) => state.characters?.characters?.info?.pages,
};
