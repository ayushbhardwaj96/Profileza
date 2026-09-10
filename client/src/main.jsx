import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' ;
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux';
import { store } from './app/store.js';

// import our publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{variables : {colorPrimary: '#4f46e5'}}}>
      <Provider store={store}>
            <App />
      </Provider>
    </ClerkProvider>
  </BrowserRouter>,
)
