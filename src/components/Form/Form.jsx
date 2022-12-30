import PropTypes from 'prop-types';
import { useState } from 'react';

import css from './Form.module.css'

export const ContactForm = ({addContact}) => {

  const [name, setName] = useState('');
  const [ number, setNumber ] = useState('')

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
     case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    addContact({ name, number })
    setName('');
    setNumber('');
  }



  return (
    <form className={css.Form} onSubmit={handleSubmit}>
      <label
        className={css.Label}>
        Name:
        <input
          className={css.Input}
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label
        className={css.Label}>
        Number:
        <input
          className={css.Input}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.AddBtn} type='submit'>Add contact</button>
    </form>
  )
}


ContactForm.ropTypes = {
  addContact: PropTypes.func.isRequired,
}