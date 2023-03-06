import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlAPI } from "./api";

export const fetchBlogs = createAsyncThunk(
    'post/fetchBlogs',
    async () => {
        const response = await fetch(`${urlAPI}/posts`);
        const result = await response.json();
        return result;
    }
);
export const updateBlog = createAsyncThunk(
    'post/updateBlog',
    async (postId) => {
        const response = await fetch(`${urlAPI}/posts/${postId.id}`, {
            method: 'PUT',
            body: JSON.stringify(postId),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    });

export const addBlog = createAsyncThunk(
    'post/addBlog',
    async (blogData) => {
        const response = await fetch(`${urlAPI}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogData)
        });

        const result = await response.json();
        console.log('testt', result);
        return result;
    });
export const editBlog = createAsyncThunk('post/editBlog', async (blogData) => {
    const response = await fetch(`${urlAPI}/posts/${blogData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(blogData)
    });
    const result = await response.json();
    return result;
});

export const deleteBlog = createAsyncThunk('post/deleteBlog', async (id) => {
    const response = await fetch(`${urlAPI}/posts/${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    return result;
});



const postSlice = createSlice({
    name: "post",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                const blog = state.find((blog) => blog.id === action.payload);
                if (blog) {
                    blog.title = action.payload.title;
                    blog.content = action.payload.content;
                    blog.author_id = action.payload.author_idauthor_id;
                    blog.image_path = action.payload.image_path;
                    blog.category = action.payload.category;
                }
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const { id } = action.payload;
                const postIndex = state.findIndex((post) => post.id === id);
                if (postIndex !== -1) {
                    state[postIndex] = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                console.log(action.error.message);
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                return state.filter((blog) => blog.id !== action.payload.id);
            })

    },
})

export const { setBlogs } = postSlice.actions
export default postSlice.reducer