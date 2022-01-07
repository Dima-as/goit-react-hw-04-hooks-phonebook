import React, { useState } from "react";
import s from "./ContactForm.module.scss";
import PropTypes from "prop-types";
import shortid from "shortid";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const reset = () => {
    setName("");
    setNumber("");
  };

  const hendleNameChange = (e) => {
    setName(e.currentTarget.value);
  };
  const hendleTelChange = (e) => {
    setNumber(e.currentTarget.value);
  };

  const hendleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  return (
    <form className={s.list} onSubmit={hendleSubmit}>
      <label htmlFor={nameInputId} className={s.item}>
        <input
          id={nameInputId}
          onChange={hendleNameChange}
          value={name}
          className={s.input}
          placeholder="Rosie Simpson"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor={numberInputId} className={s.item}>
        <input
          id={numberInputId}
          onChange={hendleTelChange}
          value={number}
          className={s.input}
          placeholder="459-12-56"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
