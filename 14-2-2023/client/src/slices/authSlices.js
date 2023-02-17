


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
            /// Thực hiện một yêu cầu http với 
            const token = await axios.post(`${urlAPI}/register`, {
                name: user.name,
                email: user.email,
                password: user.password
            });
            // Thêm mới dữ liệu vào  localStorage bằng setItem  
            localStorage.setItem("token", token.data);
            return token.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            /// Thực hiện một yêu cầu http với 
            const token = await axios.post(`${urlAPI}/login`, {
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

    /* 
        Giống như reducers, extraReducers 
    */
    extraReducers: (builder) => {

        // Đối với register
        // Khi chua giai quyet
        // Ở trạng thái Pending : xử lý trạng thái tải của asyncThunk 
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });
        // Khi hoang thanh
        // Ở trạng thái fulfilled : xử lý trạng thái thành công.
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
        // Khi bị từ chối.
        //ở trạng thái rejected : xử lý trạng thái không thành công
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                state,
                registerStatus: "ERROR REJECTED",
                registerError: action.payload,
            }
        });
        /* ________________________________________________________________________________________________________ */
        ////// Đôi với login
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });

        // Khi hoang thanh
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    loginUser: "SUCCESS"
                }
            } else return state;
        });
        // Khi bị từ chối.
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                state,
                loginStatus: "ERROR REJECTED",
                loginError: action.payload,
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


/* 
https://redux-toolkit.js.org/api/createSlice#extrareducers

https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers

https://redux-toolkit.js.org/api/createAsyncThunk

https://redux-toolkit.js.org/usage/usage-with-typescript#typing-builderaddmatcher

https://redux-toolkit.js.org/api/createReducer#builderadddefaultcase
 */