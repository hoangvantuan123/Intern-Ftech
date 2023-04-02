import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlAPI, urlAPIID } from "./api";
import axios from "axios";

export const fetchMessages = createAsyncThunk("message/fetchMessages", async () => {
  const response = await fetch(`${urlAPI}/messages`);
  const messages = await response.json();
  return messages;
});
export const messageSlices = createSlice({
  name: "message",
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    messageAdded(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchMessages.fulfilled, (state, action) => {
        return action.payload;
      })
     
  },
});
export const { messageAdded } = messageSlices.actions;

export default messageSlices.reducer;
