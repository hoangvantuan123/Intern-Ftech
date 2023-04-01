import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../slices/authSlices";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CustomizedProfile from "./styledProFile";

export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log('profile',auth)
  /* Theme */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  /*  log out */

  const logOutClick = () => {
    dispatch(logOutUser(null));
    window.location.href = `/`;
  };
  return (
    <div>
      <div>
        {auth._id ? (
          <Box>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              aria-describedby={id}
              onClick={handleClick}
              className=" cursor-pointer"
            >
              N
            </Avatar>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <div
                className="absolute right-0  z-10 mt-1 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="flow-root py-2">
                  <div className="my-2 divide-y divide-gray-100">
                    <div className="p-2">
                      <a
                        href={`/${auth.name}`}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Profile
                      </a>
                      <a
                        href="/about"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        Item 1
                      </a>

                      <a
                        href="/about"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Item 2
                      </a>

                      <a
                        href="/#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Item 3
                      </a>
                    </div>

                    <div className="p-2">
                      <form method="POST" action="#">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          role="menuitem"
                          onClick={logOutClick}
                        >
                          <LogoutRoundedIcon />
                          Sign Out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Popper>
          </Box>
        ) : (
          <>
            <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
              <a
                className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 "
                href="/login"
              >
                Sign in
              </a>
              <a
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
                href="/register"
              >
                Sign up
              </a>
            </div>
          </>
        )}
      </div>
      <div className="block md:hidden">
        {auth._id ? (
          <>
            <CustomizedProfile />
          </>
        ) : (
          <>
            <div className=" items-center flex gap-2">
              <div className=" flex-1 items-center justify-end sm:flex block md:hidden">
                <a
                  className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 "
                  href="/login"
                >
                  Sign in
                </a>
              </div>
              <CustomizedProfile />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
