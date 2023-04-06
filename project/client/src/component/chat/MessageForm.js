import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import "./MessageForm.css";
import HeartButton from "./HeartButton";
import DrawerInfo from "./DrawerInfo";
function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  // console.log('messages',messages)

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClick = () => {
    setShowForm(!showForm);
  };

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
      <div className="w-full  h-screen border border-gray-100 flex flex-col justify-between p-5">
        <div>
          {user && !privateMemberMsg?._id && (
            <div className=" relative flex items-center justify-center rounded-lg h-full p-2 space-x-4 border border-gray-100 alert alert-info">
              You are in the {currentRoom} room
            </div>
          )}
          {user && privateMemberMsg?._id && (
            <>
              <div className="relative flex justify-between h-full p-2 border rounded-lg border-gray-100 items-center space-x-4 ">
                <div className="flex gap-4 ">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt=""
                      class="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col leading-tight items-center">
                    <p className="hidden text-left text-sm sm:block">
                      <strong className="block font-medium">
                        {privateMemberMsg.name}
                      </strong>
                      <span className="text-gray-500">
                        {" "}
                        {privateMemberMsg.email}
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" flex items-center gap-4">
                  <div>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.48877 6.00387C2.76311 7.24787 2.52428 8.97403 2.97014 10.7575C3.13059 11.3992 3.59703 12.2243 4.33627 13.174C5.06116 14.1052 5.9864 15.0787 6.96636 16.0127C8.90945 17.8648 11.0006 19.4985 12 20.254C12.9994 19.4985 15.0905 17.8648 17.0336 16.0127C18.0136 15.0787 18.9388 14.1052 19.6637 13.174C20.403 12.2243 20.8694 11.3992 21.0299 10.7575C21.4757 8.97403 21.2369 7.24788 20.5112 6.00387C19.8029 4.78965 18.6202 4 17 4C15.5904 4 14.5969 5.04228 13.8944 6.44721C13.5569 7.12228 13.3275 7.80745 13.1823 8.33015C13.1102 8.58959 13.0602 8.80435 13.0286 8.95172C12.9167 9.47392 12.3143 9.5 12 9.5C11.6857 9.5 11.0823 9.46905 10.9714 8.95172C10.9398 8.80436 10.8898 8.58959 10.8177 8.33015C10.6725 7.80745 10.4431 7.12229 10.1056 6.44722C9.40308 5.04228 8.40956 4 6.99998 4C5.37979 4 4.19706 4.78965 3.48877 6.00387ZM12 5.77011C12.0341 5.69784 12.0693 5.62535 12.1056 5.55279C12.9031 3.95772 14.4096 2 17 2C19.3798 2 21.1971 3.21035 22.2388 4.99613C23.2631 6.75212 23.5243 9.02597 22.9701 11.2425C22.7076 12.2927 22.0354 13.3832 21.2419 14.4025C20.4341 15.4402 19.4327 16.4891 18.4135 17.4605C16.3742 19.4042 14.1957 21.1022 13.181 21.8683C12.4803 22.3974 11.5197 22.3974 10.819 21.8683C9.80433 21.1022 7.62583 19.4042 5.58648 17.4605C4.56733 16.4891 3.56586 15.4402 2.75806 14.4025C1.96461 13.3832 1.2924 12.2927 1.02986 11.2425C0.475714 9.02597 0.736884 6.75213 1.76121 4.99613C2.80291 3.21035 4.62017 2 6.99998 2C9.59038 2 11.0969 3.95772 11.8944 5.55278C11.9307 5.62535 11.9659 5.69784 12 5.77011Z" fill="#0F0F0F" />
                    </svg>
                  </div>
                  <div>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 6.5C17 9.53757 14.7614 12 12 12C9.23858 12 7 9.53757 7 6.5C7 3.46243 9.23858 1 12 1C14.7614 1 17 3.46243 17 6.5ZM9 6.5C9 8.32254 10.3431 9.8 12 9.8C13.6569 9.8 15 8.32254 15 6.5C15 4.67746 13.6569 3.2 12 3.2C10.3431 3.2 9 4.67746 9 6.5Z" fill="#0F0F0F" />
                      <path d="M11.6759 14.9952C10.7868 14.9679 10.1945 14.8277 9.72609 14.6447C9.26355 14.464 8.89822 14.237 8.41685 13.9378C8.32296 13.8795 8.22448 13.8183 8.12019 13.7543C7.07587 13.1132 5.73464 13.2622 4.86415 14.1419C4.48443 14.5256 4.04036 15.0219 3.6849 15.5626C3.34603 16.0781 3 16.7638 3 17.5V20.0003C3 21.6574 4.34334 23 6 23H13.101C12.5151 22.4259 12.0297 21.7496 11.6736 21H6C5.44752 21 5 20.5524 5 20.0003V17.5C5 17.3549 5.08549 17.073 5.35613 16.6613C5.61017 16.2748 5.95358 15.8844 6.28579 15.5487C6.49412 15.3381 6.81106 15.2974 7.07389 15.4588C7.15661 15.5095 7.24087 15.5621 7.32694 15.6159C7.80938 15.9171 8.34918 16.254 8.99836 16.5076C9.58761 16.7378 10.2519 16.8974 11.0761 16.9645C11.1791 16.2695 11.3843 15.6078 11.6759 14.9952Z" fill="#0F0F0F" />
                      <path d="M17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16V17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V19H16C15.4477 19 15 18.5523 15 18C15 17.4477 15.4477 17 16 17H17V16Z" fill="#0F0F0F" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18ZM13.9819 18C13.9819 20.2191 15.7809 22.0181 18 22.0181C20.2191 22.0181 22.0181 20.2191 22.0181 18C22.0181 15.7809 20.2191 13.9819 18 13.9819C15.7809 13.9819 13.9819 15.7809 13.9819 18Z" fill="#0F0F0F" />
                    </svg>

                  </div>
                  <div className=" cursor-pointer">

                    <DrawerInfo />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          id="messages"
          className="flex  h-full flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {!user && <div className="">Please login</div>}
          {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
              <div key={idx}>
                <p className="text-gray-600 text-xs italic">{date}</p>
                {messagesByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => (
                    <div
                      className={
                        sender?.email == user?.email
                          ? "message"
                          : "flex justify-start "
                      }
                      key={msgIdx}
                    >
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div
                            className={
                              sender?.email == user?.email
                                ? "flex items-end gap-1 mb-2 "
                                : "flex items-end gap-1 mb-2 flex-row-reverse"
                            }
                          >
                            <div
                              className={
                                sender?.email == user?.email
                                  ? " px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#6332FD] text-white"
                                  : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#F3F1F5] text-gray-600 "
                              }
                            >
                              {/*  <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%", marginRight: 10 }} /> */}
                              {/* Trong trường hợp trong nhóm chat thì để tên người chatchat */}
                              {/*  <p className="">{sender._id == user?._id ? "You" : sender.name}</p> */}
                              <p className="" onClick={handleClick}>
                                {content}
                              </p>
                            </div>

                            <img
                              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              alt="My profile"
                              className="w-6 h-6 rounded-full order-1"
                            />
                          </div>
                          {showForm && (
                            <form>
                              <p className="text-gray-600 text-xs italic">{time}</p>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="border-t-2 border-gray-50 pt-4 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    ></path>
                  </svg>
                </button>
              </span>
              <input
                type="text"
                placeholder="Write your message!"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-100 rounded-md py-3"
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
                <span
                  aria-hidden="true"
                  className="block h-6 w-px rounded-full bg-gray-200"
                ></span>
                <button
                  variant="primary"
                  type="submit"
                  disabled={!user}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-[#6332FD]  focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
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
