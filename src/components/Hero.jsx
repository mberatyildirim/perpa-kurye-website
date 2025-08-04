import React from 'react'
import { motion } from 'framer-motion'
import { Bike, Clock, Shield, MapPin, Phone } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
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

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:05555745356"
                className="btn-secondary flex items-center justify-center text-lg px-8 py-4"
              >
                <Phone className="h-5 w-5 mr-2" />
                Hemen Kurye Çağır
              </a>
              <a
                href="#pricing"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-all duration-200 text-lg flex items-center justify-center"
              >
                Fiyatları Gör
              </a>
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