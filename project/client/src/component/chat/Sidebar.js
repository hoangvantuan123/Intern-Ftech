import React, { useContext, useEffect, useState, useCallback } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
//import { addNotifications, resetNotifications } from "../../slices/userSlices";
import { addNotifications, resetNotifications } from "../../slices/authSlices";
import "./Sidebar.css";
import axios from "axios";

function Sidebar() {

  // Doan code khi dùng AI để tối ưu hóa
  //có the xem đoạn code cũ khi chưa đuọc tối ưu lắm ở file Mau_code_Sidebar_js.md
  const user = useSelector((state) => state.auth);
  const auth = user;
  const [selectedButton, setSelectedButton] = useState(null);
  const [message, setMessage] = useState([]);
  const [updatedPayload, setUpdatedPayload] = useState([]);
  const [payload, setPayload] = useState([]);

  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
    setMessages,
    messages,
  } = useContext(AppContext);

  const handleClick = (index) => {
    setSelectedButton(index);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("http://127.0.0.1:5000/api/messages")
        .then((response) => {
          setMessage(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const result = message.reduce((acc, message) => {
    const to = message.to;
    if (!acc[to]) {
      acc[to] = { to: to, _allMessages: [] };
    }
    acc[to]._allMessages.push(message);
    acc[to]._recentMessage = acc[to]._allMessages.slice(-1)[0];
    return acc;
  }, {});

  const resultArray = Object.values(result);
  const toCompareresult = resultArray.map((item) => {
    return {
      to: item.to,
      recentMessage: item._recentMessage.content,
      date: item._recentMessage.date,
      time: item._recentMessage.time,
    };
  });

  useEffect(() => {
    socket.emit("get-all-messages");

    socket.on("all-messages", (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off("all-messages");
    };
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, [user]);

  const handleNewUser = useCallback((data) => {
    setPayload(data);
  }, []);

  useEffect(() => {
    socket.on("new-user", handleNewUser);
    return () => {
      socket.off("new-user", handleNewUser);
    };
  }, [socket, handleNewUser, payload]);

  const authId = auth._id;

  useEffect(() => {
    const updatedPayload = payload.map((obj) => {
      const newId_to_1 = obj._id + "-" + authId;
      const newId_to_2 = authId + "-" + obj._id;
      const tempArray = toCompareresult.filter(
        (item) => item.to === newId_to_1 || item.to === newId_to_2
      );
      return {
        ...obj,
        newId_to_1,
        newId_to_2,
        updatedArray: tempArray.concat(),
      };
    });
    setMembers(updatedPayload);
  }, [payload, authId, toCompareresult, setMembers]);

  function getRooms() {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);
    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });
  return (
    <>
      <div className="flex flex-col w-2/5 border border-gray-100  overflow-y-auto ">
        <div className="inline-flex rounded-lg  bg-gray-50 p-1 m-5">
          <button className="w-1/2 inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative">
            Chat
          </button>
          <button className="w-1/2 inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
            Groups
          </button>
        </div>
        {members.map((member, index) => (
          <div
            key={member.id}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id == member?._id}
          >
            {member._id !== user?._id && (
              <div
                /* className="group border border-gray-100 h-[100px] m-2 flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                 */
                onClick={() => {
                  handlePrivateMemberMsg(member);
                  setSelectedButton(index);
                }}
                className={`${privateMemberMsg?._id === member?._id
                  ? "bg-white text-gray-700"
                  : "  bg-gray-50  text-gray-500 "
                  } group border border-gray-100 h-[80px]  flex items-center justify-between px-4 py-2 
                  
                  `}
              >
                <div className="flex gap-2 w-full items-center">
                  <div className="w-1/5">
                    <div className="relative">
                      <span className="absolute text-green-500 right-0 bottom-0">
                        <svg width="15" height="10">
                          <circle
                            cx="5"
                            cy="5"
                            r="5"
                            fill="currentColor"
                          ></circle>
                        </svg>
                      </span>
                      <img
                        src={
                          member.picture ||
                          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        }
                        className=" object-cover h-12 w-12  rounded-xl dark:shadow-xl border-white  "
                      />
                    </div>

                    {member.status == "online" ? (
                      <i className="fas fa-circle sidebar-online-status"></i>
                    ) : (
                      <i className="fas fa-circle sidebar-offline-status"></i>
                    )}
                  </div>
                  <div className="w-full h-full">
                    {/* <div className="text-lg font-semibold">
                  {member.name}
                  {member._id === user?._id}
                  {member.status == "offline" && " (Offline)"}
                </div> */}
                    {/* ẩn tài khoản của mình  */}
                    <div className=" ">
                      <div
                        className={
                          user && user._id === member._id
                            ? " opacity-0 hidden !important"
                            : "   justify-start overflow-hidden text-left"
                        }
                      >
                        <div>
                          <h2 className="text-base font-medium text-gray-800">{member.name}</h2>
                        </div>
                        {/* {comparearr.includes(user._id + '-' + member._id) && (
                          <>
                            <h1> online hien</h1>
                          </>
                        )} */}

                        <span class="text-sm text-gray-600 an">
                          {
                            member.updatedArray.map((item) => {
                              return <>
                                <span>
                                  {item.recentMessage}
                                </span>
                              </>
                            })
                          }
                        </span>

                        {/*  {member.status === "offline" && " (Offline)"} */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="badge rounded-pill bg-primary">
                      {user.newMessages &&
                        user.newMessages[orderIds(member._id, user._id)]
                        ? user.newMessages[orderIds(member._id, user._id)]
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
