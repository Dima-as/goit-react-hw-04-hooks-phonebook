import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import shortid from "shortid";

export default function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contact = localStorage.getItem("contacts");
    const parsedContact = JSON.parse(contact);
    if (parsedContact) {
      setContacts(parsedContact);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitData = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts((contacts) => [contact, ...contacts]);
  };
  const onFilterInputValue = (e) => {
    setFilter(e.target.value);
  };

  const visibleContacts = () => {
    const normFilter = filter.toLocaleLowerCase();
    return contacts.filter((cotact) =>
      cotact.name.toLocaleLowerCase().includes(normFilter)
    );
  };
  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };
  const visibleContact = visibleContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitData} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilterInputValue={onFilterInputValue} />
      <ContactList contacts={visibleContact} deleteContact={deleteContact} />
    </div>
  );
}
