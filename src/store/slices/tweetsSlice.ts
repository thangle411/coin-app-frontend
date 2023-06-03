import { createSlice } from '@reduxjs/toolkit';

const initialState = { tweets: [] } as TweetsState;

const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    update: (state, action) => {
      state.tweets = { ...state.tweets, ...action.payload };
    },
  },
});

export const { update } = tweetsSlice.actions;

export default tweetsSlice.reducer;

export interface Tweet {}

export interface TweetsState {
  tweets: Tweet[];
}

export interface TweetsReducerActionType {
  type: 'UPDATE';
  payload: TweetsState;
}
