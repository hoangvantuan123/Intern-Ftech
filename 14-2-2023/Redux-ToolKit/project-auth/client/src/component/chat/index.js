import React from "react";
/* import { Container, Row, Col } from "react-bootstrap"; */
import Sidebar from "../chat/Sidebar";
import MessageForm from "../chat/MessageForm";
import NavBar from "../navbar";
import InfoSidebar from "./infoSidebar";

export default function ChatBox() {
  return (
    <div>
      <div className=" container mx-auto  mt-5 h-full">
    {/*     <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
          <div className="w-1/2">
            <div className="flex items-center sm:justify-between sm:gap-4 w-full">
              <div className="relative hidden sm:block">
                <label className="sr-only" for="search"> Search </label>
                <input
                  className="h-10 min-w-full rounded-lg border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                  id="search"
                  type="search"
                  placeholder="Search website..."
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            RA
          </div>
        </div> */}
        <div className="flex flex-row justify-between bg-white rounded-lg shadow-lg">
          <Sidebar />
          <MessageForm />
          <InfoSidebar/>
        </div>
      </div>
    </div>
  );
}
