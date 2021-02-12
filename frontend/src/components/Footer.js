import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTextContent } from '../actions/textActions';
import Spinner from './Spinner';

const Footer = () => {
  const dispatch = useDispatch();

  const textContent = useSelector(state => state.textContent);
  const { loading, error, openingHours } = textContent;

  useEffect(() => {
    dispatch(getTextContent());
  }, [dispatch]);

  return (
    <footer className='footer'>
      <section>
        <h5>Öppettider</h5>
        {loading ? (
          <Spinner />
        ) : error ? (
          'Kan inte ladda öppettiderna, ladda om sidan'
        ) : (
          <p>{openingHours}</p>
        )}
      </section>
      <section>
        <h5>Länkar</h5>
        <ul>
          <li>
            <Link to='/about'>Om Torvan</Link>
          </li>
          <li>
            <Link to='/map'>Hitta hit</Link>
          </li>
          <li>
            <Link to='/privacy'>Privacy</Link>
          </li>
        </ul>
      </section>
      <section>
        <h5>Kontakt</h5>
        <ul>
          <li>
            <a href='mailto:info@torvan.nu'>info@torvan.nu</a>
          </li>
        </ul>
        <div>
          <a href='https://www.facebook.com/Torvan-Tr%C3%A4dg%C3%A5rd-359977417368546'>
            <i className='fab fa-facebook'></i>
          </a>
          <a href='https://www.instagram.com/torvan_tradgard/?hl=en'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='http://torvans.blogspot.com/'>
            <i className='fab fa-blogger-b'></i>
          </a>
        </div>
        <p>&copy; 2021 Pia Myrberg</p>
      </section>
    </footer>
  );
};

export default Footer;
