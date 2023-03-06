import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, addBlog, editBlog, deleteBlog } from '../../slices/postSlices';


export default function Post() {
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch])
    const handleAddClick = () => {
        dispatch(
            addBlog({
                title: 'New blog',
                content: "Lorem lorem lorem lore ",
                catefory: "#NewBlog"
            })
        )
    }
    const handleEditClick = (id, title, content, catefory) => {
        dispatch(editBlog({ id, title, content, catefory }));
    }

    const handleDeleteClick = (id) => {
        dispatch(deleteBlog(id));
    }
    console.log('blogs', posts);
    return (
        <div>
            <h2>Create a New Post</h2>
            <button onClick={handleAddClick}> add blog </button>
            <ul>
                <li>
                   
                  
                </li>
            </ul>
        </div>
    )
}
