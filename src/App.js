import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  state = {
    listAllBooks: [
      {
        'id': '001',
        'title': 'To Kill a Mockingbird',
        'authors': ['Harper Lee'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '002',
        'title': "Ender's Game",
        'authors': ['Orson Scott Card'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '003',
        'title': '1776',
        'authors': ['David McCullough'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '004',
        'title': "Harry Potter and the Sorcerer's Stone",
        'authors': ['J.K. Rowling'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '005',
        'title': 'The Hobbit',
        'authors': ['J.R.R. Tolkien'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '006',
        'title': "Oh, the Places You'll Go!",
        'authors': ['Seuss'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api'},
        'shelf': 'none'
      },
      {
        'id': '007',
        'title': 'The Adventures of Tom Sawyer',
        'authors': ['Mark Twain'],
        'imageLinks': {thumbnail: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api'},
        'shelf': 'none'
      }
    ],
    query: '',
    bookSearchResults: []
  }

/*
 * Retrieve books from API and merge with books listed in initial state. Check
 * for previous state stored in local storage and use if found.
 */
  async componentWillMount() {
    await BooksAPI.getAll().then(response => this.setState((prevState) => (
      {listAllBooks: response.concat(prevState.listAllBooks)}
    )));
    let listAllBooks = localStorage.getItem('mydata') ? JSON.parse(localStorage.getItem('mydata')).listAllBooks : this.state.listAllBooks;
    this.setState({listAllBooks: listAllBooks});
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

/*
 * When book shelf option is changed, function iterates through state's array
 * of books and updates shelf of matching book.
 * After shelf has updated, the change is stored in localStorage.
 */
  updateBook = (shelf, key) => {
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

        localStorage.setItem('mydata', JSON.stringify(stateCopy));
      }
    }
  }

  render() {
    const { listAllBooks, query, bookSearchResults} = this.state;
    let currentlyReading = listAllBooks.filter((book) => book.shelf === "currentlyReading");
    let wantToRead = listAllBooks.filter((book) => book.shelf === "wantToRead");
    let read = listAllBooks.filter((book) => book.shelf === "read");

    if(query) {
      BooksAPI.search(query).then(response => this.setState((prevState) =>(
        {bookSearchResults: response}
      )));
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
