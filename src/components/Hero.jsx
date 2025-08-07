import React, { useState, useEffect } from 'react' // Import useState and useEffect for form state management
import { motion } from 'framer-motion' // Import motion for animations
import { Bike, Clock, Shield, MapPin, Phone, Package, Car, Send } from 'lucide-react' // Import additional icons for the form
import { sendHeroData } from '../utils/googleSheets' // Import Google Sheets function

const Hero = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    alinacakSemt: '', // State for pickup neighborhood
    verilecekSemt: '', // State for delivery neighborhood
    paketBoyutu: '', // State for package size
    kuryeTipi: '' // State for courier type (motorcycle/car)
  })

  // State for form validation errors
  const [errors, setErrors] = useState({
    alinacakSemt: '', // Error message for pickup neighborhood
    verilecekSemt: '', // Error message for delivery neighborhood
    paketBoyutu: '', // Error message for package size
    kuryeTipi: '' // Error message for courier type
  })

  // State for neighborhoods data
  const [neighborhoods, setNeighborhoods] = useState([]) // Array to store neighborhood data
  const [filteredNeighborhoodsAlinacak, setFilteredNeighborhoodsAlinacak] = useState([]) // Filtered neighborhoods for pickup dropdown
  const [filteredNeighborhoodsVerilecek, setFilteredNeighborhoodsVerilecek] = useState([]) // Filtered neighborhoods for delivery dropdown

      // Load neighborhoods data on component mount
    useEffect(() => {
      // Fetch the scraped neighborhoods data from public folder
      fetch('/istanbul-neighborhoods.json')
        .then(response => response.json()) // Parse JSON response
        .then(data => {
          setNeighborhoods(data) // Set neighborhoods data
          setFilteredNeighborhoodsAlinacak(data) // Initialize pickup filtered list
          setFilteredNeighborhoodsVerilecek(data) // Initialize delivery filtered list
        })
        .catch(error => {
          console.error('Error loading neighborhoods:', error) // Log error if data loading fails
        })
    }, [])

  // Function to handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev, // Spread previous state
      [field]: value // Update specific field
    }))
  }

  // Function to filter neighborhoods based on search input
  const filterNeighborhoods = (searchTerm, field) => {
    if (!searchTerm.trim()) {
      if (field === 'alinacak') {
        setFilteredNeighborhoodsAlinacak(neighborhoods) // Show all for pickup if search is empty
      } else {
        setFilteredNeighborhoodsVerilecek(neighborhoods) // Show all for delivery if search is empty
      }
      return
    }
    
    // Remove "Mh." from search term for better matching
    const cleanSearchTerm = searchTerm.toLowerCase().replace('mh.', '').replace('mh', '').trim()
    
    const filtered = neighborhoods.filter(item => 
      item.mahalle.toLowerCase().includes(cleanSearchTerm) || // Filter by neighborhood name
      item.ilce.toLowerCase().includes(cleanSearchTerm) || // Filter by district name
      `${item.mahalle} Mh.`.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by neighborhood with Mh.
    )
    
    // Update the appropriate filtered state based on field
    if (field === 'alinacak') {
      setFilteredNeighborhoodsAlinacak(filtered) // Update pickup filtered results
    } else {
      setFilteredNeighborhoodsVerilecek(filtered) // Update delivery filtered results
    }
  }

  // Function to validate form fields
  const validateForm = () => {
    const newErrors = {
      alinacakSemt: '', // Reset pickup error
      verilecekSemt: '', // Reset delivery error
      paketBoyutu: '', // Reset package error
      kuryeTipi: '' // Reset courier error
    }
    
    let isValid = true // Track overall validation status
    
    // Validate each field
    if (!formData.alinacakSemt.trim()) {
      newErrors.alinacakSemt = 'Bu alanı doldurunuz' // Set pickup error
      isValid = false
    }
    
    if (!formData.verilecekSemt.trim()) {
      newErrors.verilecekSemt = 'Bu alanı doldurunuz' // Set delivery error
      isValid = false
    }
    
    if (!formData.paketBoyutu) {
      newErrors.paketBoyutu = 'Bu alanı doldurunuz' // Set package error
      isValid = false
    }
    
    if (!formData.kuryeTipi) {
      newErrors.kuryeTipi = 'Bu alanı doldurunuz' // Set courier error
      isValid = false
    }
    
    setErrors(newErrors) // Update error state
    return isValid // Return validation result
  }

  // Function to generate WhatsApp message and redirect
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission
    
    // Validate form data
    if (!validateForm()) {
      return // Stop if validation fails
    }

    // Send data to Google Sheets
    try {
      await sendHeroData(formData) // Send form data to Google Sheets
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error) // Log error but continue
    }

    // Create WhatsApp message with form data
    const message = `Merhaba! 
    
${formData.alinacakSemt}'den ${formData.verilecekSemt}'e ${formData.paketBoyutu} şekilde ${formData.kuryeTipi} kurye hizmeti almak istiyorum.`
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    
    // Create WhatsApp URL with phone number
    const whatsappUrl = `https://wa.me/905447835455?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank') // Open WhatsApp with pre-filled message
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero/hero-bg.jpg" 
          alt="Perpa Kurye Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                <span className="block">PERPA KURYE</span>
                <span className="block text-2xl lg:text-3xl font-medium text-primary-100 mt-2">
                  Daima Zamanında
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg lg:text-xl text-primary-100 max-w-2xl"
              >
                İstanbul'un her noktasında hızlı, güvenli ve profesyonel kurye hizmeti. 
                7/24 yanınızdayız!
              </motion.p>
            </div>

            {/* Kurye Çağır Formu */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Alınacak Semt */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Alınacak Semt
                  </label>
                  <input
                    type="text"
                    value={formData.alinacakSemt}
                    onChange={(e) => {
                      handleInputChange('alinacakSemt', e.target.value) // Update pickup neighborhood
                      filterNeighborhoods(e.target.value, 'alinacak') // Filter neighborhoods
                      // Clear error when user starts typing
                      if (errors.alinacakSemt) {
                        setErrors(prev => ({ ...prev, alinacakSemt: '' }))
                      }
                    }}
                    placeholder="Semt seçin..."
                    className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                      errors.alinacakSemt ? 'border-red-400' : 'border-white/30'
                    }`}
                  />
                  {errors.alinacakSemt && (
                    <p className="text-red-400 text-sm mt-1">{errors.alinacakSemt}</p>
                  )}
                  {/* Dropdown for filtered neighborhoods */}
                  {formData.alinacakSemt && filteredNeighborhoodsAlinacak.length > 0 && (
                    <div className="relative z-50">
                      <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white rounded-lg shadow-lg border">
                        {filteredNeighborhoodsAlinacak.slice(0, 10).map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              handleInputChange('alinacakSemt', `${item.mahalle} Mh. - ${item.ilce}`) // Set selected neighborhood with Mh. suffix
                              setFilteredNeighborhoodsAlinacak([]) // Clear pickup dropdown
                            }}
                            className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                          >
                            {item.mahalle} Mh. - {item.ilce}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Verilecek Semt */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Verilecek Semt
                  </label>
                  <input
                    type="text"
                    value={formData.verilecekSemt}
                    onChange={(e) => {
                      handleInputChange('verilecekSemt', e.target.value) // Update delivery neighborhood
                      filterNeighborhoods(e.target.value, 'verilecek') // Filter neighborhoods
                      // Clear error when user starts typing
                      if (errors.verilecekSemt) {
                        setErrors(prev => ({ ...prev, verilecekSemt: '' }))
                      }
                    }}
                    placeholder="Semt seçin..."
                    className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                      errors.verilecekSemt ? 'border-red-400' : 'border-white/30'
                    }`}
                  />
                  {errors.verilecekSemt && (
                    <p className="text-red-400 text-sm mt-1">{errors.verilecekSemt}</p>
                  )}
                  {/* Dropdown for filtered neighborhoods */}
                  {formData.verilecekSemt && filteredNeighborhoodsVerilecek.length > 0 && (
                    <div className="relative z-50">
                      <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white rounded-lg shadow-lg border">
                        {filteredNeighborhoodsVerilecek.slice(0, 10).map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              handleInputChange('verilecekSemt', `${item.mahalle} Mh. - ${item.ilce}`) // Set selected neighborhood with Mh. suffix
                              setFilteredNeighborhoodsVerilecek([]) // Clear delivery dropdown
                            }}
                            className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                          >
                            {item.mahalle} Mh. - {item.ilce}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Paket Boyutu */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    <Package className="inline h-4 w-4 mr-2" />
                    Paket Boyutu
                  </label>
                  <select
                    value={formData.paketBoyutu}
                    onChange={(e) => {
                      handleInputChange('paketBoyutu', e.target.value) // Update package size
                      // Clear error when user selects an option
                      if (errors.paketBoyutu) {
                        setErrors(prev => ({ ...prev, paketBoyutu: '' }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                      errors.paketBoyutu ? 'border-red-400' : 'border-white/30'
                    }`}
                  >
                    <option value="">Paket boyutu seçin</option>
                                          <option value="Küçük Paket">Küçük Paket</option>
                      <option value="Orta Paket">Orta Paket</option>
                      <option value="Büyük Paket">Büyük Paket</option>
                    </select>
                    {errors.paketBoyutu && (
                      <p className="text-red-400 text-sm mt-1">{errors.paketBoyutu}</p>
                    )}
                  </div>

                {/* Kurye Tipi */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Kurye Tipi
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('kuryeTipi', 'Motorlu') // Set motorcycle courier
                        // Clear error when user selects an option
                        if (errors.kuryeTipi) {
                          setErrors(prev => ({ ...prev, kuryeTipi: '' }))
                        }
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.kuryeTipi === 'Motorlu'
                          ? 'border-secondary-400 bg-secondary-400/20'
                          : errors.kuryeTipi 
                            ? 'border-red-400 bg-white/10'
                            : 'border-white/30 bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Bike className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Motorlu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleInputChange('kuryeTipi', 'Arabalı') // Set car courier
                        // Clear error when user selects an option
                        if (errors.kuryeTipi) {
                          setErrors(prev => ({ ...prev, kuryeTipi: '' }))
                        }
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.kuryeTipi === 'Arabalı'
                          ? 'border-secondary-400 bg-secondary-400/20'
                          : errors.kuryeTipi 
                            ? 'border-red-400 bg-white/10'
                            : 'border-white/30 bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <Car className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Arabalı</span>
                    </button>
                  </div>
                  {errors.kuryeTipi && (
                    <p className="text-red-400 text-sm mt-1">{errors.kuryeTipi}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-secondary-400 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Fiyat Al</span>
                </button>
              </form>
            </motion.div>

            {/* Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-secondary-400" />
                <span className="text-sm">30 dk içinde</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-secondary-400" />
                <span className="text-sm">Güvenli teslimat</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-secondary-400" />
                <span className="text-sm">Tüm İstanbul</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-20">
              <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <div className="text-center space-y-6">
                                    {/* Modern Illustration */}
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-26 h-26 bg-white/20 rounded-full flex items-center justify-center">
                        <img 
                          src="/images/logo/lisansli-hizmet.svg" 
                          alt="Lisanslı Hizmet" 
                          className="h-24 w-24"
                        />
                      </div>
                    </div>
                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-accent-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Clock className="h-4 w-4 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-2 -left-2 w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Shield className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Hızlı Teslimat</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      İstanbul'un her noktasına 30 dakika içinde kurye hizmeti
                    </p>
                    <div className="flex justify-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">300₺</div>
                        <div className="text-xs text-white/70">Başlangıç</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">7/24</div>
                        <div className="text-xs text-white/70">Hizmet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 