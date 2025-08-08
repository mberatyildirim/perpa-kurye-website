import React, { useState, useEffect } from 'react' // Import useState and useEffect for form state management
import { motion } from 'framer-motion' // Import motion for animations
import { Bike, Clock, Shield, MapPin, Phone, Package, Car, Send, Pill, Zap, MessageCircle } from 'lucide-react' // Import additional icons for the form
import { sendHeroData } from '../utils/googleSheets' // Import Google Sheets function

const Hero = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    hizmetTuru: 'Kurye', // State for service type - Default to Kurye
    alinacakSemt: '', // State for pickup neighborhood
    verilecekSemt: '', // State for delivery neighborhood
    paketBoyutu: '', // State for package size
    kuryeTipi: '', // State for courier type (motorcycle/car)
    siziAlacagimizSemt: '', // State for pickup location
    valeTarih: '', // State for valet date
    valeSaat: '' // State for valet time
  })

  // State for form validation errors
  const [errors, setErrors] = useState({
    hizmetTuru: '', // Error message for service type
    alinacakSemt: '', // Error message for pickup neighborhood
    verilecekSemt: '', // Error message for delivery neighborhood
    paketBoyutu: '', // Error message for package size
    kuryeTipi: '', // Error message for courier type
    siziAlacagimizSemt: '', // Error message for pickup location
    valeTarih: '', // Error message for valet date
    valeSaat: '' // Error message for valet time
  })

  // State for neighborhoods data
  const [neighborhoods, setNeighborhoods] = useState([]) // Array to store neighborhood data
  const [filteredNeighborhoodsAlinacak, setFilteredNeighborhoodsAlinacak] = useState([]) // Filtered neighborhoods for pickup dropdown
  const [filteredNeighborhoodsVerilecek, setFilteredNeighborhoodsVerilecek] = useState([]) // Filtered neighborhoods for delivery dropdown
  const [filteredNeighborhoodsSiziAlacagimiz, setFilteredNeighborhoodsSiziAlacagimiz] = useState([]) // Filtered neighborhoods for valet pickup dropdown

      // Load neighborhoods data on component mount
    useEffect(() => {
      // Fetch the scraped neighborhoods data from public folder
      fetch('/istanbul-neighborhoods.json')
        .then(response => response.json()) // Parse JSON response
        .then(data => {
          setNeighborhoods(data) // Set neighborhoods data
          setFilteredNeighborhoodsAlinacak(data) // Initialize pickup filtered list
          setFilteredNeighborhoodsVerilecek(data) // Initialize delivery filtered list
          setFilteredNeighborhoodsSiziAlacagimiz(data) // Initialize valet pickup filtered list
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
      } else if (field === 'siziAlacagimiz') {
        setFilteredNeighborhoodsSiziAlacagimiz(neighborhoods) // Show all for valet pickup if search is empty
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
    } else if (field === 'siziAlacagimiz') {
      setFilteredNeighborhoodsSiziAlacagimiz(filtered) // Update valet pickup filtered results
    } else {
      setFilteredNeighborhoodsVerilecek(filtered) // Update delivery filtered results
    }
  }

  // Function to validate form fields
  const validateForm = () => {
    const newErrors = {
      hizmetTuru: '', // Reset service type error
      alinacakSemt: '', // Reset pickup error
      verilecekSemt: '', // Reset delivery error
      paketBoyutu: '', // Reset package error
      kuryeTipi: '', // Reset courier error
      siziAlacagimizSemt: '', // Reset pickup location error
      valeTarih: '', // Reset valet date error
      valeSaat: '' // Reset valet time error
    }
    
    let isValid = true // Track overall validation status
    
    // Validate service type
    if (!formData.hizmetTuru) {
      newErrors.hizmetTuru = 'Bu alanı doldurunuz' // Set service type error
      isValid = false
    }
    
    // Validate based on service type
    if (formData.hizmetTuru === 'Kurye') {
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
    } else if (formData.hizmetTuru === 'Eczaneden Getir') {
      if (!formData.verilecekSemt.trim()) {
        newErrors.verilecekSemt = 'Bu alanı doldurunuz' // Set delivery error
        isValid = false
      }
    } else if (formData.hizmetTuru === 'Vale') {
      if (!formData.siziAlacagimizSemt.trim()) {
        newErrors.siziAlacagimizSemt = 'Bu alanı doldurunuz' // Set pickup location error
        isValid = false
      }
      if (!formData.verilecekSemt.trim()) {
        newErrors.verilecekSemt = 'Bu alanı doldurunuz' // Set delivery error
        isValid = false
      }
      if (!formData.valeTarih) {
        newErrors.valeTarih = 'Bu alanı doldurunuz' // Set valet date error
        isValid = false
      }
      if (!formData.valeSaat) {
        newErrors.valeSaat = 'Bu alanı doldurunuz' // Set valet time error
        isValid = false
      }
      if (!formData.kuryeTipi) {
        newErrors.kuryeTipi = 'Bu alanı doldurunuz' // Set courier error
        isValid = false
      }
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

    // Create WhatsApp message based on service type
    let message = `Merhaba! ${formData.hizmetTuru} hizmeti almak istiyorum.\n\n`
    
    if (formData.hizmetTuru === 'Kurye') {
      message += `${formData.alinacakSemt}'den ${formData.verilecekSemt}'e ${formData.paketBoyutu} şekilde ${formData.kuryeTipi} kurye hizmeti.`
    } else if (formData.hizmetTuru === 'Eczaneden Getir') {
      message += `İlacın Teslim Edileceği Semt: ${formData.verilecekSemt}`
    } else if (formData.hizmetTuru === 'Vale') {
      message += `Sizi Alacağımız Semt: ${formData.siziAlacagimizSemt}\nSizi Götüreceğimiz Semt: ${formData.verilecekSemt}\nTarih: ${formData.valeTarih}\nSaat: ${formData.valeSaat}\nAraç Türü: ${formData.kuryeTipi}`
    }
    
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl lg:text-5xl font-bold leading-tight"
              >
                <span className="block">PERPA KURYE</span>
                <span className="block text-xl lg:text-2xl font-medium text-primary-100 mt-1">
                  Daima Zamanında
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base lg:text-lg text-primary-100 max-w-2xl"
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
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Hizmet Türü */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white">
                    Hizmet Türü
                  </label>
                                  <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange('hizmetTuru', 'Kurye') // Set courier service
                      // Clear error when user selects an option
                      if (errors.hizmetTuru) {
                        setErrors(prev => ({ ...prev, hizmetTuru: '' }))
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.hizmetTuru === 'Kurye'
                        ? 'border-secondary-400 bg-secondary-400/20'
                        : errors.hizmetTuru 
                          ? 'border-red-400 bg-white/10'
                          : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                      <Bike className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Kurye</span>
                    </button>
                                      <button
                    type="button"
                    onClick={() => {
                      handleInputChange('hizmetTuru', 'Eczaneden Getir') // Set pharmacy service
                      // Clear error when user selects an option
                      if (errors.hizmetTuru) {
                        setErrors(prev => ({ ...prev, hizmetTuru: '' }))
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.hizmetTuru === 'Eczaneden Getir'
                        ? 'border-secondary-400 bg-secondary-400/20'
                        : errors.hizmetTuru 
                          ? 'border-red-400 bg-white/10'
                          : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                      <Pill className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Eczaneden Getir</span>
                    </button>
                                      <button
                    type="button"
                    onClick={() => {
                      handleInputChange('hizmetTuru', 'Vale') // Set valet service
                      // Clear error when user selects an option
                      if (errors.hizmetTuru) {
                        setErrors(prev => ({ ...prev, hizmetTuru: '' }))
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.hizmetTuru === 'Vale'
                        ? 'border-secondary-400 bg-secondary-400/20'
                        : errors.hizmetTuru 
                          ? 'border-red-400 bg-white/10'
                          : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                      <Car className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm">Vale</span>
                    </button>
                  </div>
                  {errors.hizmetTuru && (
                    <p className="text-red-400 text-sm mt-1">{errors.hizmetTuru}</p>
                  )}
                </div>

                {/* Dynamic Form Fields Based on Service Type */}
                {formData.hizmetTuru === 'Kurye' && (
                  <>
                    {/* Alınacak Semt */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-white">
                        <MapPin className="inline h-4 w-4 mr-2" />
                        Teslim Alınacak Semt
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

                    {/* Teslim Edilecek Semt - For Kurye only */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-white">
                        <MapPin className="inline h-4 w-4 mr-2" />
                        Teslim Edilecek Semt
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
                    <div className="space-y-1">
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

                    {/* Kurye Tipi */}
                    <div className="space-y-1">
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
                  </>
                )}



                {/* Vale Fields */}
                {formData.hizmetTuru === 'Vale' && (
                  <>
                    {/* Sizi Alacağımız Semt */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-white">
                        <MapPin className="inline h-4 w-4 mr-2" />
                        Sizi Alacağımız Semt
                      </label>
                      <input
                        type="text"
                        value={formData.siziAlacagimizSemt}
                        onChange={(e) => {
                          handleInputChange('siziAlacagimizSemt', e.target.value) // Update pickup location
                          filterNeighborhoods(e.target.value, 'siziAlacagimiz') // Filter neighborhoods
                          // Clear error when user starts typing
                          if (errors.siziAlacagimizSemt) {
                            setErrors(prev => ({ ...prev, siziAlacagimizSemt: '' }))
                          }
                        }}
                        placeholder="Sizi alacağımız semti yazın..."
                        className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                          errors.siziAlacagimizSemt ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                      {errors.siziAlacagimizSemt && (
                        <p className="text-red-400 text-sm mt-1">{errors.siziAlacagimizSemt}</p>
                      )}
                      {/* Dropdown for filtered neighborhoods */}
                      {formData.siziAlacagimizSemt && filteredNeighborhoodsSiziAlacagimiz && filteredNeighborhoodsSiziAlacagimiz.length > 0 && (
                        <div className="relative z-50">
                          <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white rounded-lg shadow-lg border">
                            {filteredNeighborhoodsSiziAlacagimiz.slice(0, 10).map((item, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  handleInputChange('siziAlacagimizSemt', `${item.mahalle} Mh. - ${item.ilce}`) // Set selected neighborhood with Mh. suffix
                                  setFilteredNeighborhoodsSiziAlacagimiz([]) // Clear pickup dropdown
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

                    {/* Sizi Götüreceğimiz Semt */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-white">
                        <MapPin className="inline h-4 w-4 mr-2" />
                        Sizi Götüreceğimiz Semt
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
                        placeholder="Sizi götüreceğimiz semti yazın..."
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

                    {/* Sizi Alacağımız Tarih ve Saat */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Tarih */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-white">
                          <Clock className="inline h-4 w-4 mr-2" />
                          Tarih
                        </label>
                        <input
                          type="date"
                          value={formData.valeTarih}
                          min={new Date().toISOString().split('T')[0]} // Minimum today
                          onChange={(e) => {
                            handleInputChange('valeTarih', e.target.value) // Update valet date
                            // Clear error when user selects a date
                            if (errors.valeTarih) {
                              setErrors(prev => ({ ...prev, valeTarih: '' }))
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                            errors.valeTarih ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                        {errors.valeTarih && (
                          <p className="text-red-400 text-sm mt-1">{errors.valeTarih}</p>
                        )}
                      </div>

                      {/* Saat */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-white">
                          <Clock className="inline h-4 w-4 mr-2" />
                          Saat
                        </label>
                        <input
                          type="time"
                          value={formData.valeSaat}
                          onChange={(e) => {
                            handleInputChange('valeSaat', e.target.value) // Update valet time
                            // Clear error when user selects a time
                            if (errors.valeSaat) {
                              setErrors(prev => ({ ...prev, valeSaat: '' }))
                            }
                          }}
                          className={`w-full px-4 py-3 rounded-lg bg-white/20 border text-white focus:outline-none focus:ring-2 focus:ring-secondary-400 ${
                            errors.valeSaat ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                        {errors.valeSaat && (
                          <p className="text-red-400 text-sm mt-1">{errors.valeSaat}</p>
                        )}
                      </div>
                    </div>

                    {/* Vale Araç Türü */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-white">
                        Araç Türü
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            handleInputChange('kuryeTipi', 'Motor') // Set motorcycle
                            // Clear error when user selects an option
                            if (errors.kuryeTipi) {
                              setErrors(prev => ({ ...prev, kuryeTipi: '' }))
                            }
                          }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.kuryeTipi === 'Motor'
                              ? 'border-secondary-400 bg-secondary-400/20'
                              : errors.kuryeTipi 
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
                            handleInputChange('kuryeTipi', 'Araba') // Set car
                            // Clear error when user selects an option
                            if (errors.kuryeTipi) {
                              setErrors(prev => ({ ...prev, kuryeTipi: '' }))
                            }
                          }}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.kuryeTipi === 'Araba'
                              ? 'border-secondary-400 bg-secondary-400/20'
                              : errors.kuryeTipi 
                                ? 'border-red-400 bg-white/10'
                                : 'border-white/30 bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <Car className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm">Araba</span>
                        </button>
                      </div>
                      {errors.kuryeTipi && (
                        <p className="text-red-400 text-sm mt-1">{errors.kuryeTipi}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Teslim Edilecek Semt - For Eczaneden Getir only */}
                {formData.hizmetTuru === 'Eczaneden Getir' && (
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-white">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      İlacın Teslim Edileceği Semt
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
                )}





                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Kurye Çağır</span>
                </button>
              </form>
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
                    <h3 className="text-2xl font-bold text-white">Yetkili Teslimat</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                        Perpa Kurye, T.C. Ulaştırma Bakanlığı yetki belgesi ile Bilgi Teknolojileri Kurumu Evrensel Posta Hizmeti Sağlayıcısı yetki belgesine sahiptir.

</p>
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