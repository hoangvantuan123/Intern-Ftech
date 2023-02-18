import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../slices/authSlices';
import imageBg from '../file/image/x.png'
export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth);
    useEffect(() => {
        if (auth._id) {
            navigate("/")
        }
    }, [auth._id, navigate])

    const [user, setUser] = useState(
        {
            name: "",
            email: " ",
            password: ""
        }
    );
    console.log('Test ', user);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        dispatch(registerUser(user));
    };
    return (
        <div>
            {/*      <section className="h-screen" >
                <div className="px-6 h-full text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onSubmit={handleSubmit} >
                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">Đăng ký tài khoản</p>
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Name"
                                        onChange={(e) => setUser({
                                            ...user,
                                            name: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email "
                                        onChange={(e) => setUser({
                                            ...user,
                                            email: e.target.value
                                        })}
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        onChange={(e) => setUser({
                                            ...user,
                                            password: e.target.value
                                        })}
                                    />
                                </div>
                               
                                <button
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    {auth.registerStatus === "pending" ? "SUBMITTING" : "REGISTER"}
                                </button>
                                <div>
                                    <p className='text-sm font-semibold mt-2 pt-1 mb-0 text-red-600'>{auth.registerError}</p>
                                </div>
                                <div className="text-center lg:text-left">

                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Bạn đã có tài khoản?
                                        <a
                                            href="/login"
                                            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}
            <div>
                <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                    <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/3">
                        <img
                            alt="Welcome"
                            src={imageBg}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-full px-4  py-5 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-0">
                        <div className="mx-auto max-w-md  text-left">
                            <h1 className="text-2xl font-bold sm:text-3xl">Hey, hello  👋</h1>

                            <p className="mt-3 text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4"   >

                            <div className="mb-6">
                                <input
                                    type="text"
                                    name='name'
                                    className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Name"
                                    onChange={(e) => setUser({
                                        ...user,
                                        name: e.target.value
                                    })}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email "
                                    onChange={(e) => setUser({
                                        ...user,
                                        email: e.target.value
                                    })}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    name='password'
                                    className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    onChange={(e) => setUser({
                                        ...user,
                                        password: e.target.value
                                    })}
                                />
                            </div>

                            <button
                                className="block w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                {auth.registerStatus === "pending" ? "SUBMITTING" : "REGISTER"}
                            </button>
                            <p className='text-sm font-semibold mt-2 pt-1 mb-0 text-red-600'>{auth.registerError}</p>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 text-gray-500">or</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Bạn đã có tài khoản?
                                    <a
                                        href="/login"
                                        className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100"
                                    ><span className=''> Login</span></a>
                                </p>
                            </div>
                        </form>
                    </div>


                </section>

            </div>
        </div>
    )
}
