import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMessages: []
}

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.allMessages.push(action.payload)
    },
    fillMessages : (state , action) => {
        const message = action.payload;
      
      state.allMessages = message;
    },
   
  },
  
});

export const { newMessage , fillMessages } = messageSlice.actions;
export default messageSlice.reducer;
