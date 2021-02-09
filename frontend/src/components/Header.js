import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';

const Header = () => {
  const [open, setOpen] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

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
          <a href='http://torvans.blogspot.com/'>
            <i className='fab fa-blogger-b'></i> Blog
          </a>
        </li>
        <li className='navbar-link'>
          <Link to='/cart'>
            <i className='fas fa-shopping-cart'></i> Cart
          </Link>
        </li>
        {!userInfo && (
          <li className='navbar-link'>
            <Link to='/login'>
              <i className='fas fa-user'></i> Sign In
            </Link>
          </li>
        )}
        <MenuDropdown />
      </ul>
    </nav>
  );
};

export default Header;
