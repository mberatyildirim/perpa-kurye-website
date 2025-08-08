import React, { useState, useEffect } from 'react' // Import React hooks for state management
import { motion } from 'framer-motion' // Import motion for animations
import { Bike, Car, Package, MapPin, Send, ArrowLeft, Clock, Shield } from 'lucide-react' // Import icons
import { sendCourierData } from '../utils/googleSheets' // Import Google Sheets function

const CourierForm = ({ onBack }) => {
  // State management for form fields
  const [formData, setFormData] = useState({
    alinacakSemt: '', // State for pickup neighborhood
    teslimEdilecekSemt: '', // State for delivery neighborhood
    paketBoyutu: '', // State for package size
    aracTuru: '', // State for vehicle type
    paketTuru: '' // State for package type
  })

  // State for form validation errors
  const [errors, setErrors] = useState({
    alinacakSemt: '', // Error message for pickup neighborhood
    teslimEdilecekSemt: '', // Error message for delivery neighborhood
    paketBoyutu: '', // Error message for package size
    aracTuru: '', // Error message for vehicle type
    paketTuru: '' // Error message for package type
  })

  // State for neighborhoods data
  const [neighborhoods, setNeighborhoods] = useState([]) // Array to store neighborhood data
  const [filteredNeighborhoodsAlinacak, setFilteredNeighborhoodsAlinacak] = useState([]) // Filtered neighborhoods for pickup dropdown
  const [filteredNeighborhoodsTeslim, setFilteredNeighborhoodsTeslim] = useState([]) // Filtered neighborhoods for delivery dropdown

  // Load neighborhoods data on component mount
  useEffect(() => {
    // Fetch the scraped neighborhoods data from public folder
    fetch('/istanbul-neighborhoods.json')
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        setNeighborhoods(data) // Set neighborhoods data
        setFilteredNeighborhoodsAlinacak(data) // Initialize pickup filtered list
        setFilteredNeighborhoodsTeslim(data) // Initialize delivery filtered list
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
        setFilteredNeighborhoodsTeslim(neighborhoods) // Show all for delivery if search is empty
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
      setFilteredNeighborhoodsTeslim(filtered) // Update delivery filtered results
    }
  }

  // Function to validate form fields
  const validateForm = () => {
    const newErrors = {
      alinacakSemt: '', // Reset pickup error
      teslimEdilecekSemt: '', // Reset delivery error
      paketBoyutu: '', // Reset package error
      aracTuru: '', // Reset vehicle error
      paketTuru: '' // Reset package type error
    }
    
    let isValid = true // Track overall validation status
    
    // Validate each field
    if (!formData.alinacakSemt.trim()) {
      newErrors.alinacakSemt = 'Bu alanı doldurunuz' // Set pickup error
      isValid = false
    }
    
    if (!formData.teslimEdilecekSemt.trim()) {
      newErrors.teslimEdilecekSemt = 'Bu alanı doldurunuz' // Set delivery error
      isValid = false
    }
    
    if (!formData.paketBoyutu) {
      newErrors.paketBoyutu = 'Bu alanı doldurunuz' // Set package error
      isValid = false
    }
    
    if (!formData.aracTuru) {
      newErrors.aracTuru = 'Bu alanı doldurunuz' // Set vehicle error
      isValid = false
    }
    
    if (!formData.paketTuru) {
      newErrors.paketTuru = 'Bu alanı doldurunuz' // Set package type error
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
      await sendCourierData(formData) // Send form data to Google Sheets
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error) // Log error but continue
    }

    // Create WhatsApp message with form data
    const message = `Merhaba! Kurye hizmeti almak istiyorum.

Teslim Alınacak Semt: ${formData.alinacakSemt}
Teslim Edilecek Semt: ${formData.teslimEdilecekSemt}
Paket Boyutu: ${formData.paketBoyutu}
Araç Türü: ${formData.aracTuru}
Paket Türü: ${formData.paketTuru}`
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    
    // Create WhatsApp URL with phone number
    const whatsappUrl = `https://wa.me/905447835455?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank') // Open WhatsApp with pre-filled message
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Geri Dön</span>
          </button>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Kurye Hizmeti
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            İstanbul'un her noktasına hızlı ve güvenli kurye hizmeti
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Alınacak Semt */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                <MapPin className="inline h-4 w-4 mr-2" />
                TeslimAlınacak Semt
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

            {/* Teslim Edilecek Semt */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                <MapPin className="inline h-4 w-4 mr-2" />
                Teslim Edilecek Semt
              </label>
              <input
                type="text"
                value={formData.teslimEdilecekSemt}
                onChange={(e) => {
                  handleInputChange('teslimEdilecekSemt', e.target.value) // Update delivery neighborhood
                  filterNeighborhoods(e.target.value, 'teslim') // Filter neighborhoods
                  // Clear error when user starts typing
                  if (errors.teslimEdilecekSemt) {
                    setErrors(prev => ({ ...prev, teslimEdilecekSemt: '' }))
                  }
                }}
                placeholder="Semt seçin..."
                className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                  errors.teslimEdilecekSemt ? 'border-red-400' : 'border-white/30'
                }`}
              />
              {errors.teslimEdilecekSemt && (
                <p className="text-red-400 text-sm mt-1">{errors.teslimEdilecekSemt}</p>
              )}
              {/* Dropdown for filtered neighborhoods */}
              {formData.teslimEdilecekSemt && filteredNeighborhoodsTeslim.length > 0 && (
                <div className="relative z-50">
                  <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white rounded-lg shadow-lg border">
                    {filteredNeighborhoodsTeslim.slice(0, 10).map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          handleInputChange('teslimEdilecekSemt', `${item.mahalle} Mh. - ${item.ilce}`) // Set selected neighborhood with Mh. suffix
                          setFilteredNeighborhoodsTeslim([]) // Clear delivery dropdown
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
                <option value="Küçük">Küçük</option>
                <option value="Orta">Orta</option>
                <option value="Büyük">Büyük</option>
              </select>
              {errors.paketBoyutu && (
                <p className="text-red-400 text-sm mt-1">{errors.paketBoyutu}</p>
              )}
            </div>

            {/* Araç Türü */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Araç Türü
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('aracTuru', 'Motor') // Set motorcycle
                    // Clear error when user selects an option
                    if (errors.aracTuru) {
                      setErrors(prev => ({ ...prev, aracTuru: '' }))
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.aracTuru === 'Motor'
                      ? 'border-secondary-400 bg-secondary-400/20'
                      : errors.aracTuru 
                        ? 'border-red-400 bg-white/10'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Bike className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Motor</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('aracTuru', 'Araba') // Set car
                    // Clear error when user selects an option
                    if (errors.aracTuru) {
                      setErrors(prev => ({ ...prev, aracTuru: '' }))
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.aracTuru === 'Araba'
                      ? 'border-secondary-400 bg-secondary-400/20'
                      : errors.aracTuru 
                        ? 'border-red-400 bg-white/10'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Car className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Araba</span>
                </button>
              </div>
              {errors.aracTuru && (
                <p className="text-red-400 text-sm mt-1">{errors.aracTuru}</p>
              )}
            </div>

            {/* Paket Türü */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Paket Türü
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('paketTuru', 'Standart') // Set standard package
                    // Clear error when user selects an option
                    if (errors.paketTuru) {
                      setErrors(prev => ({ ...prev, paketTuru: '' }))
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.paketTuru === 'Standart'
                      ? 'border-secondary-400 bg-secondary-400/20'
                      : errors.paketTuru 
                        ? 'border-red-400 bg-white/10'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Standart</span>
                  <span className="text-xs text-white/60">+0₺</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('paketTuru', 'Express') // Set express package
                    // Clear error when user selects an option
                    if (errors.paketTuru) {
                      setErrors(prev => ({ ...prev, paketTuru: '' }))
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.paketTuru === 'Express'
                      ? 'border-secondary-400 bg-secondary-400/20'
                      : errors.paketTuru 
                        ? 'border-red-400 bg-white/10'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Express</span>
                  <span className="text-xs text-white/60">+50₺</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('paketTuru', 'VIP') // Set VIP package
                    // Clear error when user selects an option
                    if (errors.paketTuru) {
                      setErrors(prev => ({ ...prev, paketTuru: '' }))
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.paketTuru === 'VIP'
                      ? 'border-secondary-400 bg-secondary-400/20'
                      : errors.paketTuru 
                        ? 'border-red-400 bg-white/10'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">VIP</span>
                  <span className="text-xs text-white/60">+100₺</span>
                </button>
              </div>
              {errors.paketTuru && (
                <p className="text-red-400 text-sm mt-1">{errors.paketTuru}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary-400 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-8"
            >
              <Send className="h-5 w-5" />
              <span>Fiyat Al</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default CourierForm 