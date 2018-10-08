import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';
import Book from './Book';

class SearchBooks extends React.Component {

  state = {
    query: '',
    searchBookResults: [],
    listBooks: []
  }

  updateQuery(query) {
    this.setState({query: query});
    if(query) {
      BooksAPI.search(query)
      .then(response => {
        this.setState({searchBookResults: response});
        if(this.state.searchBookResults !== undefined) {
          if (this.state.searchBookResults.error != null) {
            this.setState({listBooks: []});
          }
          if (this.state.searchBookResults.length > 0) {
            let listBooks = [];
            this.state.searchBookResults.map((book) => BooksAPI.get(book.id).then(response => listBooks.push(response)));
            this.setState({listBooks: listBooks});
          }
        }
      })
    }
  }

  renderSearchResults() {
    if(this.state.query !== undefined) {
      if(this.state.searchBookResults.error != null) {
        return <div>No Matching Results</div>
      } else if (this.state.query !== '') {
        this.state.listBooks.sort(sortBy('title'));
        return this.state.listBooks.map((book) => (
          <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
        ))
      }
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
             value={this.state.query}
             onChange={(event) => this.updateQuery(event.target.value)}
             />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderSearchResults()}
          </ol>
        </div>
      </div>
    )
  }
};

export default SearchBooks;
