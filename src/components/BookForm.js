import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ addBook }) => {
  const titleRef = useRef();
  const categoryRef = useRef();

  const submitBookHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const category = categoryRef.current.value;

    if (title && category) {
      const newBook = {
        id: Date.now(), // Generate a unique ID for the new book
        title,
        category,
      };

      addBook(newBook);
    }

    titleRef.current.value = '';
    categoryRef.current.value = '';
  };

  return (
    <div className="add-book-div">
      <h1 className="add-book">Add New Book</h1>
      <form onSubmit={submitBookHandler}>
        <div className="form-container">
          <div>
            <label htmlFor="title">
              <input type="text" id="title" placeholder="Book title" ref={titleRef} />
            </label>
          </div>
          <div>
            <label htmlFor="category">
              <select id="category" ref={categoryRef} required>
                <option disabled selected value>Category</option>
                <option value="Action">Action</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Economy">Economy</option>
                <option value="Fiction">Fiction</option>
                <option value="NonFiction">Nonfiction</option>
              </select>
            </label>
          </div>
          <div>
            <button className="form-btn" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  addBook: PropTypes.func.isRequired,
};

export default BookForm;
