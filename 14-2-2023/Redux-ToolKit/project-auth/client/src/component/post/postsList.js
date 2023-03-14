import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../../slices/postSlices';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PostsList() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [selectedPostId, setSelectedPostId] = useState(null);
    const token = localStorage.getItem('token');
    const { _id } = JSON.parse(atob(token.split('.')[1]));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const posts = useSelector((state) => {
        console.log(state); // check if state.posts exists
        return state.posts.filter((post) => post.author_id === _id);
    });
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    /*  const handleDelete = (postId) => {
         dispatch(deletePost(postId)); // gọi action deletePost để xóa bài viết
         setAnchorEl(null);
     }; */
    const handleDelete = (postId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            dispatch(deletePost(postId)).then(() => {
                dispatch(fetchPosts());
                alert('Post successfully deleted');
            }).catch((error) => {
                alert(`Error deleting post: ${error.message}`);
            });
        }
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    if (!posts || !Array.isArray(posts)) {
        return <div>Loading...</div>;
    }
    return (
        <div className='max-w-screen-xl px-4  sm:px-6 lg:px-8 m-auto'>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 " >
                {posts.map(post => (
                    <article key={post._id} className="block  rounded-xl border border-gray-100  shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring" >
                        <Menu as="div" className="relative flex justify-end">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 border-0 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
                                    <MoreHorizRoundedIcon />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            <a href={`/posts/${post.slug}`}>
                                                <MenuItem className=' text-left' >
                                                    <ListItemIcon>
                                                        <VisibilityRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Xem bài viết</ListItemText>
                                                </MenuItem>
                                            </a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a href={`/edit/posts/${post._id}`}>
                                                <MenuItem className=' text-left'>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Chỉnh sửa bài viết</ListItemText>
                                                </MenuItem>
                                            </a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <MenuItem onClick={() => handleDelete(post._id)} className=' text-left'>
                                                <ListItemIcon>
                                                    <DeleteOutlineRoundedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Xóa bài viết</ListItemText>
                                            </MenuItem>
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        < div className='p-2' >
                            <img
                                alt="Office"
                                // src={post.image_path}
                                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                className="h-56 w-full rounded-xl object-cover"
                            />

                            <div className=" text-left p-4 sm:p-6">
                                <a href="#">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {post.title}
                                    </h3>
                                </a>

                                <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                                    {post.description}
                                </p>
                                <span className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600'>
                                    {'# ' + post.category}
                                </span>
                                <br />

                            </div>
                        </div>


                    </article>
                ))
                }
            </div >
            <a href={`/${auth.name}/posts/new`}>
                <button className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100">Thêm mới bài viết</button>
            </a>

        </div >
    )
}
