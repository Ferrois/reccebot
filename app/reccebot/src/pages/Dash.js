import React from 'react'
import CWrap from '../components/Uncategorised/CWrap'
import Base from '../template/Base'
import RadarUI from "./../features/RadarUI";

const meta = {
    title: "Dashboard",
    description: "Dashboard page of the reccebot app",
}

export default function Dashboard() {
  return (
    <Base config = {meta}>
        <CWrap>
          This is the Dashboard
          <RadarUI/>
        </CWrap>
    </Base>
  )
}
