import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, addPost, editPost } from '../../slices/postSlices';
import { fetchImages } from '../../slices/imageSlices';

export default function FormNew() {
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth)
    const posts = useSelector((state) => state.posts);
    console.log('post', posts);
    const images = useSelector((state) => state.images);
    console.log('images', images);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const [data, setData] = useState({
        name: "",
        image: "",
    });
    const handleChange = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    };
    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchImages());
    }, [dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBlog = {
            title,
            description,
            content,
            category,
        };
        dispatch(addPost(newBlog));
        setShowForm(false);
        setTitle('');
        setDescription('');
        setContent('');
        setCategory('');

        window.location.href = `/${auth.name}`;

    }

    const handleSubmitImage = async () => {
        try {
            let formData = new FormData();
            formData.append("image", data.image);
            formData.append("name", data.name);

            const res = await fetch(`http://127.0.0.1:5000/api/images`, {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                setData({ name: "", image: "" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <label>
                    Description:
                    {/*  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> */}
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
                <label> Dscription: <textarea value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <label>
                    Image:
                    <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange("image")}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmitImage} >
                        Submit
                    </button>
                </label>
                <br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Đăng bài</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Cancel </button>
            </form>

        </div >
    )
}