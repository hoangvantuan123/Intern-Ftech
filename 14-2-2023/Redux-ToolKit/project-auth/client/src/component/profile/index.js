import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import PostsList from '../post/postsList';
import NavBar from '../navbar';
import {fetchImages} from '../../slices/imageSlices'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',  // Đảm bảo các column hiển thị trên cùng một dòng
        height: 224,
        alignItems: 'flex-start',  // Các column hiển thị theo chiều dọc trên cùng một vị trí
        justifyContent: 'flex-start',  // các column đặt ở bên trái
    }

}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function Profile() {
    const dispatch = useDispatch();
    const classes = useStyles();
    /*    const dispatch = useDispatch(); */
    const auth = useSelector((state) => state.auth);
    //  console.log('me', auth);
    /*  log out */

    /*   const logOutClick = () => {
          dispatch(logOutUser(null))
      } */
    const images = useSelector((state) => state.images);
    console.log('images', images);
    /*  Tabs  */
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch])
    return (
        <div>
            <NavBar />
            <div className='h-full'>
                <div className="h-[300px] bg-gradient-to-r from-purple-500 to-pink-500  py-3 text-white mx-auto flex  items-center justify-between p-4 max-w-screen-2xl ">
                    <Avatar
                        sx={{ bgcolor: deepOrange[500], width: 120, height: 120, fontSize: 40, marginTop: 35 }}
                        className="border-double  border-2 border-white"
                    >
                        T
                    </Avatar>
                </div>
                <section className=" mx-auto justify-between pb-5 max-w-screen-2xl relative flex flex-wrap h-screen lg:items-center  mt-20">
                    <div className="relative  w-full  h-full lg:w-[30%] p-2">
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



                                            <Tabs
                                                orientation="vertical"
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="Vertical tabs example"
                                                className={classes.tabs}
                                                TabIndicatorProps={{ style: { display: 'none' } }} // Xóa vị trí của TabIndicator
                                            >

                                                <Tab
                                                    className="block rounded-lg p-2 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                    label={
                                                        <span style={{ display: "inline-block", textAlign: "left", width: "100%" }} className="hover:text-gray-700">
                                                            Blog
                                                        </span>
                                                    }
                                                    {...a11yProps(0)}
                                                />
                                                <Tab
                                                    label={
                                                        <span style={{ display: "inline-block", textAlign: "left", width: "100%" }}>
                                                            Item Two
                                                        </span>
                                                    }
                                                    {...a11yProps(1)}
                                                />

                                            </Tabs>

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
                    <div className='relative  w-full sm:h-96 lg:h-full  lg:w-[65%] p-2'>
                        <TabPanel value={value} index={0} >
                            <PostsList />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                    </div>
                </section>
            </div>
        </div>
    )
}
