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
  console.log('members', members)
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
      <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto ">
        {members.map((member, index) => (
          <div
            key={member.id}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id == member?._id}

          >
            {member._id !== user?._id && (
              <div /* className="group border border-gray-100 h-[100px] m-2 flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
               */
                onClick={() => {
                  handlePrivateMemberMsg(member);
                  setSelectedButton(index);
                }}
                className={`${privateMemberMsg?._id === member?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-gray-700"
                  } flex-1 rounded-md mx-2 py-2 text-center font-medium uppercase tracking-widest`}
              >
                <div className="flex  gap-2">
                  <div className="w-full">
                    <img src={member.picture || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"} className="w-10 h-10 rounded-full order-1 mb-3" />
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
                    <div className="text-lg font-semibold">
                      <div className={user && user._id === member._id ? " opacity-0 hidden !important" : " text-base font-medium"}>
                        {member.name}
                        {member.status === "offline" && " (Offline)"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="badge rounded-pill bg-primary">
                      {user.newMessages && user.newMessages[orderIds(member._id, user._id)] ? user.newMessages[orderIds(member._id, user._id)] : ''}
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
