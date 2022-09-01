import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function ToastElem() {
  return (
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={false}
        limit={4}
      />
  )
}
