import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
    const [description, setDescription] = useState('')
    const { id } = useParams();
    const post = posts.find((post) => post._id === id);
    console.log('post1', post)
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])
    useEffect(() => {
        setTitle(post?.title || '');
        setDescription(post?.description || '');
        setContent(post?.content || '');
        setCategory(post?.category || '');
    }, [post]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editPost(
            {
                id: post._id,
                title,
                description,
                content,
                category,
                image_path: post.image_path  /// giữ nguyên đường dẫn ảnh cũ
            }
        ));
        window.location.href = `/${auth.name}`;

    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleSave = (postId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        id="description"
                        rows={3}
                        minLength={50}
                        maxLength={155}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                    <div className="text-sm text-gray-600 mt-1">{description.length} / 155 characters</div>
                </label>
                <label> Content: <textarea value={content} onChange={(e) => setContent(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label> Category: <textarea value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                    Cập nhật bài đăng
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Cancel </button>
            </form>
        </div >
    )
}