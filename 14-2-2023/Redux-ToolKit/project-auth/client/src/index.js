import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer, { loadUser } from './slices/authSlices';
import postReducer, { setBlogs } from './slices/postSlices';
/*
  - configureStore()
  + có sẵn Redux DevTools
  + có sẵn redux-thunk để thực hiện async actions 

*/

const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer
  },
})

store.dispatch(loadUser(null));
store.dispatch(setBlogs());
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

