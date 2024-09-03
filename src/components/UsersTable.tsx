import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../store/usersSlice';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { UsersSearch } from './UsersSearch';
import { filteredUsers } from '../utils/filterUsers';
import { User } from '../types/User';
import cn from 'classnames';
import { BallTriangle } from 'react-loader-spinner';
import './UsersTable.css'

export const UsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error, searchTerms } = useSelector(
    (state: RootState) => ({
      users: state.users.users,
      status: state.users.status,
      error: state.users.error,
      searchTerms: state.users.searchTerms,
    }),
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsersList = filteredUsers(users, searchTerms);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return ( <div className='loader-container'><BallTriangle
      height={100}
      width={100}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /></div>);
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          {['Name', 'Username', 'E-Mail', 'Phone'].map((item, index) => (
            <th key={index}>
              <span className="is-flex is-flex-wrap-nowrap">{item}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <UsersSearch />
        {filteredUsersList.map((user) => {
          const { name, username, email, phone } = user;
          const formatedPhone = formatPhoneNumber(phone);
          return (
            <tr
              key={username}
              className={cn({
                'has-background-warning': user === selectedUser,
              })}
              onClick={() => setSelectedUser(user)}
              onDoubleClick={() => setSelectedUser(null)}
            >
              <td className="is-size-5">{name}</td>
              <td className="is-size-5">{username}</td>
              <td className="is-size-5">{email}</td>
              <td className="is-size-5">{formatedPhone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
};
