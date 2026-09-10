import { ArrowLeftIcon,  FilterIcon } from 'lucide-react'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ListingCard from '../components/ListingCard'
import FilterSidebar from '../components/FilterSidebar'

const Marketplace = () => {

  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")

   const navigate = useNavigate()
   const [showFilterPhone, setShowFilterPhone] = useState(false) ;
   const [filters, setFilters] = useState({
        platform: null,
        maxPrice: 100000,
        minFollowers: 0,
        niche: null,
        monetized: false,
   })

   const {listings} = useSelector(state => state.listing)

   const filteredListings = listings.filter((listing)=>{
    
    if(filters.platform && filters.platform.length > 0){
        if(!filters.platform.includes(listing.platform)) return false ;
    }

    if(filters.maxPrice){
        if(listing.price > filters.maxPrice) return false ;
    }

    if(filters.minFollowers){
         if(listing.followers_count < filters.minFollowers) return false ;
    }

    if(filters.niche && filters.niche.length > 0){
        if(!filters.niche.includes(listing.niche)) return false ;
    }

    if(filters.verified && listing.verified !== filters.verified) return false ;
    if(filters.monetized && listing.monetized !== filters.monetized) return false ;

    if (search) {
    const query = search.trim().toLowerCase();
    
    // Put all fields into an array to check them easily
    const fields = [
        listing.title, 
        listing.username, 
        listing.description, 
        listing.platform, 
        listing.niche
    ];

    // If NONE of the fields include the search text, return false
    if (!fields.some(field => field?.toLowerCase().includes(query))) {
        return false;
    }
}


    return true ;
   })

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>

      <div className='flex items-center justify-between text-slate-500'>
         {/* buttons */}
        <button onClick={()=>{navigate('/'); scrollTo(0,0)}}
          className='flex items-center gap-2 py-5'>
          <ArrowLeftIcon className='size-4' />
          Back to Home
          </button>
        <button onClick={() =>setShowFilterPhone(true)} className='flex sm:hidden items-center gap-2 py-5'>
          <FilterIcon className='size-4' />
          Filters
          </button>
      </div>
      <div className='relative flex items-start justify-between gap-8 pb-8'>

        {/* left side */}
         <FilterSidebar setFilters={setFilters} filters={filters} setShowFilterPhone={setShowFilterPhone} showFilterPhone={showFilterPhone} />

         <div className='flex-1 grid xl:grid-cols-2 gap-4'>
          {/* right side */}
          {filteredListings.sort((a,b)=>a.featured ? -1 : b.featured ? 1 : 0).map((listing, index)=>(
            <ListingCard listing={listing} key={index} />
          ))}
         </div>

      </div>
    </div>
  )
}

export default Marketplace
