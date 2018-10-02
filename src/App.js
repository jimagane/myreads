import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  state = {
    listAllBooks: [],
    query: '',
    bookSearchResults: []
  }

  componentWillMount() {
    BooksAPI.getAll().then(response => this.setState({listAllBooks: response}));
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

  updateBook = (key, shelf) => {
    BooksAPI.update(key, shelf);
    let books = this.state.listAllBooks;
    for (const book of books) {
      if (book.id === key.id) {
        let i = books.indexOf(book);
        // Code solution for updating single property of object in array via copying object and slicing, credit to Radosław Miernik, url: 'https://stackoverflow.com/questions/35174489/reactjs-setstate-of-object-key-in-array/35174579'
        let stateCopy = Object.assign({}, this.state);
        stateCopy.listAllBooks = stateCopy.listAllBooks.slice();
        stateCopy.listAllBooks[i] = Object.assign({}, stateCopy.listAllBooks[i]);
        stateCopy.listAllBooks[i].shelf = shelf;
        this.setState(stateCopy);
      }
    }
  }

  render() {
    const { listAllBooks, query, bookSearchResults} = this.state;
    let currentlyReading = listAllBooks.filter((book) => book.shelf === "currentlyReading");
    let wantToRead = listAllBooks.filter((book) => book.shelf === "wantToRead");
    let read = listAllBooks.filter((book) => book.shelf === "read");

    if(query) {
      BooksAPI.search(query).then(response => this.setState({bookSearchResults: response}));
    }

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} onUpdateBook={this.updateBook} />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks query={query} onUpdateQuery={this.updateQuery} bookSearchResults={bookSearchResults} onUpdateBook={this.updateBook} />
        )}/>
      </div>
    )
  }
};

export default BooksApp;
