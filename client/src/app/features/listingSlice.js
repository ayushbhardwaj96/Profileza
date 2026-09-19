import {createSlice} from '@reduxjs/toolkit'
import { dummyListings } from '../../assets/assets'
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";


// Get all user listings
export const getAllUserListing = createAsyncThunk("listing/getAllUserListing", async ({ getToken }) => {
    try {
        const token = await getToken();
        const { data } = await api.get("/api/listing/user", { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
});

// Get all public listings
export const getAllPublicListing = createAsyncThunk("listing/getAllPublicListing", async () => {
    try {
        const { data } = await api.get("/api/listing/all");
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
});

const listingSlice = createSlice({
    name: "listing",
    initialState: {
        listings: dummyListings,
        userListings: dummyListings,
        balance: {
            earned: 0,
            withdrawn: 0,
            available: 0,
            avilable: 0,
        },
    },
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUserListing.fulfilled, (state, action) => {
            if (!action.payload) return;
            if (action.payload.userListings) {
                state.userListings = action.payload.userListings;
            } else if (Array.isArray(action.payload)) {
                state.userListings = action.payload;
            }
            if (action.payload.balance) {
                state.balance = {
                    ...state.balance,
                    ...action.payload.balance,
                    available: action.payload.balance.available ?? action.payload.balance.avilable ?? state.balance.available,
                    avilable: action.payload.balance.available ?? action.payload.balance.avilable ?? state.balance.avilable,
                };
            }
        });
        builder.addCase(getAllPublicListing.fulfilled, (state, action) => {
            if (!action.payload) return;
            if (action.payload.listings) {
                state.listings = action.payload.listings;
            } else if (Array.isArray(action.payload)) {
                state.listings = action.payload;
            }
        });
    },
});

export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;