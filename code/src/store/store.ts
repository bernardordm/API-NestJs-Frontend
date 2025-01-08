import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import { createUser, getAll } from "../Utils/API";

const store = configureStore({
    reducer:{
        user: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;