import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      opened: false,
    };
  }

  toggle() {
    this.setState({
      opened: !this.state.opened,
    });
  }

  render() {
    return (
      <nav className='Navbar'>
        <div className='navbar-home'>
          <h2>Radishing</h2>
          <button className='toggle' onClick={this.toggle.bind(this)}>
            <i
              className={
                'fas ' + (this.state.opened ? 'fa-angle-up' : 'fa-angle-down')
              }
            />
          </button>
        </div>
        <ul
          className={
            'navbar-links ' + (this.state.opened ? 'opened' : 'closed')
          }>
          <li className='navbar-link'>
            <Link to='.'>
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
  }
}

export default Header;
