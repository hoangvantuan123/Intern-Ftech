import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import './style.css'
export default function InfoSidebar() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  return (
    <div>
      <div className=" ">
        <div>
          {user && !privateMemberMsg?._id && (
            <div className=" relative flex items-center space-x-4 border border-gray-100 alert alert-info">
              You are in the {currentRoom} room
            </div>
          )}
          {user && privateMemberMsg?._id && (
            <>
              <div className="flex flex-col  items-center  hide-scrollbar overflow-y-scroll">
                <div className="relative flex flex-col hide-scrollbar overflow-y-scroll items-center rounded-[20px] w-[400px] mx-auto bg-white  shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                  <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                    <img
                      src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                      className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                    />
                    <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                      <img
                        className="h-full w-full rounded-full"
                        src={
                          privateMemberMsg.picture ||
                          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        } alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-16 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                      {privateMemberMsg.name}
                    </h4>
                    <p className="text-base font-normal text-gray-600">{privateMemberMsg.email}</p>
                  </div>
                  <div className="mt-6 mb-3 flex gap-14 md:!gap-14">

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
