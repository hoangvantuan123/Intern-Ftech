import React, { useContext, useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
//import { addNotifications, resetNotifications } from "../../slices/userSlices";
import { addNotifications, resetNotifications } from "../../slices/authSlices";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

  console.log(user);
  const [selectedButton, setSelectedButton] = React.useState(null);

  const handleClick = (index) => {
    setSelectedButton(index);
  };
  const dispatch = useDispatch();
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
  } = useContext(AppContext);
  console.log("members", members);
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
