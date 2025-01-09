import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, createUser, updateUser, deleteUser } from '../Utils/API';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  loading: false,
  error: null,
  success: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getAll();
  return response;
});

export const addUser = createAsyncThunk('users/addUser', async (newUser: User) => {
  const response = await createUser(newUser);
  return response;
});

export const editUser = createAsyncThunk('users/editUser', async (updatedUser: User) => {
  const response = await updateUser(updatedUser);
  return response;
});

export const removeUser = createAsyncThunk('users/removeUser', async (id: string) => {
  await deleteUser(id);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.success = true;
        localStorage.setItem('users', JSON.stringify(state.users));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
        state.success = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.success = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
          state.success = true;
        }
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
        state.success = false;
      });
  },
});

export default usersSlice.reducer;