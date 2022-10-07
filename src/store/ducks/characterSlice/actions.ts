import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCharacters } from 'api';

export const getCharactersThunk = createAsyncThunk(
  'characters/getCharacters',
  async (charactersData: { page: number; name: string; status: string }, thunkApi) => {
    const { page, name, status } = charactersData;
    try {
      const { data } = await getCharacters(page, name, status);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);
