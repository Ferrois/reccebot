import React from 'react'
import Base from '../template/Base'

const meta = {
    title: "Dashboard",
    description: "Dashboard page of the reccebot app",
}

export default function Dashboard() {
  return (
    <Base config = {meta}>
        <div>THis is the dashboard</div>
    </Base>
  )
}
