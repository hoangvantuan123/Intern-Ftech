import React, { useContext, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
export default function InfoSidebar() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  return (
    <div>
      <div className="  border border-gray-100   overflow-y-auto  px-5">
        <div>
          {user && !privateMemberMsg?._id && (
            <div className=" relative flex items-center space-x-4 border border-gray-100 alert alert-info">
              You are in the {currentRoom} room
            </div>
          )}
          {user && privateMemberMsg?._id && (
            <>
              <div className="relative flex  p-2 border border-gray-100 items-center space-x-4 ">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt=""
                    class="w-5 sm:w-16 h-5 sm:h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {privateMemberMsg.name}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
