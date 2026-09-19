import React, { useEffect, useMemo, useState } from 'react'
import { dummyChats } from '../assets/assets';
import { MessageCircle, Search } from 'lucide-react';
import {format, isToday, isYesterday, parseISO} from 'date-fns'
import { useDispatch } from 'react-redux';
import { setChat } from '../app/features/chatSlice';

const Messages = () => {

  const dispatch = useDispatch() ;

  const user = {id: "user_1"} ;

  const [chats, setChats] = useState([])
  const [searchQuery, setSearchQuery] = useState('') ;
  const [loading, setLoading] = useState(true) ;

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
      if (isNaN(date.getTime())) return '';
      if (isToday(date)) {
        return 'Today ' + format(date, "HH:mm");
      }
      if (isYesterday(date)) {
        return 'Yesterday ' + format(date, "HH:mm");
      }
      return format(date, "MMM d");
    } catch {
      return '';
    }
  };

  const filterChats = useMemo(()=>{
        const query = searchQuery.toLowerCase() ;
        return chats.filter((chat)=>{
          const chatUser  = chat.chatUserId === user?.id ? chat?.ownerUser : chat?.chatUser ;
           return chat.listing?.title?.toLowerCase().includes(query) || chatUser?.name?.toLowerCase().includes(query)
        })
  },[chats, searchQuery])

  const handleOpenChat = (chat) =>{
         dispatch(setChat({listing: chat.listing, chatId: chat.id}))
  }

  const fetchUserChats = async () => {
    setChats(dummyChats)
    setLoading(false)
  }

  useEffect(()=>{
    fetchUserChats()
    const interval = setInterval(()=>{
      fetchUserChats() ;
    }, 10*1000) ;
    return ()=> clearInterval(interval)
  },[])


  return (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='py-10'>
          {/* Header */}
         <div className="mb-6 flex flex-col gap-1 select-none">
  <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl leading-none">
    Messages
  </h1>
  <p className="text-sm font-medium text-slate-400 tracking-wide flex items-center gap-1.5">
    <span>Chat with buyers and sellers</span>
  </p>
</div>


       {/* Search */}
     <div className="relative max-w-xl w-full mb-6 group">
  {/* Search Icon with Dynamic Interaction Tone */}
  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-200 size-4.5 stroke-[2.2]" />
  
  <input 
    type="text" 
    placeholder="Search conversations..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)} 
    className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition-all duration-200 focus:outline-none shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
  />

  {/* Clear Button (Shows up if user started typing) */}
  {searchQuery && (
    <button
      onClick={() => setSearchQuery("")}
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
      title="Clear search"
    >
      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )}
</div>


       {/* Chat List */}
       {loading ? (
  <div className="flex flex-col items-center justify-center py-24 space-y-3">
    <div className="relative flex size-6">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full size-6 border-2 border-indigo-600 border-t-transparent animate-spin"></span>
    </div>
    <span className="text-sm font-medium text-slate-400 tracking-wide">Loading messages...</span>
  </div>
) : filterChats.length === 0 ? (
  <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] max-w-md mx-auto my-6">
    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
      <MessageCircle className="w-6 h-6 stroke-[2]" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1.5 tracking-tight">
      {searchQuery ? 'No chats found' : 'No messages yet'}
    </h3>
    <p className="text-sm text-slate-400 leading-relaxed px-4">
      {searchQuery ? 'Try adjusting your search terms or filters.' : 'Start a conversation by viewing a listing and clicking "Chat with Seller".'}
    </p>
  </div>
) : (
  <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
    {filterChats.map((chat) => {
      const chatUser = chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;
      const hasUnread = !chat.isLastMessageRead && chat.lastMessageSenderId !== user?.id;
      
      return (
        <button 
          onClick={() => handleOpenChat(chat)} 
          key={chat.id} 
          className="w-full p-4 hover:bg-slate-50 active:bg-slate-100/80 transition-all duration-200 text-left flex items-start gap-4 group relative"
        >
          {/* Subtle side accent bar for unread messages */}
          {hasUnread && (
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-600 rounded-r" />
          )}

          {/* Avatar Container with Fallback layout */}
          <div className="flex-shrink-0 relative">
            {chatUser?.image ? (
              <img 
                src={chatUser?.image} 
                alt={chatUser?.name || "User"} 
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all" 
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-semibold text-slate-500 uppercase tracking-wider text-sm ring-2 ring-slate-100">
                {chatUser?.name?.substring(0, 2) || "U"}
              </div>
            )}
            
            {/* Tiny live unread dot overlayed on avatar */}
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 size-3 bg-indigo-600 rounded-full border-2 border-white" />
            )}
          </div>

          {/* Content Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2 mb-0.5">
              <h3 className={`text-sm truncate tracking-tight transition-colors group-hover:text-indigo-600 ${hasUnread ? "font-bold text-slate-900" : "font-semibold text-slate-800"}`}>
                {chat.listing?.title}
              </h3>
              <span className={`text-[11px] flex-shrink-0 font-medium ${hasUnread ? "text-indigo-600" : "text-slate-400"}`}>
                {formatTime(chat.updatedAt)}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-400 truncate mb-1">
              {chatUser?.name || "Unknown User"}
            </p>

            <p className={`text-sm truncate leading-snug tracking-wide ${hasUnread ? "text-indigo-600 font-semibold" : "text-slate-500 font-normal"}`}>
              {chat.lastMessage || "No messages yet"}
            </p>
          </div>
        </button>
      );
    })}
  </div>
)}


      </div>
    </div>
  )
}

export default Messages
