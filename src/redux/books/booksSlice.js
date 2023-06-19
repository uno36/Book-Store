import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const { title, author } = action.payload;
      const newBook = {
        id: state.books.length + 1,
        title,
        author,
      };
      state.books.push(newBook);
    },
    removeBook: (state, action) => {
      const bookId = action.payload;
      state.books = state.books.filter((book) => book.id !== bookId);
    },
  },
});

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
