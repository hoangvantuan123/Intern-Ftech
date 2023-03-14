import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import About from './component/about';
import Login from './component/auth/login';
import Register from './component/auth/register';
import Home from './component/home';
import Profile from './component/profile';
import PostListPage from './component/post'
import FormFields from './component/post/form_edit';
import FormNew from './component/post/form_new';
import PostsList from './component/post/postsList';
import ShowPost from './component/post/showPost';

function App() {
  const auth = useSelector((state) => state.auth);
  //console.log('Appjs', auth)
  return (
    <div className="App  ">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route exact path='/about' element={<About />} ></Route>
          <Route exact path='/blog' element={<PostListPage />} ></Route>
          <Route exact path='/posts/:slug' element={<ShowPost />} ></Route>
          <Route exact path='/posts/all' element={<PostsList />} ></Route>
          <Route exact path={`/${auth.name}/posts/new`} element={<FormNew />} ></Route>
          <Route exact path='/edit/posts/:id' element={<FormFields />} ></Route>
          {/* <Route exact path='/api/posts/:id' element={<FormFields />} ></Route> */}
          <Route exact path={`/${auth.name}`} element={<Profile />} ></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div >

  );
}

export default App;
