import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserData, UserInfo } from "../modules"
import { authApi } from "../../axios"
import { removeLSToken, setLSToken } from "../../LS"


type UserState = {
    loading: boolean
    error: null | string
    token: null | string
    redirect: boolean
    user: UserInfo | null
}

const initialState: UserState = {
    error: null,
    loading: false,
    token: null,
    redirect: false,
    user: null,
}

export const fetchByAddNewUser = createAsyncThunk<string, UserData, { rejectValue: string }>(
    'user/fetchByAddNewUser',
    async (userData, { rejectWithValue }) => {
        const res = await authApi.addNewUser(userData)
        console.log(res);
        if (res.status !== 201) {
            return rejectWithValue('Server error')
        }
        return res.data.message as string
    }
)

export const fetchByLogin = createAsyncThunk<string, UserData, { rejectValue: string }>(
    'user/fetchByLogin',
    async (userData, { rejectWithValue }) => {
        const res = await authApi.login(userData)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data.access as string
    }
)

export const fetchByUserData = createAsyncThunk<UserInfo, string, { rejectValue: string }>(
    'user/fetchByUserData',
    async (token, { rejectWithValue }) => {
        const res = await authApi.getUserData(token)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server error')
        }
        return res.data as UserInfo
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleRedirect(state, action: PayloadAction<boolean>) {
            state.redirect = action.payload
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
        },
        logOut(state) {
            state.token = null
            removeLSToken()
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchByAddNewUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByAddNewUser.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.includes('Successfully')) {
                state.redirect = true
            }
        })
        addCase(fetchByAddNewUser.rejected, (state, action) => {
            state.loading = false
            if (action.error.message) {
                state.error = action.error.message
            }
        })
        // ====================================================
        addCase(fetchByLogin.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByLogin.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
            setLSToken(action.payload)
        })
        addCase(fetchByLogin.rejected, (state, action) => {
            state.loading = false
            if (action.error.message?.includes('401')) {
                state.error = 'User not found!'
            }
        })

        // ===================================================
        addCase(fetchByUserData.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export const { toggleRedirect, setToken, logOut } = userSlice.actions

export default userSlice.reducer