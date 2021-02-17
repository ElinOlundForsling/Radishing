import React, { useState, useEffect } from 'react';

const Rate = ({ rating, setRating }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starsArray = [];
    let style;

    for (let i = 5; i > 0; i--) {
      if (i <= rating) {
        style = 'star gold checkedStar';
      } else {
        style = 'star';
      }

      starsArray.push(
        <label
          key={i}
          className={style}
          onChange={e => setRating(e.target.value)}>
          <input type='radio' name='rating' value={i} />
        </label>,
      );
      setStars(starsArray);
    }
  }, [rating, setRating]);

  return <div className='stars'>{stars}</div>;
};

export default Rate;
