import { configureStore } from "@reduxjs/toolkit";

import appApi from "./services/appApi";
// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authReducer, { loadUser } from './slices/authSlices';
import postReduces, { setPosts } from './slices/postSlices';
import userSlice from "./slices/userSlices";
import imageReduces, { setImages } from './slices/imageSlices';
import messageSlices from './slices/messageSlices';
// reducers
const reducer = combineReducers({
    posts: postReduces,
    images: imageReduces,
    auth: authReducer,
    user: userSlice,
    message: messageSlices,
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
store.dispatch(loadUser(null));
store.dispatch(setPosts());
store.dispatch(setImages());

export default store;
