import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook, removeBook } from '../redux/books/booksSlice';
import BookForm from './BookForm';

const Book = ({ onDelete }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (id) => {
    dispatch(removeBook(id));
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  const renderBooks = () => {
    const renderedBooks = [];

    for (let i = 0; i < books.length; i += 1) {
      const book = books[i];
      const bookElement = (
        <div className="book-div" key={book.id}>
          <div className="main-book">
            <div>
              <p className="book-category">{book.category}</p>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <ul className="buttons">
                <li className="btn-items">
                  <button type="button">Comments</button>
                </li>
                <li className="btn-items">
                  <button type="button" onClick={() => handleDelete(book.id)}>
                    Remove
                  </button>
                </li>
                <li className="btn-items">
                  <button type="button">Edit</button>
                </li>
              </ul>
            </div>
            <div className="percentage">
              <div className="circle" />
              <div className="percentage-div">
                <p className="book-percentage">{book.percentage}</p>
                <p className="complete">complete</p>
              </div>
            </div>
            <div className="update">
              <p className="current">CURRENT CHAPTER</p>
              <p className="chapter">{book.chapter}</p>
              <button className="update-btn" type="submit">
                UPDATE PROGRESS
              </button>
            </div>
          </div>
        </div>
      );

      renderedBooks.push(bookElement);
    }

    return renderedBooks;
  };

  return (
    <div>
      {renderBooks()}
      <div className="hr">
        <hr />
      </div>
      <BookForm addBook={(newBook) => dispatch(addBook(newBook))} />
    </div>
  );
};

Book.propTypes = {
  onDelete: PropTypes.func,
};

Book.defaultProps = {
  onDelete: () => {},
};

export default Book;
