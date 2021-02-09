import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const profileMenu = [
  { value: 'profile', label: 'Profile' },
  { value: 'logout', label: 'Sign Out' },
];

const adminMenu = [
  { value: 'users', label: 'Users' },
  { value: 'products', label: 'Products' },
  { value: 'orders', label: 'Orders' },
];

const MenuDropdown = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [activeFilterDD, setActiveFilterDD] = useState(null);
  const [profileSelect, setProfileSelect] = useState(null);
  const [adminSelect, setAdminSelect] = useState(null);

  const profileDD = useRef(null);
  const adminDD = useRef(null);

  const filterDropdownClick = filterType => {
    switch (filterType) {
      case 'profile-dd':
        activeFilterDD === 'profile-dd'
          ? setActiveFilterDD(null)
          : setActiveFilterDD('profile-dd');
        break;
      case 'admin-dd':
        activeFilterDD === 'admin-dd'
          ? setActiveFilterDD(null)
          : setActiveFilterDD('admin-dd');
        break;
      default:
        break;
    }
  };

  const selectDDValue = (e, obj, filterType) => {
    e.preventDefault();
    switch (filterType) {
      case 'profile-dd':
        if (obj.value === 'logout') {
          dispatch(logout());
        } else if (obj.value === 'profile') {
          document.location.href = '/profile';
        }
        setProfileSelect(obj);
        break;
      case 'admin-dd':
        setAdminSelect(obj);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClick = e => {
      if (
        (profileDD.current && profileDD.current.contains(e.target)) ||
        (adminDD.current && adminDD.current.contains(e.target))
      ) {
        return;
      }
      handleClickOutside();
    };

    const handleClickOutside = () => {
      setActiveFilterDD(null);
    };
    document.addEventListener('mousedown', handleClick, false);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, []);

  return (
    <div className='dropdown-wrapper'>
      {userInfo && (
        <div
          ref={profileDD}
          className={
            'custom-dropdown ' + (activeFilterDD === 'profile-dd' ? 'show' : '')
          }>
          <p
            onClick={() => filterDropdownClick('profile-dd')}
            id='profile-menu'>
            {profileSelect ? profileSelect.label : userInfo.name}
            &nbsp;<i className='fas fa-chevron-down'></i>
          </p>
          <div className='dropdown-content'>
            {profileMenu.map(obj => {
              return (
                <button
                  key={obj.value}
                  id={obj.value}
                  onClick={e => selectDDValue(e, obj, 'profile-dd')}>
                  {obj.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {userInfo && userInfo.isAdmin && (
        <div
          ref={adminDD}
          className={
            'custom-dropdown ' + (activeFilterDD === 'admin-dd' ? 'show' : '')
          }>
          <p onClick={() => filterDropdownClick('admin-dd')} id='admin-menu'>
            {adminSelect ? adminSelect.label : 'Admin'}
            &nbsp;<i className='fas fa-chevron-down'></i>
          </p>
          <div className='dropdown-content'>
            {adminMenu.map(obj => {
              return (
                <button
                  key={obj.value}
                  id={obj.value}
                  onClick={e => selectDDValue(e, obj, 'admin-dd')}>
                  {obj.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
