import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, createUser, updateUser, deleteUser, signIn, fetchById } from '../Utils/API';

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
  token: string | null;
  selectedUser: User | null;
  isSlideOpen: boolean;
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  loading: false,
  error: null,
  success: false,
  token: localStorage.getItem('token'),
  selectedUser: null,
  isSlideOpen: false,
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

export const login = createAsyncThunk('users/login', async (credentials: { email: string, password: string }) => {
  const response = await signIn(credentials.email, credentials.password);
  return response;
});

export const userDetails = createAsyncThunk('users/userDetails', async (id: string) => {
  const response = await fetchById(id);
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openSlide: (state, action) => {
      state.selectedUser = action.payload;
      state.isSlideOpen = true;
    },
    closeSlide: (state) => {
      state.isSlideOpen = false;
      state.selectedUser = null;
    },
  },
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
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.token = action.payload;
        if (state.token) {
          localStorage.setItem('token', state.token);
        }
        
      })

      .addCase (login.rejected, (state, action) => {      
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
        state.success = false;
      })

      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(userDetails.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch user details';
        state.success = false;
      })
  },
});

export const { openSlide, closeSlide } = usersSlice.actions;
export default usersSlice.reducer;