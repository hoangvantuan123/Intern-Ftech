import React, { useContext, useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
//import { addNotifications, resetNotifications } from "../../slices/userSlices";
import { addNotifications, resetNotifications } from "../../slices/authSlices";
import "./Sidebar.css";
import axios from "axios";

function Sidebar({ userAccounts = new Map() }) {
  const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  //const message = useSelector((state) => state.message);
  console.log("auth", user);
  const [selectedButton, setSelectedButton] = React.useState(null);
  const [message, setMessage] = useState([]);
  const handleClick = (index) => {
    setSelectedButton(index);
  };
  const dispatch = useDispatch();

  // lay du lieu truc tiep
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get("http://127.0.0.1:5000/api/messages").then((response) => {
        setMessage(response.data);
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  /*  useEffect(() => {
    const eventSource = new EventSource("/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage((prevMessages) => [...prevMessages, data]);
    };
  }, []);

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
  }, []); */

  console.log("[[]]", message);
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

  /*  const lastData =
    messages?.[messages.length - 1]?.["messagesByDate"]?.[
      messages[messages.length - 1]["messagesByDate"].length - 1
    ];
  const content = lastData ? lastData.content : null;
  const to = lastData ? lastData.to : null;
  const name = to && to.includes(user._id) ? lastData.name : null; */
  /*  console.log("lastData", lastData);
  console.log("name", name);
  console.log("to", to); */

  // th1
  const combinedIdsth1 = members.map((item) => {
    return `${user._id}-${item._id}`;
  });
  console.log("combinedIdsth1", combinedIdsth1);
  //th2

  const combinedIdsth2 = members.map((item) => {
    return `${item._id}-${user._id}`;
  });
  console.log("combinedIdsth2", combinedIdsth2);

  let latestMessage;

  for (let i = message.length - 1; i >= 0; i--) {
    if (
      combinedIdsth1.includes(message[i].to) ||
      combinedIdsth2.includes(message[i].to)
    ) {
      latestMessage = message[i];
      break;
    }
  }
  console.log("latestMessage123", latestMessage);
  // gộp tất cả đoạn chat có cùng nhóm chat vao với nhau
  const result = message.reduce((acc, message) => {
    /* key cho object `acc` */
    const to = JSON.stringify(message.to);
    if (!acc[to]) {
      acc[to] = { to: to, _allMessages: [] };
    }
    acc[to]._allMessages.push(message);
    // Lấy tin nhắn cuối cùng trong mảng `_allMessages`
    acc[to]._recentMessage = acc[to]._allMessages.slice(-1)[0];
    return acc;
  }, {});
  /* console.log(JSON.stringify(result, null, 2));
   */
  console.log("result", result);
  useEffect(() => {
    // gửi yêu cầu lấy tất cả tin nhắn đến server khi component được render
    socket.emit("get-all-messages");

    // lắng nghe sự kiện từ server trả về tất cả các tin nhắn được lấy ra từ database
    socket.on("all-messages", (messages) => {
      setMessages(messages);
    });

    // hủy lắng nghe sự kiện để tránh rò rỉ bộ nhớ
    return () => {
      socket.off("all-messages");
    };
  }, []);

  useEffect(() => {
    console.log("All messages:", messages);
  }, [messages]);

  // Cachs 1
  /* function myFunction() {
    const to = lastData ? lastData.to : null;
    let result = { firstString: null, secondString: null };
    if (to) {
      const splittedStrings = to.split("-");
      result.firstString = splittedStrings[0];
      result.secondString = splittedStrings[1];
    } else {
      console.log("to is null or undefined");
    }
    return result;
  }
  const { firstString, secondString } = myFunction(lastData);
  console.log(firstString); // "6428238c18208f96bc3f667b"
  console.log(secondString); // "642817e6cdd11b2b2ebf5baa" */

  console.log("members", members);
  console.log("privateMemberMsg", privateMemberMsg);
  console.log("messagesmessages", messages);

  /* 
  let latestTime = latestMessage[0];
  for (let i = 1; i < latestMessage.length; i++) {
    // so sánh giá trị thời gian hiện tại với giá trị lớn nhất đã tìm thấy
    if (latestMessage[i] > latestTime) {
      latestTime = latestMessage[i]; // cập nhật giá trị lớn nhất
    }
  }

  console.log(`Giờ gần nhất: ${latestTime}`); */

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

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

  if (!user) {
    return <></>;
  }
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
                className={`${
                  privateMemberMsg?._id === member?._id
                    ? "bg-white text-gray-700"
                    : "  bg-gray-50  text-gray-500 "
                } group border border-gray-100 h-[80px]  flex items-center justify-between px-4 py-2 
                  
                  `}
              >
                <div className="flex gap-2 w-full">
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

                  <div className="w-full">
                    {/* <div className="text-lg font-semibold">
                  {member.name}
                  {member._id === user?._id}
                  {member.status == "offline" && " (Offline)"}
                </div> */}

                    {/* ẩn tài khoản của mình  */}
                    <div className="text-lg font-semibold items-start">
                      <div
                        className={
                          user && user._id === member._id
                            ? " opacity-0 hidden !important"
                            : " text-base font-mediu items-start justify-start text-left"
                        }
                      >
                        {member.name}
                        {privateMemberMsg._id + "-" + member._id === result && (
                          <div>
                            {result._recentMessage.content}
                          </div>
                        )}
                        {member.status === "offline" && " (Offline)"}
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
