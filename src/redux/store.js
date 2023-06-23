import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/booksSlice';
import apiMiddleware from './cutomMiddleware';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
});

export default store;
