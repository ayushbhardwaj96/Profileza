import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { BoxIcon, GripIcon, ListIcon, Menu, MessageCircleMoreIcon, XIcon } from 'lucide-react';
import { useClerk, useUser , UserButton } from '@clerk/clerk-react';


const Navbar = () => {

    const  {user} = useUser()
    const {openSignIn} = useClerk()
    
    const [menuOpen, setMenuOpen] = React.useState(false)
    const navigate = useNavigate()

  return (
    <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                    
                   <img onClick={() => {navigate('/'); scrollTo(0,0)}} src={assets.logo} alt="logo" className='h-11 cursor-pointer' />

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        
{/* Navigation Menu Link Array */}
<div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-700 font-medium'>
    
    <NavLink 
    to='/' 
    onClick={() => scrollTo(0, 0)}
    className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-lime-500 font-semibold' : 'text-gray-700'}`}
> 
    Home 
</NavLink>

<NavLink 
    to='/marketplace'  
    onClick={() => scrollTo(0, 0)}
    className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-lime-500 font-semibold' : 'text-gray-700'}`}
> 
    Marketplace 
</NavLink>

{user ? (
    <NavLink 
        to='/messages'  
        onClick={() => scrollTo(0, 0)}
        className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-lime-500 font-semibold' : 'text-gray-700'}`}
    > 
        Messages 
    </NavLink>
) : (
    <button onClick={openSignIn} className='text-gray-700 cursor-pointer font-medium'> Messages </button>
)}

{user ? (
    <NavLink 
        to='/my-listings'  
        onClick={() => scrollTo(0, 0)}
        className={({ isActive }) => `transition-colors duration-200 ${isActive ? 'text-lime-500 font-semibold' : 'text-gray-700'}`}
    > 
        My Listings 
    </NavLink>
) : (
    <button onClick={openSignIn} className='text-gray-700 cursor-pointer font-medium'> My Listings </button>
)}


</div>

 

                    </div>

                    {!user ? (<div>
                        <button onClick={openSignIn} className='max-sm:hidden cursor-pointer px-8 py-2 bg-gradient-to-r from-lime-400 via-emerald-400 to-purple-600 hover:from-lime-500 hover:via-emerald-500 hover:to-purple-700 text-slate-900 font-bold
 transition text-white rounded-full'>Login</button>
   <Menu onClick={() => setMenuOpen(true)} className='sm:hidden cursor-pointer' />

                        
                    </div>) : (
                        <UserButton> 
                            <UserButton.MenuItems>
                                <UserButton.Action  label='Marketplace' labelIcon={<GripIcon size={16} />} onClick={() => navigate('/marketplace')} />
                            </UserButton.MenuItems>

                            <UserButton.MenuItems>
                                <UserButton.Action  label='Messages' labelIcon={<MessageCircleMoreIcon size={16} />} onClick={() => navigate('/messages')} />
                            </UserButton.MenuItems>

                             <UserButton.MenuItems>
                                <UserButton.Action  label='My Listings' labelIcon={<ListIcon size={16} />} onClick={() => navigate('/my-listings')} />
                            </UserButton.MenuItems>

                             <UserButton.MenuItems>
                                <UserButton.Action  label='My Orders' labelIcon={<BoxIcon size={16} />} onClick={() => navigate('/my-orders')} />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
 

                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                         
                         <Link to='/marketplace'  onClick={() => setMenuOpen(false)}> Marketplace </Link>
                         <button onClick={openSignIn} > Messages </button>
                         <button onClick={openSignIn} > My Listings </button>

                        <button onClick={openSignIn} className=' cursor-pointer px-8 py-2 bg-gradient-to-r from-lime-400 via-emerald-400 to-purple-600 hover:from-lime-500 hover:via-emerald-500 hover:to-purple-700 text-slate-900 font-bold
 transition text-white rounded-full'>Login</button>
                      <XIcon onClick={() => setMenuOpen(false)} className='absolute size-7 right-6 top-6 text-slate-400 hover:text-purple-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer'/>
                    </div>
                </div>
            </nav>
  )
}

export default Navbar
