import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Form_side_bar from "./component/form_side_bar/index";
import Login from "./component/auth/login";
import { useState } from "react";
import Register from "./component/auth/register";
import Home from "./component/home_2";
import Profile from "./component/profile";
import PostListPage from "./component/post";
import FormFields from "./component/post/form_edit";
import FormNew from "./component/post/form_new";
import PostsList from "./component/post/postsList";
import ShowPost from "./component/post/showPost";
import ChatBox from "./component/chat";
import { AppContext, socket } from "./context/appContext";
import Form_side_barout from "./component/form_side_bar/index";

/* 
`Wrapper` để bọc và kiểm soát việc hiển thị của `Form_side_bar`.  truyền prop `showForm` vào trong `Wrapper` 
và sử dụng nó để kiểm soát việc hiển thị của `Form_side_bar` và cách margin bên trái cho nội dung.
Trong các routes `Login` và `Register`, chỉ cần chuyển giá trị `false` cho prop `showForm` để ẩn `Form_side_bar`. */
function Wrapper({ children, showForm }) {
  return (
    <>
      {showForm && <Form_side_bar />}
      <div className={`${showForm ? "sm:ml-64 " : ""}`}>{children}</div>
    </>
  );
}

function App() {
  const auth = useSelector((state) => state.auth);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [all, setall] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  // const user = useSelector((state) => state.user);
  //console.log('Appjs', auth)
  const showForm = true;
  return (
    <div className="App  ">
      <AppContext.Provider
        value={{
          socket,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          rooms,
          setRooms,
          newMessages,
          setNewMessages,
          
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Wrapper showForm={showForm}>
                  <Home />
                </Wrapper>
              }
            />

            <Route
              path="/chat"
              element={
                <Wrapper showForm={showForm}>
                  <ChatBox />
                </Wrapper>
              }
            />
            <Route
              path="/blog"
              element={
                <Wrapper showForm={showForm}>
                  <PostListPage />
                </Wrapper>
              }
            />
            <Route
              path="/posts/:slug"
              element={
                <Wrapper showForm={showForm}>
                  <ShowPost />
                </Wrapper>
              }
            />
            <Route
              path="/posts/all"
              element={
                <Wrapper showForm={showForm}>
                  <PostsList />
                </Wrapper>
              }
            />
            <Route
              path={`/${auth.name}`}
              element={
                <Wrapper showForm={showForm}>
                  <Profile />
                </Wrapper>
              }
            />
            <Route
              path={`/${auth.name}/posts/new`}
              element={
                <Wrapper showForm={showForm}>
                  <FormNew />
                </Wrapper>
              }
            />
            <Route
              path="/edit/posts/:id"
              element={
                <Wrapper showForm={showForm}>
                  <FormFields />
                </Wrapper>
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
