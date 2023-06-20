import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, removeBook } from '../redux/books/booksSlice';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleAddBook = () => {
    const newBook = {
      id: `item${books.length + 1}`,
      title: 'New Book Title',
      author: 'New Book Author',
      category: 'Fiction',
    };
    dispatch(addBook(newBook));
  };

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  const renderBookList = () => {
    const bookList = [];

    for (let i = 0; i < books.length; i += 1) {
      const book = books[i];
      bookList.push(
        <li key={book.id}>
          {book.title}
          {' '}
          by
          {book.author}
          <button type="button" onClick={() => handleRemoveBook(book.id)}>
            Remove
          </button>
        </li>,
      );
    }

    return bookList;
  };

  return (
    <div>
      <ul>{renderBookList()}</ul>
      <button type="button" onClick={handleAddBook}>.</button>
    </div>
  );
};

export default BookList;
