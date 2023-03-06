import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchBlogs, addBlog, editBlog, deleteBlog, updateBlog } from '../../slices/postSlices';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default function Post() {
    const post = useSelector((state) => state.post);
    console.log('post', post);
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch])


    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = {
            title,
            content
        };
        dispatch(addBlog(newBlog));
        setShowForm(false);
        setTitle('');
        setContent('')
        history.push('/about');

    }
    
    const handleClick = () => {
        history.push('/about');
      };

    return (
        <div>
            <h2>Create a New Post</h2>
            <ul>
                 {post.map((blog) => (
                    <li key={blog.id}>
                        <span>
                            {blog.title}
                        </span>

                    </li>
                ))}
                

            </ul >


            <button onClick={() => setShowForm(true)} className="block w-[300px] rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">Add Blog</button>
            {showForm && (
                <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                    <label> Content: <textarea value={content} onChange={(e) => setContent(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                    <button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">add </button>
                    <button type="button" onClick={() => setShowForm(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Cancel </button>
                </form>)}

          

        </div >
    )
}
