import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import authReducer, { loadUser } from './slices/authSlices';
import postReduces, { setPosts } from './slices/postSlices';
import userReduces, { setUsers } from './slices/userSlices';
import imageReduces, { setImages } from './slices/imageSlices';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";
/*
  - configureStore()
  + có sẵn Redux DevTools
  + có sẵn redux-thunk để thực hiện async actions

*/

/* const rootReducer = combineReducers({
  posts: postReduces,
  auth: authReducer,
  users: userReduces,
  images: imageReduces,
})

const store = configureStore({
  reducer: rootReducer,
}) */
/* const store = configureStore({
  reducer: {
    posts: postReduces,
    auth: authReducer
  }
}) */

const persistedStore = persistStore(store);

store.dispatch(loadUser(null));
store.dispatch(setPosts());
store.dispatch(setImages());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();