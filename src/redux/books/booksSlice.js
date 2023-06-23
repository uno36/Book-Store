import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/cA7Cf2g9Qk0jCIg46zd1';

export const addBook = createAsyncThunk('books/ADD_BOOK', async (book) => {
  try {
    await axios.post(`${API}/books`, book);
    return book;
  } catch (error) {
    throw new Error(error);
  }
});

export const getBooks = createAsyncThunk('books/GET_BOOKS', async () => {
  try {
    const resp = await axios.get(`${API}/books`);
    const books = Object.entries(resp.data).map((item) => ({
      ...item[1][0],
      item_id: item[0],
    }));
    return books;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteBook = createAsyncThunk('books/DELETE_BOOK', async (id) => {
  try {
    await axios.delete(`${API}/books/${id}`);
    return id;
  } catch (error) {
    throw new Error(error);
  }
});

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.books.findIndex((book) => book.item_id === id);
        if (index !== -1) {
          state.books.splice(index, 1);
        }
      })
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default booksSlice.reducer;
