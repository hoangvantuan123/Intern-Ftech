import * as React from "react";

import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Box, Link } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../slices/authSlices";
import { useNavigate } from "react-router-dom";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0),
    minWidth: 250,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedProfile() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutOnclick = () => {
    dispatch(logOutUser(null));
    navigate("/login"); // Chuyển đến trang đăng ký sau khi đăng xuất
    handleClose();
  };
  return (
    <div>
      {auth._id ? (
        <>
          {" "}
          <div
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableelevation="true"
            onClick={handleClick}
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 cursor-pointer"
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{auth.name}</strong>
                <span> {auth.email}</span>
              </p>
            </div>
          </div>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {auth._id ? (
              <>
                {" "}
                <Box>
                  <Link
                    href={`/${auth.name}`}
                    sx={{ color: "#263238" }}
                    underline="none"
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link
                    href="/setting"
                    sx={{ color: "#263238" }}
                    underline="none"
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      Setting
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={logOutOnclick} disableRipple>
                    <form method="POST" action="#">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg  text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"

                      >
                        <LogoutRoundedIcon />
                        Sign Out
                      </button>
                    </form>
                  </MenuItem>
                </Box>
              </>
            ) : null}
          </StyledMenu>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}
