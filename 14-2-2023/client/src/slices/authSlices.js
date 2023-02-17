


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlAPI } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('token'),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    // xem tai khoan nguoi dung da tai hay chua +> de trang false de ve trang thai ban dau 
    userLoaded: false,

}
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${urlAPI}/register`, {
                name: user.name,
                email: user.email,
                password: user.password
            });

            localStorage.setItem("token", token.data);
            return token.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token)
                return {
                    ...state,
                    // Token la ma thong bao 
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    userLoaded: true
                }
            }
        },
        logOutUser(state, action) {
            localStorage.removeItem("token");
            return {
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                // xem tai khoan nguoi dung da tai hay chua +> de trang false de ve trang thai ban dau 
                userLoaded: false,
            }
        }
    },
    extraReducers: (builder) => {
        // Khi chua giai quyet
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });

        // Khi hoang thanh
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    registerUser: "SUCCESS"
                }
            } else return state;
        });
        // Khi loi bo qua
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                state,
                registerStatus: "ERROR REJECTED",
                registerError: action.payload,
            }
        });
    }

})

export const { loadUser, logOutUser } = authSlice.actions;
export default authSlice.reducer


/*
https://redux-toolkit.js.org/tutorials/quick-start 
Mục đích tạo ra các Slices :
    + Yêu cầu tên của một chuỗi  để ta có thể xác địch các Slices này
    + Một giá trị trạng thái ban đầu
    + Các hàm rút gọn để xác định cách  có thể  cập nhật trạng thái 

    => từ đó khi một Slices đc tạo ra chúng ta có thể xuất các trình tạo hành động  Redux đã tạo  và hàm giảm tốc cho Slices đó.
*/