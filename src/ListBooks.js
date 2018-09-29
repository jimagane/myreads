import React from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Book from './Book';

class ListBooks extends React.Component {



  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.currentlyReading.map((book) => (
                  <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.wantToRead.map((book) => (
                  <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.read.map((book) => (
                  <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  };
}

export default ListBooks;
