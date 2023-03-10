import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../slices/postSlices';

export default function PostsList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log('post', posts);


    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    const navigate = useNavigate();
    const handleEditPost = (postId) => {
        navigate(`/api/posts/${postId}`);
    };

    const handleCancelEdit = () => {
        setSelectedPostId(null);
    };

    const handleAddPost = () => {
        navigate('/posts/new');
    };


    return (
        <div className='max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 m-auto'>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3" >
                {posts.map((post) => (
                    <li key={post._id} className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.category}</p>
                        <button onClick={() => handleEditPost(post._id)}>Chỉnh sửa</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddPost} className="relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100">Thêm mới bài viết</button>
        </div>
    )
}
