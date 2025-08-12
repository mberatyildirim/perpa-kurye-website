import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Bike, MessageCircle } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hizmetlerimiz', href: '#services' },
    { name: 'Fiyatlar', href: '#pricing' },
    { name: 'Hakkımızda', href: '#about' }
  ]

  const services = [
    { name: 'Şehir İçi Kurye', href: '#city-courier' },
    { name: 'Şehirler Arası Kurye', href: '#intercity-courier' },
    { name: 'Uçak Kargo', href: '#air-cargo' },
    { name: 'Özel Hizmetler', href: '#special-services' }
  ]

  const regions = [
    { name: 'Anadolu Yakası Kurye', href: '#anatolian-side' },
    { name: 'Avrupa Yakası Kurye', href: '#european-side' },
    { name: 'Şehirler Arası Kurye', href: '#intercity' }
  ]

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {/* Office Image */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img 
                src="/images/footer/office.jpg" 
                alt="Perpa Kurye Ofisi" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold">Perpa Ticaret Merkezi</h4>
                <p className="text-white/80 text-sm">Şişli / İstanbul</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <img 
                src="/images/logo/logo-beyaz.png" 
                alt="Perpa Kurye Logo" 
                className="h-8 w-auto mr-3"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              İstanbul'un her noktasında hızlı, güvenli ve profesyonel kurye hizmeti. 
              7/24 yanınızdayız!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/905555745356"
                className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="tel:05555745356"
                className="bg-primary-600 hover:bg-primary-700 p-3 rounded-full transition-colors duration-200"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Kurumsal</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Kurye Hizmeti</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <div>
                    <a href="tel:05555745356" className="text-gray-300 hover:text-white transition-colors duration-200">
                      (0555) 574 53 56
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <div>
                    <a href="tel:05325784634" className="text-gray-300 hover:text-white transition-colors duration-200">
                      (0532) 578 46 34
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <div>
                    <a href="tel:05325361915" className="text-gray-300 hover:text-white transition-colors duration-200">
                      (0532) 536 19 15
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                  <div className="text-gray-300">
                    Perpa Ticaret Merkezi<br />
                    Halil Rıfat Paşa Mahallesi<br />
                    Şişli / İstanbul
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Çalışma Saatleri</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-400" />
                  <div className="text-gray-300">
                    <div className="text-primary-400 font-medium">7/24 hizmetimiz mevcuttur</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex justify-center items-center">
            <div className="text-gray-400 text-sm">
              © 2025 <strong>Perpa Kurye</strong> Tüm hakları saklıdır.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a
          href="https://wa.me/905319855356?text=Kurye%20hizmeti%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Whatsapp</span>
        </a>
      </motion.div>
    </footer>
  )
}

export default Footer 