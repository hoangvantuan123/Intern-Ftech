import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../slices/authSlices';
import imageBg from '../file/image/x.png'
import NavBar from '../navbar';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (auth._id) {
            navigate(`/${auth.name}`)
        }
    }, [auth._id, navigate]);
    const [user, setUser] = useState(
        {
            email: " ",
            password: ""
        }
    );
    //console.log('Test ', user);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        dispatch(loginUser(user));
    };
    return (
        <div>

            <div>
                <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                    <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/3">
                        <img
                            alt="Welcome"
                            src={imageBg}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-full px-4  py-5 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-20">
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
                                    className="form-control block w-full px-4 py-2   text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                                {auth.loginStatus === "pending" ? "SUBMITTING" : "Sign In"}
                            </button>
                            <p className='text-sm font-semibold mt-2 pt-1 mb-0 text-red-600'>{auth.loginError}</p>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0 text-gray-500">or</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Not a member?
                                    <a
                                        href="/register"
                                        className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100"
                                    ><span className=''> Register</span></a>
                                </p>
                            </div>
                        </form>
                    </div>
                </section>

            </div>

        </div>
    )
}
