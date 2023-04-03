import React, { useState } from "react";
import CustomizedProfile from "./styledProFile";
import { useLocation } from "react-router-dom";
import PostListPage from "../post";

export default function Form_side_barout() {
  const [isOpen, setIsOpen] = useState(false);
  // Lấy thông tin về đường dẫn hiện tại từ hook useLocation
  const location = useLocation();

  // Xác định form nào nên được hiển thị dựa trên đường dẫn hiện tại

  return (
    <div className=" text-left">
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 "
        aria-label="Sidebar"
      >
        <div className=" h-screen flex-col ">
          <div className=" ">
            <CustomizedProfile />
          </div>
          <div className="p-4">
            <nav aria-label="Main Nav" className="flex flex-col space-y-2">
              <div>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      href="/"
                      className="flex items-center gap-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span className="text-sm font-medium"> Home </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="flex items-center gap-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2 "
                    >
                      <svg
                        className="h-5 w-5 opacity-75"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 17V7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="text-sm font-medium"> Blog </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/chat"
                      className="flex items-center gap-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700  px-4 py-2 "
                    >
                      <svg
                        className="h-5 w-5 opacity-75"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clirule="evenodd"
                          d="M12 3C7.85113 3 4 5.73396 4 10C4 11.5704 4.38842 12.7289 5.08252 13.6554C5.79003 14.5998 6.87746 15.3863 8.41627 16.0908L9.2326 16.4645L8.94868 17.3162C8.54129 18.5384 7.84997 19.6611 7.15156 20.5844C9.56467 19.8263 12.7167 18.6537 14.9453 17.1679C17.1551 15.6948 18.3969 14.5353 19.0991 13.455C19.7758 12.4139 20 11.371 20 10C20 5.73396 16.1489 3 12 3ZM2 10C2 4.26604 7.14887 1 12 1C16.8511 1 22 4.26604 22 10C22 11.629 21.7242 13.0861 20.7759 14.545C19.8531 15.9647 18.3449 17.3052 16.0547 18.8321C13.0781 20.8164 8.76589 22.2232 6.29772 22.9281C5.48665 23.1597 4.84055 22.6838 4.56243 22.1881C4.28848 21.6998 4.22087 20.9454 4.74413 20.3614C5.44439 19.5798 6.21203 18.5732 6.72616 17.4871C5.40034 16.7841 4.29326 15.9376 3.48189 14.8545C2.48785 13.5277 2 11.9296 2 10Z"
                          fill="#0F0F0F"
                        />
                        <path
                          d="M9 10C9 10.8284 8.32843 11.5 7.5 11.5C6.67157 11.5 6 10.8284 6 10C6 9.17157 6.67157 8.5 7.5 8.5C8.32843 8.5 9 9.17157 9 10Z"
                          fill="#0F0F0F"
                        />
                        <path
                          d="M13.4976 10C13.4976 10.8284 12.826 11.5 11.9976 11.5C11.1692 11.5 10.4976 10.8284 10.4976 10C10.4976 9.17157 11.1692 8.5 11.9976 8.5C12.826 8.5 13.4976 9.17157 13.4976 10Z"
                          fill="#0F0F0F"
                        />
                        <path
                          d="M16.5 11.5C17.3284 11.5 18 10.8284 18 10C18 9.17157 17.3284 8.5 16.5 8.5C15.6716 8.5 15 9.17157 15 10C15 10.8284 15.6716 11.5 16.5 11.5Z"
                          fill="#0F0F0F"
                        />
                      </svg>
                      <span className="text-sm font-medium"> Chat </span>
                    </a>
                  </li>

                  <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg
                            className="h-5 w-5 opacity-75"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 19V18C3 15.7909 4.79086 14 7 14H11C13.2091 14 15 15.7909 15 18V19M15 11C16.6569 11 18 9.65685 18 8C18 6.34315 16.6569 5 15 5M21 19V18C21 15.7909 19.2091 14 17 14H16.5M12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8Z"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <span className="text-sm font-medium text-gray-500">
                            {" "}
                            Teams{" "}
                          </span>
                        </div>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>

                      <nav
                        aria-label="Teams Nav"
                        className="mt-2 flex flex-col px-4"
                      >
                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>

                          <span className="text-sm font-medium">
                            {" "}
                            Banned Users{" "}
                          </span>
                        </a>

                        <a
                          href="#"
                          className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>

                          <span className="text-sm font-medium">
                            {" "}
                            Calendar{" "}
                          </span>
                        </a>
                      </nav>
                    </details>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Projects
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Meetings
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <strong className="block text-xs font-medium uppercase text-gray-400">
                  Support
                </strong>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Update
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Help
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <strong className="block text-xs font-medium uppercase text-gray-400">
                  Profile
                </strong>

                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Subscription
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </aside>
      <div className=" sm:ml-64">
        <nav className="fixed top-0 left-0 right-0  z-10 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:ml-64">
          <div className=" py-2 lg:px-5 lg:pl-3">
            <div className="d-none lg:block mx-auto  ">
              <div className=" w-full  m-auto flex items-center justify-between gap-4 ">
                <div className="flex gap-4 ">
                  <nav aria-label="Breadcrumb">
                    <ol
                      role="list"
                      className="flex items-center gap-4 text-sm text-gray-600"
                    >
                      <li>
                        <svg
                          className="h-5 w-5 opacity-75"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                            fill="#0F0F0F"
                          />
                        </svg>
                      </li>
                      <li>
                        <svg
                          className="h-5 w-5 opacity-75"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                            fill="#0F0F0F"
                          />
                        </svg>
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="relative hidden sm:block">
                  <label className="sr-only"> Search </label>
                  <input
                    className="h-10 w-full rounded-lg border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
                    id="search"
                    type="search"
                    placeholder="Search"
                  />

                  <button
                    type="button"
                    className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center ">
              <div className="">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <svg
                    className={`fill-current h-6 w-6 ${
                      isOpen ? "hidden" : "block"
                    }`}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>

                  <svg
                    className={`fill-current h-6 w-6 ${
                      isOpen ? "block" : "hidden"
                    }`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`w-full block flex-grow  lg:hidden ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="text-sm lg:flex-grow">
                <div className="flex h-screen flex-col ">
                  <div className=" ">
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                    >
                      <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-xs">
                          <strong className="block font-medium">
                            Eric Frusciante
                          </strong>

                          <span> eric@frusciante.com </span>
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="p-4">
                    <nav
                      aria-label="Main Nav"
                      className="flex flex-col space-y-2"
                    >
                      <div>
                        <strong className="block text-xs font-medium uppercase text-gray-400">
                          General
                        </strong>
                        <ul className="mt-2 space-y-1">
                          <li>
                            <a
                              href="#"
                              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                {" "}
                                General{" "}
                              </span>
                            </a>
                          </li>
                          <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <div className="flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>

                                  <span className="text-sm font-medium">
                                    {" "}
                                    Teams{" "}
                                  </span>
                                </div>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </summary>

                              <nav
                                aria-label="Teams Nav"
                                className="mt-2 flex flex-col px-4"
                              >
                                <a
                                  href="#"
                                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                    />
                                  </svg>

                                  <span className="text-sm font-medium">
                                    {" "}
                                    Banned Users{" "}
                                  </span>
                                </a>

                                <a
                                  href="#"
                                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 opacity-75"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>

                                  <span className="text-sm font-medium">
                                    {" "}
                                    Calendar{" "}
                                  </span>
                                </a>
                              </nav>
                            </details>
                          </li>
                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Team
                            </a>
                          </li>

                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Projects
                            </a>
                          </li>

                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Meetings
                            </a>
                          </li>

                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Calendar
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-xs font-medium uppercase text-gray-400">
                          Support
                        </strong>
                        <ul className="mt-2 space-y-1">
                          <li>
                            <a
                              href="#"
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Update
                            </a>
                          </li>

                          <li>
                            <a
                              href="#"
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Help
                            </a>
                          </li>

                          <li>
                            <a
                              href="#"
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Settings
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <strong className="block text-xs font-medium uppercase text-gray-400">
                          Profile
                        </strong>

                        <ul className="mt-2 space-y-1">
                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Details
                            </a>
                          </li>

                          <li>
                            <a
                              href=""
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                              Subscription
                            </a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section>
          <div className="container sm:pt-[57px] m-auto"></div>
          {/* Hiển thị thông tin các form ở đây  */}
          {/* <div className="container px-4 py-16 sm:px-6 lg:px-8 m-auto">
           
          </div> */}
        </section>
      </div>
    </div>
  );
}
