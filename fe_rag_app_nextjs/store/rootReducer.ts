import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import documentsReducer from './slices/documentsSlice';

const rootReducer = combineReducers({
  chat: chatReducer,
  documents: documentsReducer,
});

export default rootReducer;
