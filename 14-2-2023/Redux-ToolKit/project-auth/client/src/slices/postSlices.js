import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlAPI, urlAPIID } from "./api";
import axios from 'axios';
import produce from 'immer';
import lodash from 'lodash';

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
    async (blogData) => {
        const response = await fetch(`${urlAPI}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogData)
        });

        const result = await response.json();
        return result;
    });

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


export const editPost = createAsyncThunk(
    'post/editPost',
    async (blogData) => {
        const response = await fetch(`${urlAPI}/posts/${blogData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogData)
        });
        const result = await response.json();
        return result;
    }
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
    },
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
                return action.payload;
            })
            /*----------------------------------------------- */

            /* --------------------------------------------- */

            .addCase(editPost.fulfilled, (state, action) => {
                return produce(state, draftState => {
                    draftState[action.payload.id] = action.payload;
                })
            })
            /* --------------------- */

            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                return action.payload
            })

            /* ------------------------------- */
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = state.posts.filter((post) => post.id !== action.payload.id);
            })


    }
})

export const { setPosts } = postSlice.actions
export default postSlice.reducer