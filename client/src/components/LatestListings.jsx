import React from 'react'
import Title from './Title'
import {useSelector} from 'react-redux'
import ListingCard from './ListingCard'

const LatestListings = () => {

  const {listings} = useSelector(state => state.listing)

  return (
    <div className='mt-20 mb-8'>
      <Title title="Newly Featured" description="Explore the absolute best social profiles trending right now." />

      <div className='flex flex-col gap-6 px-6'>
          {listings?.slice(0,4).map((listing, index) =>(
                <div key={index} className='mx-auto w-full max-w-3xl rounded-xl'>
                    <ListingCard listing={listing} />
                </div>
          ))}
      </div>

    </div>
  )
}

export default LatestListings
