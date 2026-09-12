import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  
  const {userListings, balance} = useSelector((state)=>state.listing)
  const currency = import.meta.env.VITE_CURRENCY || '$' ;

  const navigate = useNavigate()

  const totalValue = userListings.reduce((sum, listing))

  return (
    <div>
        
    </div>
  )
}

export default MyListings
