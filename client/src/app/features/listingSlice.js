import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";

// Get all public listings
export const getAllPublicListing = createAsyncThunk("listing/getAllPublicListing", async () => {
    try {
        const { data } = await api.get("/api/listing/public");
        return data;
    } catch (error) {
        console.log(error);
        return { listings: [] };
    }
});


// Get all user listings
export const getAllUserListing = createAsyncThunk("listing/getAllUserListing", async ({ getToken }) => {
    try {
        const token = await getToken();
        const { data } = await api.get("/api/listing/user", { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        console.log(error);
        return { listings: [], balance: { earned: 0, withdrawn: 0, avilable: 0 } };
    }
});


const listingSlice = createSlice({
    name: "listing" ,
    initialState: {
        listings :  [],
        userListings :[],
        balance: {
            earned: 0,
            withdrawn: 0,
            avilable: 0
        }
    },
    reducers: {
        setListings: (state, action)=>{
            state.listings = action.payload || []
        }
    },
     extraReducers: (builder) => {
        builder.addCase(getAllPublicListing.fulfilled, (state, action) => {
            state.listings = action.payload?.listings || [];
        });
        builder.addCase(getAllUserListing.fulfilled, (state, action) => {
            state.userListings = action.payload?.listings || [];
            state.balance = action.payload?.balance || { earned: 0, withdrawn: 0, avilable: 0 };
        });
    },

})


export const {setListings} = listingSlice.actions ;

export default listingSlice.reducer