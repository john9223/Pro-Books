import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookInfo = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: {
        'Authorization': 'whatever-you-want'
      }
    })
    .then(response => {
      setBooks(response.data.books);
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          setError('Status code: 404 Website not found');
        } else {
          setError('Error fetching data');
        }
      } else if (error.request) {
        setError('No response received');
      } else {
        setError('Error in request setup');
      }
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="books-container">
      <h1>Books Information</h1>
      {books.map(book => (
        <div className="book-info" key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.imageLinks.thumbnail} alt={book.title} />
          <p>{book.description}</p>
          <p>Authors: {book.authors.join(', ')}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookInfo;
