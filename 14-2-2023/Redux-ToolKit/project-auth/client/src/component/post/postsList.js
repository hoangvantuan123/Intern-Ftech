import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost } from '../../slices/postSlices';

export default function PostsList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    const handleDelete = (postId) => {
        dispatch(deletePost(postId)); // gọi action deletePost để xóa bài viết
    };

    const navigate = useNavigate();
    const handleEditPost = (postId) => {
        navigate(`/api/posts/${postId}`);
    };

    const handleShowPost = (slug) => {
        navigate(`/posts/${slug}`)
    }
    const handleCancelEdit = () => {
        setSelectedPostId(null);
    };


    const handleAddPost = () => {
        navigate('/posts/new');
    };
    if (!posts || !Array.isArray(posts)) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 m-auto'>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3" >
                {posts.map(post => (
                    <li key={post._id} className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.category}</p>
                        <button onClick={() => handleShowPost(post.slug)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Show</button>
                        <button onClick={() => handleEditPost(post._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-b old py-2 px-4 rounded focus:outline-none focus:shadow-outline">Chỉnh sửa</button>
                        <button onClick={() => handleDelete(post._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-b old py-2 px-4 rounded focus:outline-none focus:shadow-outline">Xóa</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddPost} className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100">Thêm mới bài viết</button>
        </div>
    )
}
