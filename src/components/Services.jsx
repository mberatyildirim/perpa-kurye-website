import React from 'react' // Import React for component functionality
import { motion } from 'framer-motion' // Import motion for animations
import { Bike, Car, Package, Clock, Shield, MapPin, Zap, Send, Truck, Pill } from 'lucide-react' // Import icons for services
import { sendPharmacyData, sendValetData } from '../utils/googleSheets' // Import Google Sheets functions

const Services = ({ onServiceClick }) => {
  // Define the three main services with their details
  const services = [
    {
      icon: Bike, // Icon for courier service
      title: 'Kurye', // Service title
      features: ['30 dk içinde teslimat', 'Sigortalı kargo', '7/24 hizmet'], // Key features
      type: 'courier' // Service type for routing
    },
    {
      icon: Pill, // Icon for pharmacy service
      title: 'Eczaneden Getir', // Service title
      features: ['Hızlı teslimat', 'Güvenli taşıma', 'Reçeteli ilaç'], // Key features
      type: 'pharmacy' // Service type for routing
    },
    {
      icon: Car, // Icon for valet service
      title: 'Vale', // Service title
      features: ['Güvenli park', 'Hızlı teslim', 'Sigortalı hizmet'], // Key features
      type: 'valet' // Service type for routing
    }
  ]

  // Function to handle service button clicks
  const handleServiceClick = async (service) => {
    if (service.type === 'courier') {
      // Navigate to courier form page
      onServiceClick('courier-form')
    } else {
      // Send data to Google Sheets based on service type
      try {
        if (service.type === 'pharmacy') {
          await sendPharmacyData(service.title) // Send pharmacy data
        } else if (service.type === 'valet') {
          await sendValetData(service.title) // Send valet data
        }
      } catch (error) {
        console.error('Error sending data to Google Sheets:', error) // Log error but continue
      }

      // Send WhatsApp message for pharmacy and valet services
      const message = `Merhaba! ${service.title} hizmeti almak istiyorum.`
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/905447835455?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
    }
  }

  return (
    <section id="services" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tüm Hizmetlerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İstanbul'un her noktasında profesyonel hizmet sunuyoruz. 
            İhtiyacınıza uygun çözümü seçin.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card group hover:scale-105 transition-transform duration-300 w-full text-left overflow-hidden flex flex-col h-full"
            >
              {/* Service Image */}
              <div className="relative h-32 mb-6 overflow-hidden rounded-lg">
                <img 
                  src={`/images/services/${service.title.toLowerCase().replace(' ', '-')}.jpg`}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/90 text-primary-600 rounded-full">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
                
                {/* Service Button - Fixed at bottom */}
                <button
                  onClick={() => handleServiceClick(service)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <Send className="h-4 w-4" />
                  <span>Fiyat Al</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Neden Perpa Kurye?
            </h3>
            <p className="text-primary-100 text-lg">
              Güvenilir, hızlı ve profesyonel hizmet anlayışımızla fark yaratıyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">30 Dakika İçinde</h4>
              <p className="text-primary-100 text-sm">Kurye kapınızda</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Güvenli Teslimat</h4>
              <p className="text-primary-100 text-sm">Sigortalı kargo</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">Tüm İstanbul</h4>
              <p className="text-primary-100 text-sm">Her noktaya hizmet</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">7/24 Hizmet</h4>
              <p className="text-primary-100 text-sm">Gece gündüz yanınızdayız</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 