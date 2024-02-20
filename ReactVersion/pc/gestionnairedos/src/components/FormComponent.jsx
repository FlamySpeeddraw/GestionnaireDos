import React, { useState } from 'react';
import { insertData } from './../DataManager';

export const FormComponent = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    insertData(name, message);
    setName('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder='Enter message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type='submit'>Submit</button>
    </form>
  );
};