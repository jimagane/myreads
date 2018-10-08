import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
  	wantToRead: [],
  	read: []
  }

  componentDidMount() {
  	this.renderBooks();
  }

  renderBooks() {
    BooksAPI.getAll()
    .then(response => {
      let currentlyReading = response.filter((book) => book.shelf === "currentlyReading");
      let wantToRead = response.filter((book) => book.shelf === "wantToRead");
      let read = response.filter((book) => book.shelf === "read");
      this.setState({currentlyReading: currentlyReading, wantToRead: wantToRead, read: read});
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  componentDidUpdate() {
    this.renderBooks();
  }

  render() {
    return (
      <div className="app">
       <Route exact path="/" render={() => (
          <ListBooks currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} onUpdateBook={this.updateBook} />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks onUpdateBook={this.updateBook} />
        )}/>
      </div>
    )
  }
};

export default BooksApp;
