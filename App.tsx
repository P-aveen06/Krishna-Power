
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Projects />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default App;
