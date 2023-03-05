import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Box, Link } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../slices/authSlices';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOutOnclick = () => {
        dispatch(logOutUser(null))
    }
    return (
        <div>
            <button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableelevation="true"
                onClick={handleClick}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/" sx={{ color: "#263238" }} underline="none">Home</Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/about" sx={{ color: "#263238" }} underline="none">About</Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/about" sx={{ color: "#263238" }} underline="none">Blog</Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <Link href="/about" sx={{ color: "#263238" }} underline="none">Pages</Link>
                </MenuItem>
                {
                    auth._id ? <>  <Box>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link href={`/${auth.name}`}  sx={{ color: "#263238" }} underline="none">Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <Link href="/setting" sx={{ color: "#263238" }} underline="none">Setting</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <form method="POST" action="#">
                                <button
                                    type="submit"
                                    className="flex w-full items-center gap-2 rounded-lg  text-sm text-red-700 hover:bg-red-50"
                                    role="menuitem"
                                    onClick={logOutOnclick}
                                >
                                    <LogoutRoundedIcon />
                                    Sign Out
                                </button>
                            </form>
                        </MenuItem>
                    </Box></> : null
                }

            </StyledMenu>
        </div>
    )
}
