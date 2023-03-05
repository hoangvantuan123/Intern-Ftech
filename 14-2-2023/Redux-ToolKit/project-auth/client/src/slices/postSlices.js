import { createAsyncThunk, createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlAPI } from './api';
const initialState = {
    loading: false,
    error: null,
    success: false,
    currentPost: false,
    edit: false,
}
export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (data) => {
        const { id, title, content } = data;
        const response = await axios.put(`${urlAPI}/posts/${id}`, { title, content });
        return response.data;
    }
);

export const createPost = createAsyncThunk(
    'post/createPost', // tên của action
    async (data) => {
        const response = await axios.post(`${urlAPI}/posts`, data);
        return response.data;
    }
);
export const deletePost = createAsyncThunk(
    'post/deletePost', // tên của action
    async (id) => {
        const response = await axios.delete(`/api/posts/${id}`);
        return response.data;
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {

        // reducer để bắt đầu đăng bài
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        // reducer được gọi khi đăng bài thành công
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        })
        // reducer được gọi khi đăng bài không thành công
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
        // reducer để bắt đầu cập nhật post
        builder.addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        // reducer được gọi khi cập nhật post thành công
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.currentPost = action.payload;
        })
        // reducer được gọi khi cập nhật post không thành công
        builder.addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
        builder.addCase(deletePost.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.currentPost = null;
        })
        // reducer được gọi khi xóa post không thành công
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
    },
})
const store = configureStore({
    reducer: { post: postSlice.reducer },
});
export const { setData } = postSlice.actions
export default store;