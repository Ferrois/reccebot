import React from 'react'

interface IMain{
    children?: React.ReactNode;
    vertical?: boolean;
}

export default function CWrap(props:IMain) {
  return (
    <div className={`px-2 flex flex-col items-center  ${props.vertical?"justify-center h-screen":""}`}>
        {props.children}
    </div>
  )
}
