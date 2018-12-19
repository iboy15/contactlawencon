import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";
class AddContact extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const val = serializeForm(e.target, { hash: true });
    if (this.props.onCreateContact) this.props.onCreateContact(val);
  };
  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">
          Close
        </Link>
        <form className="create-contact-form" onSubmit={this.handleSubmit}>
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />

          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="jabatan" placeholder="Jabatan" />
            <button> SIMPAN</button>
            <Link className="cancel-add-contacts" to="/">
              BATAL
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
