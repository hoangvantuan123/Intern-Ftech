import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import './MessageForm.css'
function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }
  return (
    <>
      <div className="w-full flex flex-col justify-between">
        <div>
          {user && !privateMemberMsg?._id && <div className=" relative flex items-center space-x-4 border border-gray-100 alert alert-info">You are in the {currentRoom} room</div>}
          {user && privateMemberMsg?._id && (
            <>
              <div className="relative flex h-full p-2 border border-gray-100 items-center space-x-4 ">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" class="w-5 sm:w-16 h-5 sm:h-16 rounded-full" />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">{privateMemberMsg.name}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div id="messages" className="flex  h-[400px] flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {!user && <div className="">Please login</div>}
          {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
              <div key={idx}>
                <p className="">{date}</p>
                {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                  <div className={sender?.email == user?.email ? "message" : "flex justify-start "} key={msgIdx}>
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div className={sender?.email == user?.email ? "flex items-end gap-1 mb-2 " : "flex items-end gap-1 mb-2 flex-row-reverse"}>
                          <div className={sender?.email == user?.email ? " px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white" : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 "}>
                            {/*  <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} /> */}
                            {/* Trong trường hợp trong nhóm chat thì để tên người chatchat */}
                            {/*  <p className="">{sender._id == user?._id ? "You" : sender.name}</p> */}
                            <p className="">{content}</p>
                            <p className="">{time}</p>
                          </div>
                          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="My profile" className="w-6 h-6 rounded-full order-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="border-t-2 border-gray-200 pt-4 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                </button>
              </span>
              <input type="text" placeholder="Write your message!"
                disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
                <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <button
                  variant="primary" type="submit" disabled={!user}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>

    </>
  );
}

export default MessageForm;
