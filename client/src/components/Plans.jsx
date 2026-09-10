import React from 'react'
import { PricingTable} from '@clerk/clerk-react'

const Plans = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30 max-md:px-4'>
      <div className='text-center'>
          <h2 className='text-gray-700 text-4xl font-semibold'>Choose Your Plan</h2>
          <p className='text-gray-500 text-sm max-w-md mx-auto'>Kickstart for free, upgrade smoothly as you scale. Find the ideal plan tailored to your content strategy.</p>
      </div>
      <div className='mt-14'>
        <PricingTable />
      </div>
    </div>
  )
}

export default Plans
