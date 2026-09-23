import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyChats } from "../assets/assets";
import { Loader2Icon, Send, X } from "lucide-react";
import { clearChat } from "../app/features/chatSlice";
import { format } from "date-fns";

const ChatBox = () => {
  const { listing, isOpen, chatId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const user = { id: "user_2" };
   

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const fetchChat = async () => {
    setChat(dummyChats[0]);
    setMessages(dummyChats[0].messages);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listing) {
      fetchChat();
    }
  }, [listing]);

  useEffect(() => {
    if (!isOpen) {
      setChat(null);
      setMessages([]);
      setIsLoading(true);
      setNewMessage("");
      setIsSending(false);
    }
  }, [isOpen]);

//   --for automatic scrolling---
  const messagesEndRef = useRef(null)
  useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages.length])

  const handleSendMessage = async (e)=>{
      e.preventDefault() ;
      if(!newMessage.trim() || isSending) return ;
      setMessages([...messages, {id: Date.now(), chatId: chat.id, sender_id: user.id, message: newMessage, createdAt: new Date()}]) ;
      setNewMessage("")
  }

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4">
      <div className="bg-white sm:rounded-lg shadow-2xl w-full max-w-2xl h-screen sm:h-[600px] flex flex-col">
        {/* Header */}
       <div className="bg-white border-b border-slate-100 p-4 sm:rounded-t-xl flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
  <div className="flex-1 min-w-0 flex items-center gap-3">
    {/* Visual Status Indicator Dot */}
    <div className="relative flex size-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-base text-slate-800 tracking-tight truncate leading-snug">
        {listing?.title}
      </h3>
      <p className="text-xs font-medium text-slate-400 mt-0.5 tracking-wide truncate flex items-center gap-1.5">
        <span className="inline-block size-1 bg-slate-300 rounded-full" />
        {user.id === listing?.ownerId
          ? `Chatting with buyer (${chat?.chatUser?.name || "Loading..."})`
          : `Chatting with seller (${chat?.ownerUser?.name || "Loading..."})`}
      </p>
    </div>
  </div>

  <button
    onClick={() => dispatch(clearChat())}
    title="Close Chat"
    className="ml-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-100"
  >
    <X className="w-4 h-4 stroke-[2.5]" />
  </button>
</div>


        {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50 scroll-smooth">
  {isLoading ? (
    <div className="flex flex-col items-center justify-center h-full space-y-2 animate-pulse">
      <Loader2Icon className="size-6 animate-spin text-indigo-600" />
      <span className="text-xs font-medium text-slate-400 tracking-wide">Loading chat history...</span>
    </div>
  ) : messages.length === 0 ? (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-6 max-w-sm mx-auto">
        <div className="inline-flex items-center justify-center size-12 rounded-full bg-indigo-50 text-indigo-600 mb-3">
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="font-semibold text-slate-700 text-base">No messages yet</p>
        <p className="text-sm text-slate-400 mt-1">Start the conversation by typing down below!</p>
      </div>
    </div>
  ) : (
    <div className="space-y-3">
      {messages.map((message) => {
        const isMe = message.sender_id === user.id;
        return (
          <div
            key={message.id}
            className={`flex w-full items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200 select-text
                ${isMe 
                  ? "bg-indigo-600 text-white rounded-br-none font-normal" 
                  : "bg-white border border-slate-100 text-slate-800 rounded-bl-none"
                }`}
            >
              <p className="text-sm leading-relaxed break-words whitespace-pre-wrap tracking-wide">
                {message.message}
              </p>
              <div 
                className={`text-[10px] mt-1.5 flex items-center justify-end font-medium tracking-tight select-none
                  ${isMe ? "text-indigo-200/90" : "text-slate-400"}`}
              >
                {format(new Date(message.createdAt), "MMM dd 'at' h:mm a")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
  <div ref={messagesEndRef} />
</div>


       {/* adding message keyword input area */}
      {chat?.listing?.status === "active" ? (
  <form 
    onSubmit={handleSendMessage} 
    className="p-4 bg-white border-t border-slate-100 sm:rounded-b-xl"
  >
    <div className="flex items-end gap-2.5 max-w-full">
      <div className="flex-1 relative flex items-center">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          placeholder="Type a message..." 
          className="w-full flex-1 resize-none bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm transition-all max-h-32 min-h-[40px] focus:outline-none" 
          rows={1} 
        />
      </div>

      <button 
        type="submit" 
        disabled={!newMessage.trim() || isSending}  
        className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white p-2.5 rounded-xl disabled:opacity-40 disabled:pointer-events-none disabled:scale-100 transition-all shadow-sm flex items-center justify-center shrink-0 size-[40px]"
      >
        {isSending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 stroke-[2.5] ml-0.5" />
        )}
      </button> 
    </div>
    
    {/* Optional helper hint text built cleanly with slate tones */}
    <p className="text-[10px] font-medium text-slate-400 mt-2 ml-1 tracking-wide">
      Press Enter to send, Shift + Enter for new line
    </p>
  </form>
) : (
  <div className="p-5 bg-slate-50/50 border-t border-slate-100 sm:rounded-b-xl flex items-center justify-center">
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 px-4 py-2 rounded-xl text-xs font-medium tracking-wide shadow-sm animate-fade-in">
      <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
      {chat ? `This listing is currently ${chat?.listing?.status?.toLowerCase()}` : "Loading chat controls..."}
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default ChatBox;
