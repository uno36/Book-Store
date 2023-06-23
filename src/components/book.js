/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, deleteBook, getBooks } from '../redux/books/booksSlice';
import BookForm from './BookForm';

const Book = ({ onDelete }) => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    if (onDelete && typeof onDelete === 'function') {
      onDelete(id);
    }
  };

  const generateRandomChapter = () => Math.floor(Math.random() * 10) + 1;

  const generateRandomPercentage = () => Math.floor(Math.random() * 101);

  const generateRandomChapterTopic = () => {
    const topics = [
      'Introduction',
      'Methods',
      'Results',
      'Discussion',
      'Conclusion',
      'Appendix',
      'Acknowledgments',
    ];

    const randomIndex = Math.floor(Math.random() * topics.length);
    return topics[randomIndex];
  };

  const renderBooks = () => books.map(({
    item_id, category, title, author,
  }) => {
    const chapter = generateRandomChapter();
    const percentage = generateRandomPercentage();
    const chapterTopic = generateRandomChapterTopic();
    const borderColorPercentage = Math.min(percentage, 100);
    const topBorderColor = `rgba(2, 144, 255, ${borderColorPercentage / 100})`;
    const bottomBorderColor = `rgba(2, 144, 255, ${borderColorPercentage / 100})`;
    const rightBorderColor = `rgba(2, 144, 255, ${borderColorPercentage / 100})`;
    const leftBorderColor = '#f5f6fa';
    return (
      <div className="book-div" key={item_id}>
        <div className="main-book">
          <div>
            <p className="book-category">{category}</p>
            <h3 className="book-title">{title}</h3>
            <p className="book-author">{author}</p>
            <ul className="buttons">
              <li className="btn-items">
                <button type="button">Comments</button>
              </li>
              <li className="btn-items">
                <button type="button" onClick={() => handleDelete(item_id)}>
                  Remove
                </button>
              </li>
              <li className="btn-items">
                <button type="button">Edit</button>
              </li>
            </ul>
          </div>
          <div className="percentage">
            <div
              className="circle"
              style={{
                borderTopColor: topBorderColor,
                borderBottomColor: bottomBorderColor,
                borderRightColor: rightBorderColor,
                borderLeftColor: leftBorderColor,
              }}
            />
            <div className="percentage-div">
              <p className="book-percentage">
                {percentage}
                %
              </p>
              <p className="complete">complete</p>
            </div>
          </div>
          <div className="update">
            <p className="current">CURRENT CHAPTER</p>
            <p className="chapter">
              Chapter:
              {`${chapter}: ${chapterTopic}`}
            </p>
            <button className="update-btn" type="submit">
              UPDATE PROGRESS
            </button>
          </div>
        </div>
      </div>
    );
  });

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
