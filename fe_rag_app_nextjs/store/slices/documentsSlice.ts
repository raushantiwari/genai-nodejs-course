import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentsState {
  selectedDocumentIds: string[];
}

const initialState: DocumentsState = {
  selectedDocumentIds: [],
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSelectedDocumentIds: (state, action: PayloadAction<string[]>) => {
      state.selectedDocumentIds = action.payload;
    },

    toggleDocumentId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedDocumentIds.includes(id)) {
        state.selectedDocumentIds = state.selectedDocumentIds.filter((docId) => docId !== id);
      } else {
        state.selectedDocumentIds.push(id);
      }
    },
  },
});

export const { setSelectedDocumentIds, toggleDocumentId } = documentsSlice.actions;

export default documentsSlice.reducer;
