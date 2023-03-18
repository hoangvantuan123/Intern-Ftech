import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlAPI, urlAPIID } from "./api";
import axios from 'axios';
import produce from 'immer';
import lodash from 'lodash';
import { Omit } from 'utility-types'; // import Omit từ package

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async () => {
        const response = await fetch(`${urlAPI}/posts`);
        if (!response.ok) {
            throw new Error('Có lỗi xảy ra khi lấy các bài viết!');
        }
        const posts = await response.json();
        return posts;
    }
);

export const addPost = createAsyncThunk(
    'post/addPost',
    async (postData, { getState }) => {
        try {
            const { auth } = getState();
            const { title, content, description, category, image } = postData;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('image', image);
            formData.append('author_id', auth._id);

            const token = auth.token;
            const response = await fetch(`${urlAPI}/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            return result;
        } catch (error) {
            // Xử lý các lỗi tại đây
            throw error;
        }
    }
);



export const fetchPostBySlug = createAsyncThunk(
    'post/fetchPostBySlug',
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get(`${urlAPI}/posts/${slug}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const fetchPostById = createAsyncThunk(
    'post/fetchById',
    async (id) => {
        const response = await urlAPIID(id);
        return response.data;
    }
);



/* export const editPost = createAsyncThunk(
    'post/editPost',
    async (blogData) => {
        const response = await fetch(`${urlAPI}/posts/${blogData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
        });

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(errorResData.error.message);
        }

        const result = await response.json();
        return result;
    }
); */

export const editPost = createAsyncThunk(
    'post/editPost',
    async (formData, { rejectWithValue }) => {
        try {
            const {  title, description, content, category, image } = formData;

            const postForm = new FormData();
            postForm.append('title', title);
            postForm.append('description', description);
            postForm.append('content', content);
            postForm.append('category', category);
            if (image) {
                postForm.append('image', image);
            }

            const response = await axios.put(`${urlAPI}/posts/${formData.id}`, postForm);

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Server error');
        }
    },
);

export const deletePost = createAsyncThunk('post/deleteBlog', async (id) => {
    const response = await fetch(`${urlAPI}/posts/${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    return result;
});


const initialState = [
    {
        posts: [],
        status: 'idle',
        error: null
    }
]


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            return action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'succeeded';
            })
            .addCase(editPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        ...action.payload
                    }
                }
            })
            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post.id !== action.payload.id);
            });
    },
    immer: true
})

export const { setPosts } = postSlice.actions
export default postSlice.reducer