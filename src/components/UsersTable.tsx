import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers } from '../app/usersSlice';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { UsersSearch } from './UsersSearch';
import { filteredUsers } from '../utils/filteredUsers';
  
  export const UsersTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, status, error, searchTerms } = useSelector((state: RootState) => ({
      users: state.users.users,
      status: state.users.status,
      error: state.users.error,
      searchTerms: state.users.searchTerms,
    }));

    const filteredUsersList = filteredUsers(users, searchTerms);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchUsers());
      }
    }, [dispatch, status]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    } else if (status === 'failed') {
      return <div>{error}</div>;
    }

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Username
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              E-Mail
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Phone
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
      <UsersSearch/>
        {filteredUsersList.map(user => {
          const { name, username, email, phone } = user;
          const formatedPhone = formatPhoneNumber(phone)
          return (
            <>
            
            <tr
              key={user.name}>
              <td className='is-size-5'>{name}</td>
              <td className='is-size-5'>{username}</td>
              <td className='is-size-5'>{email}</td>
              <td className='is-size-5'>{formatedPhone}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  )
}