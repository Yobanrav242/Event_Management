import React from 'react'
import Dashboard from './Dashboard';
import Events from './events/Events';
import Footer from '../layouts/Footer';

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
        {/* footer */}
        <Footer />
    </div>
  )
}

export default LandingPage