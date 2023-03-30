import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts, addPost, editPost } from '../../slices/postSlices';
import { fetchImages, addImage } from '../../slices/imageSlices';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
export default function FormNew() {
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth)
    const posts = useSelector((state) => state.posts);
    console.log('post', posts);
    const images = useSelector((state) => state.images);
    console.log('images', images);
    const dispatch = useDispatch();
    const [showForm,
        setShowForm] = useState(false);
    const [title,
        setTitle] = useState('');
    const [description,
        setDescription] = useState('')
    const [content,
        setContent] = useState('');
    const [category,
        setCategory] = useState('');
    const [image,
        setImage] = useState(null);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchImages());
    }, [dispatch])
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            title: title,
            content: content,
            description: description,
            category: category,
            image: image
        };

        try {
            await dispatch(addPost(formData));
            window.location.href = `/${auth.name}`;
        } catch (error) {
            console.log(error);
            alert('Đã có lỗi xảy ra!');
        }
    };
    const exitFormNew = (event) => {
        window.location.href = `/${auth.name}`;
    }

    return (
        <Container fixed className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5">
            <h2 className="font-medium text-gray-900   text-xl">Create a New Post</h2>
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 text-left">
                <label className=' text-left'>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Title
                    </span>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <br />
                <label >
                    <span className="font-medium text-gray-900 text-base text-left">
                        Description:
                    </span>
                    <textarea
                        name="description"
                        id="description"
                        rows={3}
                        minLength={50}
                        maxLength={155}
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>

                    <div className="text-sm text-gray-600 mt-1">{description.length}
                        / 155 characters</div>
                </label>
                <br />
                <br />
                <label>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Content:
                    </span>

                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        className="appearance-none border rounded w-full h-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <br />
                <label>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Category:
                    </span>
                    <textarea
                        value={category}
                        onChange={handleCategoryChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <br />

                <label>
                    <span className="font-medium text-gray-900 text-base text-left"> Image:</span>

                    <br />
                    <br />
                    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} className="appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <input
                            className="form-control w-[500px] rounded-md border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm "
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </Box>

                </label>
                <br />
                <div className=' flex gap-5 mt-6 '>
                    <button
                        className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                        type="submit">
                        Đăng bài
                    </button>
                    <button
                        type="button"
                        onClick={exitFormNew}
                        className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                        Cancel
                    </button>
                </div>
            </form>

        </Container >
    )
}