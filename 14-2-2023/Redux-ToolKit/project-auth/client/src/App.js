import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import About from './component/about';
import Login from './component/auth/login';
import { useState } from "react";
import Register from './component/auth/register';
import Home from './component/home';
import Profile from './component/profile';
import PostListPage from './component/post'
import FormFields from './component/post/form_edit';
import FormNew from './component/post/form_new';
import PostsList from './component/post/postsList';
import ShowPost from './component/post/showPost';
import ChatBox from './component/chat'
import { AppContext, socket } from "./context/appContext";
function App() {
  const auth = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);
  //console.log('Appjs', auth)
  return (
    <div className="App  ">
      <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} ></Route>
            <Route exact path='/about' element={<About />} ></Route>
            <Route exact path='/chat' element={<ChatBox />}  ></Route>
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
      </AppContext.Provider>
    </div >

  );
}

export default App;
