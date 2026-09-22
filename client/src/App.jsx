import React from 'react'
import { Route, Routes  } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import MyListings from './pages/MyListings'
import ListingDetails from './pages/ListingDetails'
import ManageListing from './pages/ManageListing'
import Messages from './pages/Messages'
import MyOrders from './pages/MyOrders'
import Loading from './pages/Loading'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatBox from './components/ChatBox'
import {Toaster} from  'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AllListings from './pages/admin/AllListings'
import CredentialChange from './pages/admin/CredentialChange'
import CredentialVerify from './pages/admin/CredentialVerify'
import Transactions from './pages/admin/Transactions'
import Withdrawal from './pages/admin/Withdrawal'


const App = () => {

  const {pathname} = useLocation()

  return (
    <div>
      <Toaster  />
      {!pathname.includes('/admin') && <Navbar />}
     <Routes>

      {/* user routes */}

        <Route path='/' element={<Home />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/my-listings' element={<MyListings />} />
        <Route path='/listing/:listingId' element={<ListingDetails />} />
        <Route path='/create-listing' element={<ManageListing />} />
        <Route path='/edit-listing/:id' element={<ManageListing />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/loading' element={<Loading />} />

        {/* admin route */}
        <Route path='/admin' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='verify-credentials' element={<CredentialVerify />} />
            <Route path='transactions' element={<Transactions />} />
            <Route path='change-credentials' element={<CredentialChange />} />
            <Route path='list-listings' element={<AllListings />} />
            <Route path='withdrawal' element={<Withdrawal />} />
        </Route>
        

     </Routes>
     <ChatBox />

    </div>
  )
}

export default App
