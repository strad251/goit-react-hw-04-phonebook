import { useState, useEffect } from "react";
import { nanoid } from 'nanoid'

import { ContactForm } from "./Form/Form";
import { Contacts } from "./Contacts/Contacts";
import { Filter } from "./Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, filter])
  
  const addContact = (data) => {
    const newContact = {
      ...data,
      id: nanoid()
    };

    const isExist = contacts.find(contact => {
      return contact.name === data.name;
    });
    if (isExist) {
      alert('contact already exists');
      return
    }
    setContacts(prevState => [...prevState, newContact]);

  };
    const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
    };
  
  const filterContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().trim().includes(filter);
    });
  };
  
  const filterChange = input => {
    setFilter(input);
  }
  

  return (

    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filterInput={filterChange} />
      <Contacts
        contacts={filterContacts()}
        deleteContact={deleteContact} />
    </div>
  )
};
