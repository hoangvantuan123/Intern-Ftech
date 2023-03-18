import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPosts, addPost, editPost } from '../../slices/postSlices';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
export default function FormFields() {
    const auth = useSelector((state) => state.auth);
    console.log('auth', auth)
    const posts = useSelector((state) => state.posts);
    console.log('post', posts);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [showForm, setShowForm] = useState(false);

    const post = posts.find((post) => post._id === id) || {};
    console.log('post12', post);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    const [formData, setFormData] = useState({
        id: id || '',
        title: post.title || '',
        description: post.description || '',
        content: post.content || '',
        category: post.category || '',
        image: null,
    });

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            title: post.title || '',
            description: post.description || '',
            content: post.content || '',
            category: post.category || '',
        }));
    }, [post]);


    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { id, title, description, content, category, image } = formData;

        dispatch(editPost({ id, title, description, content, category, image, image_path: post.image_path }))
            .then((result) => {
                if (editPost.fulfilled.match(result)) {
                    // redirect to user's dashboard
                    window.location.href = `/${auth.name}`;
                }
            });
    };
    const exitFormNew = (event) => {
        window.location.href = `/${auth.name}`;
    }

    return (
        /*   <Container fixed className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5">
              <form onSubmit={handleFormSubmit}>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <textarea name="content" value={formData.content} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <input type="file" name="image" onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  <button type="submit" className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">Save changes</button>
              </form>
          </Container > */
        <Container fixed className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5">
            <h2 className="font-medium text-gray-900   text-xl">Edit Post</h2>
            <form
                onSubmit={handleFormSubmit}
                className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 text-left">
                <label className=' text-left'>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Title
                    </span>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
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
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>

                    <div className="text-sm text-gray-600 mt-1">{formData.description.length}
                        / 155 characters</div>
                </label>
                <br />
                <br />
                <label>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Content:
                    </span>

                    <textarea
                        value={formData.content}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full h-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
                <br />
                <br />
                <label>
                    <span className="font-medium text-gray-900 text-base text-left">
                        Category:
                    </span>
                    <textarea
                        value={formData.category}
                        onChange={handleInputChange}
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
                            onChange={handleInputChange}
                        />
                    </Box>

                </label>
                <br />
                <div className=' flex gap-5 mt-6 '>
                    <button type="submit"
                        className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                        Save changes
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