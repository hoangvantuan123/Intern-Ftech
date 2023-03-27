import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import appApi from "./services/appApi";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authReducer, { loadUser } from './slices/authSlices';
import postReduces, { setPosts } from './slices/postSlices';
import userReduces, { setUsers } from './slices/userSlices';
import imageReduces, { setImages } from './slices/imageSlices';
// reducers
const reducer = combineReducers({
    user: userSlice,
    posts: postReduces,
    auth: authReducer,
    users: userReduces,
    images: imageReduces,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath],
};

// persist our store

const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;
