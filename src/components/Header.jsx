import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'

const Header = ({ onNavigation, onServiceClick, onRegionClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const navigation = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hizmetlerimiz', href: '#services' },
    { 
      name: 'Bölgeler', 
      href: '#regions',
      submenu: [
        { name: 'Anadolu Yakası', href: '#anatolian-side' },
        { name: 'Avrupa Yakası', href: '#european-side' },
        { name: 'Şehirler Arası', href: '#intercity' }
      ]
    },
    { name: 'Fiyatlar', href: '#pricing' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'İletişim', href: '#contact' }
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img 
              src="/images/logo/logo.png" 
              alt="Perpa Kurye Logo" 
              className="h-8 w-auto mr-2"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.name}
                            onClick={() => {
                              const regionMap = {
                                'Anadolu Yakası': 'anatolian-side',
                                'Avrupa Yakası': 'european-side',
                                'Şehirler Arası': 'intercity'
                              }
                              onRegionClick(regionMap[subitem.name])
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                          >
                            {subitem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      if (item.name === 'Ana Sayfa') onNavigation('home')
                      else if (item.name === 'Hizmetlerimiz') onNavigation('services')
                      else if (item.name === 'Fiyatlar') onNavigation('pricing')
                      else if (item.name === 'Hakkımızda') onNavigation('about')
                      else if (item.name === 'İletişim') onNavigation('contact')
                    }}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/905447835455?text=Kurye%20hizmeti%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Kurye Çağır
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.submenu.map((subitem) => (
                            <button
                              key={subitem.name}
                              onClick={() => {
                                const regionMap = {
                                  'Anadolu Yakası': 'anatolian-side',
                                  'Avrupa Yakası': 'european-side',
                                  'Şehirler Arası': 'intercity'
                                }
                                onRegionClick(regionMap[subitem.name])
                                setIsMenuOpen(false)
                                setOpenDropdown(null)
                              }}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                            >
                              {subitem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.name === 'Ana Sayfa') onNavigation('home')
                        else if (item.name === 'Hizmetlerimiz') onNavigation('services')
                        else if (item.name === 'Fiyatlar') onNavigation('pricing')
                        else if (item.name === 'Hakkımızda') onNavigation('about')
                        else if (item.name === 'İletişim') onNavigation('contact')
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              <a
                href="https://wa.me/905447835455?text=Kurye%20hizmeti%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Whatsapp ile Kurye Çağır
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header 