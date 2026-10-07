import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import EngineeringDetails from './components/EngineeringDetails';
import ActiveAerodynamics from './components/ActiveAerodynamics';
import CockpitCraftsmanship from './components/CockpitCraftsmanship';
import PerformanceTelemetry from './components/PerformanceTelemetry';
import CarConfigurator from './components/CarConfigurator';
import FinanceCalculator from './components/FinanceCalculator';
import ReservationConcierge from './components/ReservationConcierge';
import SpecificationsTable from './components/SpecificationsTable';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('anatomy');
  const [configuredPrice, setConfiguredPrice] = useState(245000);
  const [configuredTrim, setConfiguredTrim] = useState('Turbo S Heritage');

  const handleProceedToReserve = (price, trim) => {
    setConfiguredPrice(price);
    setConfiguredTrim(trim);
    const reserveSection = document.getElementById('reserve');
    if (reserveSection) {
      reserveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Top Apple-Style Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 1. Hero Scrollytelling Section (500vh height, 180 frames canvas scrub, NO buttons) */}
      <HeroCanvas />

      {/* 2. Deep Engineering & Powertrain Details Section */}
      <EngineeringDetails />

      {/* 3. Active Aerodynamics & Wind Tunnel Simulation */}
      <ActiveAerodynamics />

      {/* 4. Cockpit & Interior Craftsmanship */}
      <CockpitCraftsmanship />

      {/* 5. Performance Telemetry & Benchmark Comparison */}
      <PerformanceTelemetry />

      {/* 6. Bespoke Configurator & Dynamic Price Engine */}
      <CarConfigurator
        onProceedToReserve={handleProceedToReserve}
      />

      {/* 7. Financing & Acquisition Calculator */}
      <FinanceCalculator currentMsrp={configuredPrice} />

      {/* 8. Exclusive Allocation Reservation Concierge */}
      <ReservationConcierge
        configuredPrice={configuredPrice}
        configuredTrim={configuredTrim}
      />

      {/* 9. Comprehensive Technical Spec Sheet */}
      <SpecificationsTable />

      {/* Footer */}
      <Footer />
    </div>
  );
}
