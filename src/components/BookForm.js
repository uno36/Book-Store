import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ addBook, removeBookHandler }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');

  const submitBookHandler = (e) => {
    e.preventDefault();

    const newTitle = e.target.title.value;
    const newCategory = e.target.category.value;

    if (newTitle && author && newCategory) {
      const newBook = {
        id: Date.now(),
        title: newTitle,
        author,
        category: newCategory,
      };

      addBook(newBook);
    }

    setTitle('');
    setAuthor('');
    setCategory('');
  };

  return (
    <div className="add-book-div">
      <h1 className="add-book">Add New Book</h1>
      <form onSubmit={submitBookHandler}>
        <div className="form-container">
          <div>
            <label htmlFor="title">
              <input
                type="text"
                id="title"
                placeholder="Book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="author">
              <input
                type="text"
                id="author"
                placeholder="Book author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="category">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Category"> Category</option>
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
  removeBookHandler: PropTypes.func.isRequired,
};

export default BookForm;
