import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from './BookForm';

const bookList = [
  {
    category: 'Action',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    chapter: 'Chapter 17',
    percentage: '64%',
  },
  {
    category: 'Science Fiction',
    title: 'Dune',
    author: 'Fran Herbert',
    chapter: 'Chapter 3: A lesson Learned',
    percentage: '8%',
  },
  {
    category: 'Economy',
    title: 'Capital in the Twenty-first Century',
    author: 'Thomas Piketty',
    chapter: 'Introduction',
    percentage: '0%',
  },
];

const Book = ({ onDelete }) => {
  const [books, setBooks] = useState(bookList); // Set initial state to bookList

  const addBook = ({ title, category }) => {
    const foundBook = bookList.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
        && book.category.toLowerCase() === category.toLowerCase(),
    );
    const author = foundBook ? foundBook.author : 'Unknown';
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        id: prevBooks.length + 1,
        title,
        author,
        category,
        chapter: foundBook ? foundBook.chapter : '',
        percentage: foundBook ? foundBook.percentage : '',
      },
    ]);
  };

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  return (
    <div>
      {books.map((book) => (
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
      ))}
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
