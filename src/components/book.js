import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from './BookForm';

const Book = ({ onDelete }) => {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  const renderBooks = () => books.map((book) => (
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
  ));

  return (
    <div>
      {renderBooks()}
      <div className="hr">
        <hr />
      </div>
      <BookForm addBook={addBook} />
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
