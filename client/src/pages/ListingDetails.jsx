import { DollarSign, Users, LineChart, Eye, Calendar, MapPin, CheckCircle2, UserCircle, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, Loader2Icon, ShoppingBagIcon, ArrowUpRightFromSquareIcon, MessageSquareMoreIcon } from 'lucide-react';
import { getProfileLink, platformIcons } from '../assets/assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setChat } from '../app/features/chatSlice';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../configs/axios';

const ListingDetails = () => {

   const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const { openSignIn } = useClerk();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currency = import.meta.env.VITE_CURRENCY || '$'; 

  const [listing, setListing] = useState(null)
  const profileLink = listing && getProfileLink(listing.platform, listing.username)

  const {listingId} = useParams() ;
  const {listings} = useSelector((state)=>state.listing) 

  const [current, setCurrent] = useState(0)
  const images = listing?.images || []

  const prevSlide = ()=> setCurrent((prev)=> (prev === 0 ? images.length - 1 :  prev -1))
  const nextSlide = ()=> setCurrent((prev)=> (prev ===   images.length - 1 ? 0 :  prev +1))

  const purchaseAccount = async () => {
        try {
            if (!user) return openSignIn();
            toast.loading('creating payment link...');
            const token = await getToken();
            const { data } = await api.get(`/api/listing/purchase-account/${listing.id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.dismissAll();
            window.location.href = data.paymentLink;
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    };

  const loadChatbox = () => {
        if (!isLoaded || !user) return toast('Please login to chat with seller');
        if (user.id === listing.ownerId) return toast("You can't chat with your own listing");
        dispatch(setChat({ listing: listing }));
  }

  useEffect(()=>{
    const listing = listings.find((listing)=>listing.id === listingId) ;
    if(listing){
      setListing(listing)
    }
  },[listingId, listings])


  return listing ? (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
       <button 
    onClick={() => navigate(-1)} 
    className='group inline-flex items-center gap-2.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200/60 shadow-sm px-4 py-2 rounded-xl transition-all duration-200 active:scale-98 my-4'
    aria-label="Go back to the previous page"
>
    <ArrowLeftIcon className='w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1' /> 
    <span>Go to Previous Page</span>
</button>


       <div className='flex items-start max-md:flex-col gap-10'>
        <div className='flex-1 max-md:w-full'>
             {/* top-section */}
        <div className='bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md p-6 mb-6 overflow-hidden relative'>
    {/* Decorative top accent line using the platform's native color if needed, or a sleek neutral line */}
    <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' />

    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-1'>
        <div className='flex items-start gap-4'>
            {/* Icon Wrapper with a modern glassmorphic background shadow */}
            <div className='p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-sm shrink-0 flex items-center justify-center'>
                {platformIcons[listing.platform]}
            </div>
            
            <div className='space-y-1.5'>
                <h2 className='flex items-wrap items-center gap-2 text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight'>
                    {listing.title} 
                    <Link 
                        target='_blank' 
                        to={profileLink}
                        className='inline-flex items-center justify-center p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors'
                        aria-label="View profile"
                    >
                        <ArrowUpRightFromSquareIcon className='w-4 h-4' />
                    </Link>
                </h2>
                
                <p className='text-slate-500 text-sm font-medium flex items-center gap-1.5 flex-wrap'>
                    <span className='text-slate-700 font-semibold'>@{listing.username}</span>
                    <span className='text-slate-300 select-none'>•</span>
                    <span className='bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase text-slate-600'>
                        {listing.platform?.charAt(0).toUpperCase() + listing.platform?.slice(1)}
                    </span>
                </p>
                
                {/* Badges Container */}
                <div className='flex flex-wrap gap-2 pt-1'>
                    {listing.verified && (
                        <span className='flex items-center text-xs font-semibold bg-indigo-50/80 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100/50 backdrop-blur-sm shadow-sm'>
                            <CheckCircle2 className='w-3.5 h-3.5 mr-1.5 shrink-0' />
                            Verified
                        </span>
                    )}
                    {listing.monetized && (
                        <span className='flex items-center text-xs font-semibold bg-emerald-50/80 text-emerald-600 px-2.5 py-1 rounded-lg border border-emerald-100/50 backdrop-blur-sm shadow-sm'>
                            <DollarSign className='w-3.5 h-3.5 mr-1 shrink-0' />
                            Monetized
                        </span>
                    )}
                </div>
            </div>
        </div>

        {/* Price Section */}
        <div className='flex md:flex-col items-baseline md:items-end justify-between md:justify-center gap-2 pt-4 md:pt-0 border-t border-slate-100 md:border-t-0 text-right'>
            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider md:hidden'>Price</span>
            <div>
                <h3 className='text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none'>
                    <span className='text-lg md:text-xl font-bold text-slate-500 mr-0.5'>{currency}</span>
                    {listing.price?.toLocaleString()}
                </h3>
                <p className='hidden md:block text-xs font-bold text-slate-400 uppercase tracking-wider mt-1.5'>USD</p>
            </div>
        </div>
    </div>
</div>


             {/* Screenshot Section */}
          {images?.length > 0 && (
    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md mb-6 overflow-hidden'>
        <div className='px-5 py-4 border-b border-slate-50 bg-slate-50/50'>
            <h4 className='font-bold text-sm tracking-wide uppercase text-slate-500'>Proof with Screenshots</h4>
        </div>
        
        {/* Slider container */}
        <div className='relative w-full aspect-video bg-slate-900 group overflow-hidden'>
            <div 
                className='flex h-full transition-transform duration-500 ease-out' 
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img 
                        key={index} 
                        src={img} 
                        alt='Listing Proof' 
                        className='w-full h-full object-contain shrink-0 select-none' 
                    />
                ))}
            </div>

            {/* Navigation buttons - Hidden by default, smooth fade-in on desktop hover */}
            <button 
                onClick={prevSlide} 
                className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 active:scale-95 p-2.5 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100'
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className='w-5 h-5' />
            </button>

            <button 
                onClick={nextSlide} 
                className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 active:scale-95 p-2.5 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100'
                aria-label="Next slide"
            >
                <ChevronRightIcon className='w-5 h-5' />
            </button>

            {/* Floating Info Badge (Top Right) */}
            <div className='absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white tracking-wider z-10 select-none'>
                {current + 1} / {images.length}
            </div>

            {/* Dots Indicator */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-slate-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full'>
                {images.map((_, index) => (
                    <button 
                        onClick={() => setCurrent(index)} 
                        key={index} 
                        className={`rounded-full transition-all duration-300 ${
                            current === index 
                                ? "w-5 h-2 bg-white" 
                                : "w-2 h-2 bg-white/50 hover:bg-white/80"
                        }`} 
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </div>
)}


            {/* Accounts */}
          <div className='bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md mb-6 overflow-hidden'>
    <div className='px-5 py-4 border-b border-slate-50 bg-slate-50/50'>
        <h4 className='font-bold text-sm tracking-wide uppercase text-slate-500'>Account Metrics</h4>
    </div>
    <div className='grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 text-center'>
        <div className='p-5 flex flex-col items-center justify-center transition-colors hover:bg-slate-50/30'>
            <div className='p-2 bg-indigo-50 rounded-lg text-indigo-600 mb-2.5'>
                <Users className='w-5 h-5' />
            </div>
            <p className='text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5'>
                {listing.followers_count?.toLocaleString()}
            </p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider'>Followers</p>
        </div>
        <div className='p-5 flex flex-col items-center justify-center transition-colors hover:bg-slate-50/30'>
            <div className='p-2 bg-emerald-50 rounded-lg text-emerald-600 mb-2.5'>
                <LineChart className='w-5 h-5' />
            </div>
            <p className='text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5'>
                {listing.engagement_rate}%
            </p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider'>Engagement</p>
        </div>
        <div className='p-5 flex flex-col items-center justify-center transition-colors hover:bg-slate-50/30'>
            <div className='p-2 bg-amber-50 rounded-lg text-amber-600 mb-2.5'>
                <Eye className='w-5 h-5' />
            </div>
            <p className='text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5'>
                {listing.monthly_views?.toLocaleString()}
            </p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider'>Monthly Views</p>
        </div>
        <div className='p-5 flex flex-col items-center justify-center transition-colors hover:bg-slate-50/30'>
            <div className='p-2 bg-sky-50 rounded-lg text-sky-600 mb-2.5'>
                <Calendar className='w-5 h-5' />
            </div>
            <p className='text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5'>
                {new Date(listing.createdAt).toLocaleDateString()}
            </p>
            <p className='text-xs font-medium text-slate-400 uppercase tracking-wider'>Listed</p>
        </div>
    </div>
</div>

     {/* description */}
  <div className='bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md mb-6 overflow-hidden'>
    <div className='px-5 py-4 border-b border-slate-50 bg-slate-50/50'>
        <h4 className='font-bold text-sm tracking-wide uppercase text-slate-500'>Description</h4>
    </div>
    <div className='p-5 text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line'>
        {listing.description}
    </div>
</div>


                    {/* Additional Details */}
                   <div className='bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md mb-6 overflow-hidden'>
    <div className='px-5 py-4 border-b border-slate-50 bg-slate-50/50'>
        <h4 className='font-bold text-sm tracking-wide uppercase text-slate-500'>Additional Details</h4>
    </div>
    
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 p-5 text-sm'> 
        <div className='flex flex-col gap-1 pb-3 sm:pb-0 border-b border-slate-50 sm:border-b-0'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Niche</p>
            <p className='font-semibold text-slate-700 capitalize'>{listing.niche}</p>
        </div>
        
        <div className='flex flex-col gap-1 pb-3 sm:pb-0 border-b border-slate-50 sm:border-b-0'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Primary Country</p>
            <p className='flex items-center font-semibold text-slate-700'>
                <MapPin className='w-4 h-4 mr-1.5 text-indigo-500 shrink-0' /> 
                <span>{listing.country}</span>
            </p>
        </div>
        
        <div className='flex flex-col gap-1 pb-3 sm:pb-0 border-b border-slate-50 sm:border-b-0'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Audience Age</p>
            <p className='font-semibold text-slate-700'>{listing.age_range}</p>
        </div>
        
        <div className='flex flex-col gap-1 pb-3 sm:pb-0 border-b border-slate-50 sm:border-b-0'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Platform Verified</p>
            <p className={`inline-flex font-semibold ${listing.platformAssured ? 'text-indigo-600' : 'text-slate-700'}`}>
                {listing.platformAssured ? 'Yes' : 'No'}
            </p>
        </div>
        
        <div className='flex flex-col gap-1 pb-3 sm:pb-0 border-b border-slate-50 sm:border-b-0'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Monetization</p>
            <p className={`inline-flex font-semibold ${listing.monetized ? 'text-emerald-600' : 'text-slate-500'}`}>
                {listing.monetized ? 'Enabled' : 'Disabled'}
            </p>
        </div>
        
        <div className='flex flex-col gap-1'>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Status</p>
            <span className={`inline-flex font-semibold capitalize ${listing.status === 'active' ? 'text-emerald-600' : 'text-slate-700'}`}>
                {listing.status}
            </span>
        </div>
    </div>
</div>



        </div>
           {/* seller and purchase option */}
     <div className='bg-white w-full md:w-[380px] rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md p-5 sticky top-6 max-md:mb-10 overflow-hidden relative'>
    {/* Clean, thin top accent bar to make the action card pop */}
    <div className='absolute top-0 left-0 right-0 h-[3px] bg-slate-100' />

    <h4 className='font-bold text-sm tracking-wide uppercase text-slate-500 mb-4 pt-1'>
        Seller Information
    </h4>
    
    {/* Profile Section */}
    <div className='flex items-center gap-3.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 mb-4'>
        <img 
            src={listing.owner?.image} 
            alt='seller' 
            className='w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0' 
        />
        <div className='min-w-0 flex-1'>
            <p className='font-bold text-slate-800 text-sm truncate'>
                {listing.owner?.name}
            </p>
            <p className='text-xs font-medium text-slate-400 truncate mt-0.5'>
                {listing.owner?.email}
            </p>
        </div>
    </div>

    {/* Metadata Row */}
    <div className='flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5 px-1'>
        <span>Member Since</span>
        <span className='font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] normal-case tracking-normal'>
            {new Date(listing.owner?.createdAt).toLocaleDateString()}
        </span>
    </div>

    {/* Action Buttons Stack */}
    <div className='space-y-2.5'>
        <button onClick={loadChatbox} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition-all duration-200 active:scale-[0.99] shadow-sm hover:shadow text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer'>
            <MessageSquareMoreIcon className='w-4 h-4' /> 
            <span>Chat with Seller</span>
        </button>

        {listing.isCredentialChanged && (
            <button onClick={purchaseAccount} className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2.5 rounded-xl transition-all duration-200 active:scale-[0.99] shadow-sm hover:shadow text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer'>
                <ShoppingBagIcon className='w-4 h-4' /> 
                <span>Buy Now</span>
            </button>
        )}
    </div>
</div>

       </div>

        {/* Footer */}
            <div className='bg-white border-t border-slate-100 py-6 text-center mt-28 relative overflow-hidden'>
    {/* Subtle design detail: a very soft center glow bar above the text */}
    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />
    
    <p className='text-xs sm:text-sm text-slate-400 font-medium tracking-wide flex flex-wrap items-center justify-center gap-1 px-4 select-none'>
        <span>&copy; {new Date().getFullYear()}</span> 
        <span className='font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 cursor-pointer'>
            Profileza
        </span> 
        <span className='hidden sm:inline text-slate-300'>&bull;</span> 
        <span className='text-slate-400'>All rights reserved.</span>
    </p>
</div>


    </div>
  ) : (
    <div className='h-screen flex justify-center items-center'>
      <Loader2Icon  className='size-7 animate-spin text-indigo-600' />
    </div>
  )
}

export default ListingDetails
