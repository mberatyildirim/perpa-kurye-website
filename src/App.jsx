import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import About from './components/About'
import Footer from './components/Footer'
import ServiceDetail from './components/ServiceDetail'
import RegionDetail from './components/RegionDetail'
import CourierForm from './components/CourierForm'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleNavigation = (page) => {
    setCurrentPage('home')
    setSelectedService(null)
    setSelectedRegion(null)
    
    // Ana sayfaya döndükten sonra ilgili bölgeye scroll yap
    setTimeout(() => {
      const element = document.getElementById(page)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleServiceClick = (service) => {
    // Check if it's a courier form request
    if (service === 'courier-form') {
      setCurrentPage('courier-form')
    } else {
      // Handle other service details
      setSelectedService(service)
      setCurrentPage('service-detail')
    }
  }

  const handleRegionClick = (region) => {
    setSelectedRegion(region)
    setCurrentPage('region-detail')
  }

  const handleBack = () => {
    setCurrentPage('home')
    setSelectedService(null)
    setSelectedRegion(null)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'service-detail':
        return <ServiceDetail service={selectedService} onBack={handleBack} />
      case 'region-detail':
        return <RegionDetail region={selectedRegion} onBack={handleBack} />
      case 'courier-form':
        return <CourierForm onBack={handleBack} />
      default:
        return (
          <>
            <Hero />
            <Services onServiceClick={handleServiceClick} />
            <Pricing />
            <About />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigation={handleNavigation}
        onServiceClick={handleServiceClick}
        onRegionClick={handleRegionClick}
      />
      {renderPage()}
      <Footer />
    </div>
  )
}

export default App 