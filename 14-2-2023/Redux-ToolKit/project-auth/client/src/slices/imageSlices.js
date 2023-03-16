import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlAPI } from './api';
import produce from 'immer';
import lodash from 'lodash';



export const fetchImages = createAsyncThunk(
    'image/fetchImages'
    , async () => {
        const response = await fetch(`${urlAPI}/images`);
        if (!response.ok) {
            throw new Error('Có lỗi xảy ra khi lấy các bài viết!');
        }
        const images = await response.json();
        return images;
    }
);

/* export const addImage = createAsyncThunk(
    "image/addImage",
    async (imageData) => {
        const token = localStorage.getItem("token");
        const { _id } = JSON.parse(atob(token.split('.'[1])));
        imageData.author_id = _id
        imageData.post_id = _id
     
        const response = await fetch(`${urlAPI}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(imageData)
        });

        const result = await response.json();
        return result;

    }
);

export const deleteImage = createAsyncThunk(
    "image/deleteImage",
    async (imageId) => {
        const response = await axios.delete(`${urlAPI}/images/${imageId}`);
        return response.data;
    }
);

export const updateImage = createAsyncThunk(
    "images/updateImage",
    async (imageData) => {
        const response = await axios.put(`${urlAPI}/images/${imageData.id}`, imageData);
        return response.data;
    }
);
 */
const initialState = [
    {
        images: [],
        status: "idle",
        error: null,
    }
];
export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        setImages: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchImages.fulfilled, (state, action) => {
                return action.payload;
            })

        /*  .addCase(addImage.fulfilled, (state, action) => {
             state.images.push(action.payload);
         })
         .addCase(deleteImage.fulfilled, (state, action) => {
             const index = state.images.findIndex(
                 (image) => image._id === action.payload._id
             );
             if (index !== -1) {
                 state.images.splice(index, 1);
             }
         })
         .addCase(updateImage.fulfilled, (state, action) => {
             const index = state.images.findIndex(
                 (image) => image._id === action.payload._id
             );
             if (index !== -1) {
                 state.images[index] = action.payload;
             }
         }); */
    },

    immer: true
});


export const { setImages } = imageSlice.actions;
export default imageSlice.reducer;