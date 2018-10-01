import React from 'react';

class Book extends React.Component {

  render() {
    let coverimage = '/icons/placeholder.png';
    if (this.props.book.imageLinks != null) {
      coverimage = this.props.book.imageLinks.thumbnail;
    }

    let authors = this.props.book.authors;
    if (this.props.book.authors === undefined) {
      authors = '';
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverimage})`}}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={(event) => this.props.onUpdateBook(event.target.value, this.props.book)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{`${authors}`}</div>
        </div>
      </li>
    )
  }
};

export default Book;
