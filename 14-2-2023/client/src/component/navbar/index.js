import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../slices/authSlices';
import { toast } from 'react-toastify'


export default function NavBar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  return (
    <div>
      <nav
        aria-label="Site Nav"
        className="mx-auto flex max-w-3xl items-center justify-between p-4"
      >
        <a
          href="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100"
        >
          <span className="sr-only">Logo</span>
          👋
        </a>

        <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <li className="hidden lg:block">
            <a className="rounded-lg px-3 py-2" href="/"> Home </a>
          </li>

          <li><a className="rounded-lg px-3 py-2" href="/about"> About </a></li>

          {/*    <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
            <a
              className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
              href="/login"
            >
              Log in
            </a>

            <a
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
              href="/register"
            >
              Sign up
            </a>
          </div>
 */}
          {
            auth._id ? <div onClick={() => {
              dispatch(logOutUser(null));
              toast.warning("Logged out!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }} className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 cursor-pointer">
              Logout
            </div> : <>
              <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
                <a
                  className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
                  href="/login"
                >
                  Log in
                </a>

                <a
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                  href="/register"
                >
                  Sign up
                </a>
              </div>
            </>
          }
        </ul>

      </nav>

    </div>
  )
}
