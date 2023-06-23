import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';

const BookForm = ({ onAddBook }) => {
  const dispatch = useDispatch();

  const submitBookHandler = (e) => {
    e.preventDefault();

    const newTitle = e.target.title.value;
    const newAuthor = e.target.author.value;
    const newCategory = e.target.category.value;

    if (newTitle && newAuthor && newCategory) {
      const newBook = {
        item_id: Date.now().toString(),
        title: newTitle,
        author: newAuthor,
        category: newCategory,
      };

      dispatch(addBook(newBook));
      if (onAddBook && typeof onAddBook === 'function') {
        onAddBook(newBook);
      }
    }

    e.target.reset();
  };
  return (
    <div className="add-book-div">
      <h1 className="add-book">Add New Book</h1>
      <form onSubmit={submitBookHandler}>
        <div className="form-container">
          <div>
            <label htmlFor="title">
              <input type="text" id="title" placeholder="Book title" required />
            </label>
          </div>
          <div>
            <label htmlFor="author">
              <input type="text" id="author" placeholder="Book author" required />
            </label>
          </div>
          <div>
            <label htmlFor="category">
              <select id="category" required>
                <option value="">Category</option>
                <option value="Action">Action</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Economy">Economy</option>
                <option value="Fiction">Fiction</option>
                <option value="NonFiction">Nonfiction</option>
              </select>
            </label>
          </div>
          <div>
            <button className="form-btn" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
BookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
};

export default BookForm;
