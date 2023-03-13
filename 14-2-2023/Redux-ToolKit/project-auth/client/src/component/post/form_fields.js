import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, addPost, editPost } from '../../slices/postSlices';

export default function FormFields() {
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth)
    const posts = useSelector((state) => state.posts);
    console.log('post', posts);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('')
    const [author_id, setAuthor_id] = useState('')
    const { id } = useParams();
    const post = posts.find((post) => post._id === id);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])


    const handleSubmit = (event) => {
        event.preventDefault();
        if (post) {
            dispatch(editPost(
                {
                    id: post._id,
                    title,
                    content,
                    category,
                    image_path: post.image_path  /// giữ nguyên đường dẫn ảnh cũ
                }));
        } else {
            const newBlog = {
                title,
                content,
                category,
                image_path: image ? `/uploads/${image.name}` : '' // Sử dụng đường dẫn ảnh mới chỉ khi file đã được chọn
            };
            dispatch(addPost(newBlog));
            setShowForm(false);
            setTitle('');
            setContent('');
            setImage('');
            setCategory('');
        }



    }
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label> Content: <textarea value={content} onChange={(e) => setContent(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label> Dscription: <textarea value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{post ? 'Cập nhật bài đăng' : 'Đăng bài'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Cancel </button>
            </form>

        </div >
    )
}