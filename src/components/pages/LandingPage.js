import React from 'react'
import Dashboard from './Dashboard';
import Events from './events/Events';

function LandingPage() {
  return (
    <div>
        
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