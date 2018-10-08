import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';
import Book from './Book';

class SearchBooks extends React.Component {

  state = {
    query: '',
    books: [],
    results: []
  }

  updateQuery(query) {
    this.setState({query: query});
    BooksAPI.search(query)
    .then(response => {
      for (const r of response) {
        this.setState({books: []})
        BooksAPI.get(r.id).then(result => this.setState({books: [...this.state.books, result]}))
      }
    });
  }

  renderSearchResults = () => {



  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
             placeholder="Search by title or author"
             value={this.state.query}
             onChange={(event) => this.updateQuery(event.target.value)}
             />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books.map((book) => (
            <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
          ))}
          </ol>
        </div>
      </div>
    )
  }
};

export default SearchBooks;
