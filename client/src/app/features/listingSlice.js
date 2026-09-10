import {createSlice} from '@reduxjs/toolkit'
import { dummyListings } from '../../assets/assets'


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