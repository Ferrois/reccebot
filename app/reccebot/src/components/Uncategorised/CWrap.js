import React from 'react'



export default function CWrap(props) {
  return (
    <div className={`px-2 flex flex-col items-center  ${props.vertical?"justify-center h-screen":""}`}>
        {props.children}
    </div>
  )
}
