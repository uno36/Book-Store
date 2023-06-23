import axios from 'axios';
import {
  addBook,
  getBooks,
  deleteBook,
} from './books/booksSlice';

const API = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/cA7Cf2g9Qk0jCIg46zd1';

const apiMiddleware = () => (next) => (action) => {
  if (action.type === addBook.pending.type) {
    axios.post(`${API}/books`, action.payload)
      .then((response) => {
        const book = response.data;
        next(addBook.fulfilled(book));
      })
      .catch((error) => {
        next(addBook.rejected(error.message));
      });
  } else if (action.type === getBooks.pending.type) {
    axios.get(`${API}/books`)
      .then((response) => {
        const books = Object.entries(response.data).map((item) => ({
          ...item[1][0],
          item_id: item[0],
        }));
        next(getBooks.fulfilled(books));
      })
      .catch((error) => {
        next(getBooks.rejected(error.message));
      });
  } else if (action.type === deleteBook.pending.type) {
    axios.delete(`${API}/books/${action.payload}`)
      .then(() => {
        next(deleteBook.fulfilled(action.payload));
      })
      .catch((error) => {
        next(deleteBook.rejected(error.message));
      });
  } else {
    next(action);
  }
};

export default apiMiddleware;
