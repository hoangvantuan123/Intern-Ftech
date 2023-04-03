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
  const [comparearr, setComparearr] = useState([])
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

  // console.log("[[]]", message);
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
    return { to: `${user._id}-${item._id}` };
  });
  console.log("combinedIdsth1", combinedIdsth1);
  //th2
  const combinedIdsth2 = members.map((item) => {
    return { to: `${item._id}-${user._id}` };
  });
  console.log("combinedIdsth2", combinedIdsth2);

  // gộp tất cả đoạn chat có cùng nhóm chat vao với nhau
  const result = message.reduce((acc, message) => {
    /* key cho object `acc` */
    const to = message.to;
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

  const resultArray = Object.values(result);
  console.log('arry', resultArray);

  const toCompareresult = resultArray.map(item => {
    // Thêm thuộc tính recentMessage vào đối tượng được trả về của hàm map()
    return {
      to: item.to,
      recentMessage: item._recentMessage
    };
  });
  console.log("toCompareresult", toCompareresult)
  const toCompareArr1 = combinedIdsth1.map(item => item.to);
  console.log('toCompareArr1', toCompareArr1)
  const toCompareArr2 = combinedIdsth2.map(item => item.to);
  console.log('toCompareArr2', toCompareArr2)

  useEffect(() => {
    const tempSet = new Set();
    for (let i = 0; i < toCompareArr1.length; i++) {
      for (let j = 0; j < toCompareArr2.length; j++) {
        if (toCompareArr1[i] || toCompareArr2[j] === toCompareresult.includes(toCompareArr1[i])) {
          tempSet.add(toCompareArr1[i]);
          console.log('toCompare123', toCompareArr1[i]);
        }
      }
    }
    setComparearr(Array.from(tempSet));
  }, [toCompareArr1, toCompareArr2, toCompareresult]);

  console.log("comparearr: ", comparearr);
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
  console.log("members", members);
  console.log("privateMemberMsg", privateMemberMsg);
  console.log("messagesmessages", messages);

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

  /* socket.off("new-user").on("new-user", (payload) => {
    // tạo chuỗi mới bằng cách nối chuỗi _id của payload với auth._id
    let authId = auth._id;
    const updatedPayload = payload.map(obj => ({
      ...obj, // giữ nguyên tất cả thuộc tính khác của đối tượng
      newId_to_1: obj._id + "-" + authId, // thêm thuộc tính newId mới
      newId_to_2: authId + "-" + obj._id // thêm thuộc tính newId mới
    }));

    // sử dụng updatedPayload để cập nhật state
    setMembers(updatedPayload);
  }); */
  socket.off("new-user").on("new-user", (payload) => {
    const authId = auth._id;
    let newId_to_1 = "";
    let newId_to_2 = "";
    const updatedPayload = payload.map(obj => {
      newId_to_1 = obj._id + "-" + authId;
      newId_to_2 = authId + "-" + obj._id;
      const tempArray = toCompareresult.filter(item => item.to === newId_to_1 || item.to === newId_to_2);
      return {
        ...obj,
        newId_to_1,
        newId_to_2,
        updatedArray: tempArray.concat(),
      };
    });
    setMembers(updatedPayload);
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
                className={`${privateMemberMsg?._id === member?._id
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
                        {/* {comparearr.includes(user._id + '-' + member._id) && (
                          <>
                            <h1> online hien</h1>
                          </>
                        )} */}
                        {
                          (user._id + '-' + member._id) === resultArray.to && (
                            <>
                              <h1> online hien</h1>
                            </>
                          )
                        }
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
