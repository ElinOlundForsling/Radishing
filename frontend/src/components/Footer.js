import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <section>
        <h5>Öppettider</h5>
        <ul>
          <li>Plantskolan är stäng för säsongen!</li>
          <li>Du fortfarande beställa</li>
          <li>Copyright &copy;</li>
        </ul>
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
            <i class='fab fa-facebook'></i>
          </a>
          <a href='https://www.instagram.com/torvan_tradgard/?hl=en'>
            <i class='fab fa-instagram'></i>
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
