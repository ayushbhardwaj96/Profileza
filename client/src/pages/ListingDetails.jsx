import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProfileLink, platformIcons } from '../assets/assets'
import { useSelector } from 'react-redux'
import { ArrowLeftIcon,  ArrowUpRightFromSquareIcon, CheckCircle2, Loader2Icon,DollarSign } from 'lucide-react'

const ListingDetails = () => {

  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$' 

  const [listing, setListing] = useState(null)
  const profileLink = listing && getProfileLink(listing.platform, listing.username)

  const {listingId} = useParams() ;
  const {listings} = useSelector((state)=>state.listing) 

  useEffect(()=>{
    const listing = listings.find((listing)=>listing.id === listingId) ;
    if(listing){
      setListing(listing)
    }
  },[listingId, listings])


  return listing ? (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
       <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-600 py-5'>
        <ArrowLeftIcon className='size-4' /> Go to Previous Page
       </button>

       <div className='flex items-start max-md:flex-col gap-10'>
        <div className='flex-1 max-md:w-full'>
             {/* top-section */}
             <div className='bg-white rounded-xl border border-gray-200 p-6 mb-5'>
                    <div className='flex items-start gap-3'>
                         <div className='p-2 rounded-xl'>{platformIcons[listing.platform]}</div>
                         <div>
                          <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-800'>{listing.title} 
                          <Link target='_blank' to={profileLink}>
                              <ArrowUpRightFromSquareIcon className='size-4 hover:text-indigo-500' />
                          </Link>
                          </h2>
                          <p className='text-gray-500 text-sm'>
                            @{listing.username} . {listing.platform?.charAt(0).toUpperCase() + listing.platform?.slice(1)}
                          </p>
                          <div className='flex gap-2 mt-2'>
                                {listing.verified && (
                                  <span className='flex items-center text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md'>
                                    <CheckCircle2 className='w-3 h-3 mr-1' />
                                    Verified
                                  </span>
                                )}
                                 {listing.monetized && (
                                  <span className='flex items-center text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md'>
                                    <DollarSign className='w-3 h-3 mr-1' />
                                    Monetized
                                  </span>
                                )}
                          </div>
                         </div>
                    </div>
             </div>
        </div>
           {/* seller and purchase option */}
        <div>

        </div>
       </div>

    </div>
  ) : (
    <div className='h-screen flex justify-center items-center'>
      <Loader2Icon  className='size-7 animate-spin text-indigo-600' />
    </div>
  )
}

export default ListingDetails
