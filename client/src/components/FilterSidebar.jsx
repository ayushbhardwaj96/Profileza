import { ChevronDown, Filter, Verified, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const FilterSidebar = ({showFilterPhone, setShowFilterPhone, filters, setFilters}) => {
    
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState( searchParams.get('search') || '')
    
    const onChangeSearch = (e) =>{
         if(e.target.value){
            setSearchParams({search: e.target.value})
            setSearch(e.target.value)
         }
         else{
            navigate('/marketplace')
            setSearch('')
         }
    }

    const [expandedSection, setExpandedSections] = useState({
        platform: true,
        price: true,
        followers: true,
        niche: true,
        status: true ,
    })

    const toggleSection = (section)=>{
        setExpandedSections((prev)=>({...prev, [section] : !prev[section]}))
    }

    const onFiltersChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const onClearFilters = ()=>{
        if(search){
            navigate('/marketplace')
        }
        setFilters({
            platform: null,
            maxPrice: 100000,
            niche: null,
            verified: false ,
            monetized: false ,
        })
    }

    const platforms = [
        { value: "youtube", label: "YouTube" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "twitter", label: "Twitter" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "twitch", label: "Twitch" },
        { value: "discord", label: "Discord" },
    ]

      const niches = [
        { value: "lifestyle", label: "Lifestyle" },
        { value: "fitness", label: "Fitness" },
        { value: "food", label: "Food" },
        { value: "travel", label: "Travel" },
        { value: "tech", label: "Technology" },
        { value: "gaming", label: "Gaming" },
        { value: "fashion", label: "Fashion" },
        { value: "beauty", label: "Beauty" },
        { value: "business", label: "Business" },
        { value: "education", label: "Education" },
        { value: "entertainment", label: "Entertainment" },
        { value: "music", label: "Music" },
        { value: "art", label: "Art" },
        { value: "sports", label: "Sports" },
        { value: "health", label: "Health" },
        { value: "finance", label: "Finance" },
    ]

  return (
       <div className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}>

        <div className='p-4 border-b border-gray-200 '>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 text-gray-700'>
                    <Filter className='size-4' />
                    <h3 className='font-semibold'>Filters</h3>
                </div>
                <div className='flex items-center gap-2'>

                    <X onClick={onClearFilters} className='size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer ' />

                    <button onClick={()=>setShowFilterPhone(false)} className='sm:hidden text-sm border text-gray-700 px-3 py-1 rounded'>Apply</button>
                </div>
            </div>
        </div>

        <div className='p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar'>
            {/* serach Bar */}
            <div className='relative w-full max-w-xl flex items-center group'>
    {/* Left-aligned magnifying glass icon */}
    <div className='absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none'>
        <svg 
            xmlns="http://w3.org" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" />
        </svg>
    </div>

    <input 
        type="text" 
        placeholder='Search by username, platform, niche...' 
        className='w-full text-sm pl-10 pr-10 py-2.5 bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl shadow-sm outline-none ring-offset-0 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200' 
        value={search}
        onChange={onChangeSearch}
    />

    {/* Right-aligned clear button - visible only when user has typed text */}
    {search && (
        <button 
            onClick={() => onChangeSearch({ target: { value: '' } })}
            className='absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors'
            type="button"
            aria-label="Clear search text"
        >
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    )}
</div>

             {/* filters by platform */}
          <div className='bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md'>
    {/* Collapsible Header Button */}
    <button 
        onClick={() => toggleSection("platform")} 
        className='flex items-center justify-between w-full group cursor-pointer'
        type="button"
        aria-expanded={expandedSection.platform}
    >
        <span className='text-sm font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors'>
            Platform
        </span>
        <div className='p-1 rounded-md group-hover:bg-slate-50 text-slate-400 group-hover:text-slate-600 transition-all'>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${expandedSection.platform ? "rotate-180 text-indigo-500 bg-indigo-50/50" : ""}`} />
        </div>
    </button>
    
    {/* Dropdown Content Area */}
    {expandedSection.platform && (
        <div className='flex flex-col gap-2.5 mt-3 pt-3 border-t border-slate-50/80 animate-fadeIn'>
            {platforms.map((platform) => {
                const isChecked = filters.platform?.includes(platform.value) || false;
                
                return (
                    <label 
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border select-none ${
                            isChecked 
                                ? "bg-indigo-50/40 border-indigo-100/80 text-indigo-700 font-semibold" 
                                : "bg-white border-transparent text-slate-600 hover:bg-slate-50/60 hover:text-slate-800"
                        }`} 
                        key={platform.value}
                    >
                        <input 
                            type="checkbox"   
                            className='w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0 focus:ring-3 accent-indigo-600 transition-all cursor-pointer'
                            checked={isChecked}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                const current = filters.platform || [];
                                const updated = checked ? [...current, platform.value] : current.filter((p) => p !== platform.value);

                                onFiltersChange({
                                    ...filters,
                                    platform: updated.length > 0 ? updated : null,
                                });
                            }}
                        />
                        <span className='flex-1 leading-none'>{platform.label}</span>
                    </label>
                );
            })}
        </div>
    )}
</div>


             {/* filter by price */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md'>
    {/* Collapsible Header Button */}
    <button 
        onClick={() => toggleSection("price")} 
        className='flex items-center justify-between w-full group cursor-pointer'
        type="button"
        aria-expanded={expandedSection.price}
    >
        <span className='text-sm font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors'>
            Price Range
        </span>
        <div className='p-1 rounded-md group-hover:bg-slate-50 text-slate-400 group-hover:text-slate-600 transition-all'>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${expandedSection.price ? "rotate-180 text-indigo-500 bg-indigo-50/50" : ""}`} />
        </div>
    </button>
    
    {/* Dropdown Content Area */}
    {expandedSection.price && (
        <div className='space-y-4 mt-3 pt-4 border-t border-slate-50/80 animate-fadeIn'>
            {/* Custom Range Input Bar */}
            <div className='relative pt-1'>
                <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="100" 
                    value={filters.maxPrice || 100000} 
                    onChange={(e) => onFiltersChange({ ...filters, maxPrice: parseInt(e.target.value) })} 
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                />
            </div>

            {/* Dynamic Price Display Badges */}
            <div className="flex items-center justify-between text-xs font-semibold select-none">
                <span className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
                    {currency}0
                </span>
                
                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Max Price</span>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100/50 shadow-sm font-bold text-sm">
                        {currency}{(filters.maxPrice || 100000).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    )}
</div>


             {/* filter by follower */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md'>
    {/* Collapsible Header Button */}
    <button 
        onClick={() => toggleSection("followers")} 
        className='flex items-center justify-between w-full group cursor-pointer'
        type="button"
        aria-expanded={expandedSection.followers}
    >
        <span className='text-sm font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors'>
            Minimum Followers
        </span>
        <div className='p-1 rounded-md group-hover:bg-slate-50 text-slate-400 group-hover:text-slate-600 transition-all'>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${expandedSection.followers ? "rotate-180 text-indigo-500 bg-indigo-50/50" : ""}`} />
        </div>
    </button>
    
    {/* Dropdown Content Area */}
    {expandedSection.followers && (
        <div className='mt-3 pt-4 border-t border-slate-50/80 animate-fadeIn relative'>
            <select
                value={filters.minFollowers?.toString() || '0'}
                onChange={(e) => onFiltersChange({ ...filters, minFollowers: parseInt(e.target.value) || 0 })}
                className='w-full text-sm pl-3.5 pr-10 py-2.5 bg-white text-slate-700 font-medium border border-slate-200 rounded-xl shadow-sm outline-none appearance-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer'
            >
                <option value="0">Any amount</option>
                <option value="1000">1K+</option>
                <option value="10000">10K+</option>
                <option value="50000">50K+</option>
                <option value="100000">100K+</option>
                <option value="500000">500K+</option>
                <option value="1000000">1M+</option>
            </select>

            {/* Custom select arrow overlay to replace rough default browser arrow */}
            <div className='absolute right-3.5 bottom-3.5 pointer-events-none text-slate-400'>
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    )}
</div>


             {/* filter by niche */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md'>
    {/* Collapsible Header Button */}
    <button 
        onClick={() => toggleSection("niche")} 
        className='flex items-center justify-between w-full group cursor-pointer'
        type="button"
        aria-expanded={expandedSection.niche}
    >
        <span className='text-sm font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors'>
            Niche
        </span>
        <div className='p-1 rounded-md group-hover:bg-slate-50 text-slate-400 group-hover:text-slate-600 transition-all'>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${expandedSection.niche ? "rotate-180 text-indigo-500 bg-indigo-50/50" : ""}`} />
        </div>
    </button>
    
    {/* Dropdown Content Area */}
    {expandedSection.niche && (
        <div className='mt-3 pt-4 border-t border-slate-50/80 animate-fadeIn relative'>
            <select
                value={filters.niche || ''}
                onChange={(e) => onFiltersChange({ ...filters, niche: e.target.value || null })}
                className='w-full text-sm pl-3.5 pr-10 py-2.5 bg-white text-slate-700 font-medium border border-slate-200 rounded-xl shadow-sm outline-none appearance-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer'
            >
                <option value="">All niches</option> 
                {niches.map((niche) => (
                    <option key={niche.value} value={niche.value}>
                        {niche.label}
                    </option>
                ))} 
            </select>

            {/* Custom select arrow overlay to replace rough default browser arrow */}
            <div className='absolute right-3.5 bottom-3.5 pointer-events-none text-slate-400'>
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
    )}
</div>


             {/* verification status */}
             <div className='bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md'>
    {/* Collapsible Header Button */}
    <button 
        onClick={() => toggleSection("status")} 
        className='flex items-center justify-between w-full group cursor-pointer'
        type="button"
        aria-expanded={expandedSection.status}
    >
        <span className='text-sm font-bold tracking-wide uppercase text-slate-500 group-hover:text-slate-800 transition-colors'>
            Account Status
        </span>
        <div className='p-1 rounded-md group-hover:bg-slate-50 text-slate-400 group-hover:text-slate-600 transition-all'>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${expandedSection.status ? "rotate-180 text-indigo-500 bg-indigo-50/50" : ""}`} />
        </div>
    </button>
    
    {/* Dropdown Content Area */}
    {expandedSection.status && (
        <div className='flex flex-col gap-2.5 mt-3 pt-3 border-t border-slate-50/80 animate-fadeIn'>
            {/* Verified Account Row Card */}
            <label 
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border select-none ${
                    filters.verified 
                        ? "bg-indigo-50/40 border-indigo-100/80 text-indigo-700 font-semibold" 
                        : "bg-white border-transparent text-slate-600 hover:bg-slate-50/60 hover:text-slate-800"
                }`} 
            >
                <input 
                    type="checkbox" 
                    className='w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500/20 focus:ring-offset-0 focus:ring-3 accent-indigo-600 transition-all cursor-pointer'
                    checked={filters.verified || false} 
                    onChange={(e) => onFiltersChange({ ...filters, verified: e.target.checked })} 
                />
                <span className='flex-1 leading-none'>Verified accounts only</span>
            </label>

            {/* Monetized Account Row Card */}
            <label 
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border select-none ${
                    filters.monetized 
                        ? "bg-emerald-50/40 border-emerald-100/80 text-emerald-700 font-semibold" 
                        : "bg-white border-transparent text-slate-600 hover:bg-slate-50/60 hover:text-slate-800"
                }`} 
            >
                <input 
                    type="checkbox" 
                    className='w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500/20 focus:ring-offset-0 focus:ring-3 accent-emerald-600 transition-all cursor-pointer'
                    checked={filters.monetized || false} 
                    onChange={(e) => onFiltersChange({ ...filters, monetized: e.target.checked })} 
                />
                <span className='flex-1 leading-none'>Monetized accounts only</span>
            </label>
        </div>
    )}
</div>

        </div>
      
    </div>
  )
}

export default FilterSidebar
