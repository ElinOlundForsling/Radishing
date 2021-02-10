import React, { useEffect } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import { Link } from 'react-router-dom';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color='red' expire={0}>
          {error}
        </Alert>
      ) : (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className='fas fa-check'
                      style={{ color: '#9da9a0' }}></i>
                  ) : (
                    <i
                      className='fas fa-times'
                      style={{ color: '#b26e63' }}></i>
                  )}
                </td>
                <td className='admin-icon-buttons'>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className='edit-button'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  <button
                    className='trash-button'
                    onClick={() => handleDelete(user._id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
