import {createSlice} from '@reduxjs/toolkit'
import { dummyListings } from '../../assets/assets'
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";

// Get all public listings
export const getAllPublicListing = createAsyncThunk("listing/getAllPublicListing", async () => {
    try {
        const { data } = await api.get("/api/listing/public");
        return data;
    } catch (error) {
        console.log(error);
        return [];
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
        return [];
    }
});


const listingSlice = createSlice({
    name: "listing" ,
    initialState: {
        listings : dummyListings,
        userListings :dummyListings,
        balance: {
            earned: 0,
            withdrawn: 0,
            avilable: 0
        }
    },
    reducers: {
        setListings: (state, action)=>{
            state.listings = action.payload
        }
    }

})


export const {setListings} = listingSlice.actions ;

export default listingSlice.reducer