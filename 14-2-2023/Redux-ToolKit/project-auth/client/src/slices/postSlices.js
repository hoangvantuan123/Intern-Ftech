import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { urlAPI } from "./api";

export const fetchBlogs = createAsyncThunk('/posts', async () => {
    const response = await fetch(`${urlAPI}/posts`);
    const result = await response.json();
    return result;
});

export const addBlog = createAsyncThunk('/posts', async (blogData) => {
    const response = await fetch(`${urlAPI}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': " application/json"
        },
        body: JSON.stringify(blogData)
    });

    const result = await response.json();
    return result;
});
export const editBlog = createAsyncThunk('/posts', async (blogData) => {
    const response = await fetch(`${urlAPI}/posts/${blogData.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': " application/json"
        },
        body: JSON.stringify(blogData)
    });
    const result = await response.json();
    return result;
});
export const deleteBlog = createAsyncThunk('/posts', async (id) => {
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addBlog.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(editBlog.fulfilled, (state, action) => {
            const blog = state.find((blog) => blog.id === action.payload);
            if (blog) {
                blog.title = action.payload.title;
                blog.content = action.payload.content;
                blog.author_id = action.payload.author_id;
                blog.image_path = action.payload.image_path;
                blog.category = action.payload.category;

            }
        });
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            return state.filter((blog) => blog.id !== action.payload.id);
        })

    },
})

export default postSlice.reducer