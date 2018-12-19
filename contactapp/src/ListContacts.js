import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  clearQuery = () => {
    this.setState({
      query: ""
    });
  };

  render() {
    const { contacts, onDeleteContact, onNavigate } = this.props;
    const { query } = this.state;

    let shownContact;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      shownContact = contacts.filter(contact => match.test(contact.name));
    } else {
      shownContact = contacts;
    }

    shownContact.sort(sortBy("name"));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <Link to="/AddContact" className="add-contacts">
            TAMBAH
          </Link>
        </div>

        {shownContact.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {shownContact.length} of {contacts.length} total.
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {shownContact.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>Nama : {contact.name}</p>
                <p>jabatan : {contact.jabatan}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
