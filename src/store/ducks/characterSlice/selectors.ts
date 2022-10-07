import { RootState } from 'store';
import { createSelector } from '@reduxjs/toolkit';

export const getCharacters = (state: RootState) => state.characters.characters;
export const loadingCharacters = (state: RootState) => state.characters.loadingCharacters;
export const pagesCharacters = (state: RootState) => state.characters?.characters?.info?.pages;
export const getCharacterById = (id: number) =>
  createSelector(getCharacters, (state) => state.results.find((item) => item.id === id));
