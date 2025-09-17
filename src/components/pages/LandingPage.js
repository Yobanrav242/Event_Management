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
        <section id="about">
          <Dashboard />
        </section>
        {/* Events */}
        <section id='events'>
           <Events />
        </section>
    </div>
  )
}

export default LandingPage