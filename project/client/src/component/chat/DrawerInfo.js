import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InfoSidebar from './infoSidebar';

export default function DrawerInfo() {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450, padding: 2 }}
            role="presentation"

            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <InfoSidebar />
        </Box>
    );
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div onClick={toggleDrawer(anchor, true)}> <svg className="h-5 w-5  cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20C9 18.3431 10.3431 17 12 17C13.6569 17 15 18.3431 15 20ZM10.9719 20C10.9719 20.5678 11.4322 21.0281 12 21.0281C12.5678 21.0281 13.0281 20.5678 13.0281 20C13.0281 19.4322 12.5678 18.9719 12 18.9719C11.4322 18.9719 10.9719 19.4322 10.9719 20Z" fill="#0F0F0F" />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM10.9719 12C10.9719 12.5678 11.4322 13.0281 12 13.0281C12.5678 13.0281 13.0281 12.5678 13.0281 12C13.0281 11.4322 12.5678 10.9719 12 10.9719C11.4322 10.9719 10.9719 11.4322 10.9719 12Z" fill="#0F0F0F" />
                        <path d="M15 4C15 5.65685 13.6569 7 12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4ZM10.9719 4C10.9719 4.56779 11.4322 5.02808 12 5.02808C12.5678 5.02808 13.0281 4.56779 13.0281 4C13.0281 3.43221 12.5678 2.97192 12 2.97192C11.4322 2.97192 10.9719 3.43221 10.9719 4Z" fill="#0F0F0F" />
                    </svg></div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        sx={{
                            borderRadius: 40,
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}
