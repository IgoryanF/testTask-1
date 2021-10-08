import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../fake-api/api";

export const fetchFakeData = createAsyncThunk(
    "fake/fetchFakeData",
    async ({ms}, {rejectWithValue}) => {
        try {
            const fakeResponse = await api.setData(ms);
            if (!fakeResponse.valid) {
                throw new Error("No valid");
            }
            return fakeResponse;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
    )

const fakeDataReducer = createSlice({
    name: "fake",
    initialState: {
        isFetching: false,
        error: null,
        rates: {},
        timestamp: null,
    },
    reducers: {
    },
    extraReducers: {
        [fetchFakeData.pending]: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        [fetchFakeData.fulfilled]: (state, action) => {
            state.isFetching = false;
            const { rates, timestamp } = action.payload;
            state.rates = rates;
            state.timestamp = timestamp;
        },
        [fetchFakeData.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        }
    },
})

export default fakeDataReducer.reducer