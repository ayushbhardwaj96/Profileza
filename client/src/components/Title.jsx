import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='flex flex-col items-center text-center gap-3 mb-10 max-w-2xl mx-auto px-4'>
      {/* Premium Gradient Title */}
      <h3 className='text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent sm:text-4xl'>
        {title}
      </h3>
      
      {/* Clean, Readable Description */}
      {description && (
        <p className='text-gray-600 text-base sm:text-lg leading-relaxed font-medium antialiased max-w-[500px]'>
          {description}
        </p>
      )}
    </div>
  )
}

export default Title
