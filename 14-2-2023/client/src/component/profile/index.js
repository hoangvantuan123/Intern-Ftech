import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux'
import { deepOrange, deepPurple } from '@mui/material/colors';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logOutUser } from '../../slices/authSlices';
import NavBar from '../navbar';
import Home from '../home';
export default function Profile() {
    /*    const dispatch = useDispatch(); */
    const auth = useSelector((state) => state.auth);
    console.log('me', auth);
    /*  log out */

    /*   const logOutClick = () => {
          dispatch(logOutUser(null))
      } */
    return (
        <div className=''>
            <div className="h-[300px] bg-gradient-to-r from-purple-500 to-pink-500  py-3 text-white mx-auto flex  items-center justify-between p-4 max-w-screen-2xl ">
                <Avatar
                    sx={{ bgcolor: deepOrange[500], width: 120, height: 120, fontSize: 40, marginTop: 35 }}
                    className="border-double  border-2 border-white"
                >
                    T
                </Avatar>
            </div>
            <section className="overflow-hidden mx-auto justify-between  max-w-screen-2xl relative flex flex-wrap lg:h-screen lg:items-center  mt-20">
                <div className="relative  w-full sm:h-96 lg:h-full lg:w-[35%] p-2">
                    <div className=" max-w-xl  sm:text-left">
                        <div
                            className="  rounded-md border border-gray-100 bg-white "
                            role="menu"
                        >
                            <div className="">
                                <div className=" divide-y divide-gray-100">
                                    <div className="p-2">
                                        <span
                                            className="block p-2 text-lg font-medium uppercase text-black"
                                        >
                                            {auth.name}
                                        </span>
                                        <span className="block pl-2 pb-4 text-[12px] font-medium  text-gray-700">
                                            {auth.email}
                                        </span>

                                        <a
                                            href="/#"
                                            className="block rounded-lg p-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Item
                                        </a>

                                        <a
                                            href="#"
                                            className="block rounded-lg p-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Item
                                        </a>

                                        <a
                                            href="#"
                                            className="block rounded-lg p-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Item
                                        </a>

                                        <a
                                            href="#"
                                            className="block rounded-lg p-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        > Item
                                        </a>
                                    </div>

                                    <div className="p-2">
                                        <strong
                                            className="block p-2 text-xs font-medium uppercase text-gray-400"
                                        >
                                            Item
                                        </strong>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative  w-full sm:h-96 lg:h-full lg:w-[60%] p-2'>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <a
                            className="block h-[300px] rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >

                        </a>

                        <a
                            className="block rounded-xl h-[300px] border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >

                        </a>

                        <a
                            className="block rounded-xl h-[300px] border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >


                        </a>

                        <a
                            className="block rounded-xl  h-[300px] border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >

                        </a>

                        <a
                            className="block rounded-xl h-[300px] border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >
                        </a>

                        <a
                            className="block rounded-xl h-[300px] border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/accountant"
                        >

                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
