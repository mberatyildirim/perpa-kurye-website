import React, { useState, useEffect } from 'react'
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
  const [scrollTarget, setScrollTarget] = useState(null)

  // useEffect to handle scrolling after page renders
  useEffect(() => {
    if (scrollTarget && currentPage === 'home') {
      console.log('useEffect: Scrolling to target:', scrollTarget) // Debug log
      const scrollToElement = () => {
        const element = document.getElementById(scrollTarget)
        console.log('Element found:', element) // Debug log
        if (element) {
          const headerHeight = 80
          const elementPosition = element.offsetTop - headerHeight
          console.log('Scrolling to position:', elementPosition) // Debug log
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth'
          })
          setScrollTarget(null) // Clear scroll target after scrolling
        }
      }

      // Multiple attempts to ensure element is rendered
      const timeouts = [100, 300, 500]
      timeouts.forEach(delay => {
        setTimeout(scrollToElement, delay)
      })
    }
  }, [currentPage, scrollTarget])

  const handleNavigation = (page) => {
    console.log('handleNavigation called with page:', page) // Debug log
    setCurrentPage('home')
    setSelectedService(null)
    setSelectedRegion(null)
    setScrollTarget(page) // Set scroll target for useEffect to handle
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
    
    // Scroll to top after page change
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  const handleRegionClick = (region) => {
    setSelectedRegion(region)
    setCurrentPage('region-detail')
    
    // Scroll to top after page change
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  const handleBack = () => {
    setCurrentPage('home')
    setSelectedService(null)
    setSelectedRegion(null)
    
    // Scroll to top when going back to home
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 100)
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