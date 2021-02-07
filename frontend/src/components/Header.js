import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className='Navbar'>
      <div className='navbar-home'>
        <Link to='/'>
          <h2>Radishing</h2>
        </Link>
        <button className='toggle' onClick={() => setOpen(open => !open)}>
          <i className={'fas ' + (open ? 'fa-angle-up' : 'fa-angle-down')} />
        </button>
      </div>
      <ul className={'navbar-links ' + (open ? 'opened' : 'closed')}>
        <li className='navbar-link'>
          <Link to='/cart'>
            <i className='fas fa-shopping-cart'></i> Cart
          </Link>
        </li>
        <li className='navbar-link'>
          <Link to='.'>
            <i className='fas fa-user'></i> Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
