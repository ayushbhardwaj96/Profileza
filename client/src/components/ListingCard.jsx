import React from "react";
import { platformIcons } from '../assets/assets'
import { BadgeCheck, LineChart, MapPin, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ListingCard = ({ listing }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate()

  return (
    <div className='group relative w-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(101,163,13,0.12)] hover:border-brand-500/30 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 backface-hidden'>
      {listing.featured && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-brand-500 via-emerald-600 to-teal-600 text-white text-center text-[10px] font-extrabold py-1.5 tracking-widest uppercase shadow-sm z-10 antialiased">
          Featured
        </div>
      )}

      <div className={`p-5 flex flex-col flex-grow justify-between ${listing.featured ? 'pt-9' : 'pt-5'}`}>
          <div>
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
             <div className="p-2.5 bg-brand-50 rounded-xl text-brand-500 transition-colors duration-300 group-hover:bg-brand-100 flex-shrink-0">
               {platformIcons[listing.platform]}
             </div>

             <div className="flex flex-col min-w-0 flex-1 pt-0.5">
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight truncate group-hover:text-brand-700 transition-colors duration-200">{listing.title}</h2>
                  <p className="text-xs text-slate-400 truncate mt-0.5">@{listing.username} • <span className="capitalize font-semibold text-brand-500">{listing.platform}</span> </p>
             </div>
             {listing.verified && (
               <div className="bg-brand-50 p-1 rounded-full flex-shrink-0 self-start mt-0.5">
                 <BadgeCheck className="text-brand-500 w-4 h-4 fill-brand-50/50" />
               </div>
             )}
            </div>

            {/* Data Metrics */}
            <div className="flex items-center justify-between gap-4 my-4 bg-slate-50/80 border border-slate-100 p-3.5 rounded-xl transition-colors duration-300 group-hover:bg-slate-50">
                  <div className="flex items-center text-xs text-slate-500 flex-1 min-w-0">
                     <Users className='size-4.5 mr-2 text-brand-500 flex-shrink-0' />
                     <div className="flex flex-col min-w-0">
                       <span className='text-sm font-extrabold text-slate-800 leading-none'>{listing.followers_count.toLocaleString()}</span> 
                       <span className="text-[10px] font-medium text-slate-400 mt-0.5">followers</span>
                     </div>
                  </div>
                  {
                    listing.engagement_rate && (
                      <div className="flex items-center text-xs text-slate-500 flex-1 min-w-0 border-l border-slate-200 pl-4">
                        <LineChart className="size-4.5 mr-2 text-brand-500 flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-extrabold text-slate-800 leading-none">{listing.engagement_rate}%</span> 
                          <span className="text-[10px] font-medium text-slate-400 mt-0.5">engagement</span>
                        </div>
                      </div>
                    )
                  }
            </div>

            {/* Tags and Location */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className='text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-100 px-2.5 py-0.5 rounded-full capitalize tracking-wide'>{listing.niche}</span>
              {listing.country && (
                <div className="flex items-center text-slate-400 text-xs font-semibold ml-auto">
                  <MapPin className="size-3.5 mr-1 text-slate-300" />
                  <span className="tracking-wide text-[11px]">{listing.country}</span>
                </div>
              )}
            </div>

            {/* Brief Description */}
            <p className="text-xs leading-relaxed text-slate-500 mb-5 line-clamp-2 min-h-[36px] antialiased">{listing.description}</p>
          </div>

          <div>
            <hr className="my-4 border-slate-100" />

            {/* Footer */}
            <div className="flex items-center justify-between gap-3">
                 <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none">Price</span>
                  <span className="text-xl font-black text-slate-900 tracking-tight mt-1 truncate">
                    {currency}{listing.price.toLocaleString()}
                  </span>
                 </div>
                 <button 
                   onClick={() => { navigate(`/listing/${listing.id}`); scrollTo(0, 0); }} 
                   className="px-5 py-2.5 bg-brand-500 text-white text-xs font-extrabold rounded-xl hover:bg-brand-600 shadow-md shadow-brand-500/20 active:scale-98 active:shadow-sm transition-all duration-200 flex-shrink-0 cursor-pointer tracking-wide"
                 >
                  More Details
                 </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ListingCard;
