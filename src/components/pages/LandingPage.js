import React from 'react'
import Header from "../layouts/Header";
import Dashboard from './Dashboard';
import Events from './Events';

function LandingPage() {
  return (
    <div>
        {/* Headerr */}
        <Header />
        {/* Dashboard */}
        <Dashboard />
        {/* Events */}
        <Events />
    </div>
  )
}

export default LandingPage