import React from 'react'

export default function DashSection({ children }) {
  return (
    <div className='bg-gray-850 shadow-md rounded-md my-2 mx-1 p-2 lg:col-span-1 sm:row-span-1'>
      {children}
    </div>
  )
}
