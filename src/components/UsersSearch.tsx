import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setSearchTerm } from '../store/usersSlice';

export const UsersSearch: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchTerms = useSelector(
    (state: RootState) => state.users.searchTerms,
  );

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    column: keyof typeof searchTerms,
  ) => {
    dispatch(setSearchTerm({ [column]: e.target.value }));
  };

  return (
    <tr className="table-filters">
      <td>
        <input
          className="input is-link is-normal is-size-5"
          type="text"
          placeholder="Search by name"
          value={searchTerms.name}
          onChange={(e) => handleSearchChange(e, 'name')}
        />
      </td>
      <td>
        <input
          className="input is-link is-normal is-size-5"
          type="text"
          placeholder="Search by username"
          value={searchTerms.username}
          onChange={(e) => handleSearchChange(e, 'username')}
        />
      </td>
      <td>
        <input
          className="input is-link is-normal is-size-5"
          type="email"
          placeholder="Search by email"
          value={searchTerms.email}
          onChange={(e) => handleSearchChange(e, 'email')}
        />
      </td>
      <td>
        <input
          className="input is-link is-normal is-size-5"
          type="tel"
          placeholder="Search by phone"
          value={searchTerms.phone}
          onChange={(e) => handleSearchChange(e, 'phone')}
        />
      </td>
    </tr>
  );
};
