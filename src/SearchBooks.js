import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends React.Component {

  renderSearch() {
    let bookSearchResults = this.props.bookSearchResults;
    if (bookSearchResults.length > 0) {
      return bookSearchResults.map((book) => (
        <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
      ))
    } else {
      return <div>No Matching Search Results</div>
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
             placeholder="Search by title or author"
             value={this.props.query}
             onChange={(event) => this.props.onUpdateQuery(event.target.value)}
             />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderSearch()}
          </ol>
        </div>
      </div>
    )
  }
};

export default SearchBooks;
