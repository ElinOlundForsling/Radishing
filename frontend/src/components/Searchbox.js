import React, { useState } from 'react';

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    }
  };

  return (
    <div className='searchbox'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='q'
          placeholder='Search for products'
          onChange={e => setKeyword(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
};

export default Searchbox;
