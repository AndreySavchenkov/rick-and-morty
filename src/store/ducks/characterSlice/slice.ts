import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCharactersThunk } from "./actions"

type InitialStateType = {
  characters: {
    info: {
      count: number,
      pages: number,
      next: string,
      prev: null
    },
    results:
    {
      id: number,
      name: string,
      status: string,
      species: string,
      type: string,
      gender: string,
      origin: {
        name: string,
        url: string
      },
      location: {
        name: string,
        url: string
      },
      image: string,
      episode: string[],
      url: string,
      created: string
    }[],
  }, loadingCharacters: boolean;
};

const characterSlice = createSlice({
  name: 'character',
  initialState: { characters: {}, loadingCharacters: true } as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharactersThunk.pending, (state) => {
      state.loadingCharacters = true
    })
    builder.addCase(getCharactersThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.characters = action.payload
      state.loadingCharacters = false
    })
    builder.addCase(getCharactersThunk.rejected, (state) => {
      state.loadingCharacters = false
    })
  },
});

export default characterSlice.reducer
