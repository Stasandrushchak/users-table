import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerms: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
  searchTerms: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerms = { ...state.searchTerms, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setSearchTerm } = usersSlice.actions;

export default usersSlice.reducer;
