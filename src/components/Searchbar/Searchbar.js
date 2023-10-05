import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchbarStyle,
  SearchbarForm,
  SearchbarFormBtn,
  SearchbarFormInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('To search, please enter a query!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setQuery('');
      return;
    }

    onSubmit(query);
  };

  return (
    <SearchbarStyle>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchbarFormBtn type="submit">Search</SearchbarFormBtn>

        <SearchbarFormInput
          type="text"
          value={query}
          onChange={handleNameChange}
          autocomplete="off"
          autoFocus
          placeholder="What are you looking for?"
        />
      </SearchbarForm>
    </SearchbarStyle>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
