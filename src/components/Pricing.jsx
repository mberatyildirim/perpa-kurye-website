import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Clock, Bike, Plane, Crown, MessageCircle } from 'lucide-react'

const Pricing = () => {
  // Function to handle WhatsApp redirect with package information
  const handleWhatsAppClick = (packageName, price, savings) => {
    const message = `Merhaba! ${packageName} paketi hakkında bilgi almak istiyorum. Fiyat: ${price}₺, İndirim: %${savings}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/905447835455?text=${encodedMessage}`
    
    // Use window.location.href for better mobile compatibility
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = whatsappUrl
    } else {
      window.open(whatsappUrl, '_blank') // Open WhatsApp in new tab for desktop
    }
  }

  const subscriptions = [
    {
      name: 'GÜMÜŞ',
      price: '2000',
      period: 'paket',
      description: 'Tüm Siparişlerinize %24 İndirim',
      features: [
        'Paket Tutarı: 2,000 ₺',
        'Siparişin Fiyatı: 921 ₺',
        'Siparişin İndirimli Fiyatı: 705 ₺',
        'Sigortalı kargo',
        'E-posta raporlama',
        '7/24 destek'
      ],
      popular: false,
      savings: '24',
      icon: Bike
    },
    {
      name: 'ALTIN',
      price: '5000',
      period: 'paket',
      description: 'Tüm Siparişlerinize %27 İndirim',
      features: [
        'Paket Tutarı: 5,000 ₺',
        'Siparişin Fiyatı: 921 ₺',
        'Siparişin İndirimli Fiyatı: 678 ₺',
        'Hızlı teslimat önceliği',
        'Canlı takip sistemi',
        'SMS bildirim',
        'Özel müşteri temsilcisi'
      ],
      popular: true,
      savings: '27',
      icon: Crown
    },
    {
      name: 'PLATİN',
      price: '10000',
      period: 'paket',
      description: 'Tüm Siparişlerinize %30 İndirim',
      features: [
        'Paket Tutarı: 10,000 ₺',
        'Siparişin Fiyatı: 921 ₺',
        'Siparişin İndirimli Fiyatı: 651 ₺',
        'VIP teslimat önceliği',
        'Özel araç filosu',
        'API entegrasyonu',
        'Özel hesap yöneticisi',
        '7/24 özel destek'
      ],
      popular: false,
      savings: '30',
      icon: Star
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/pricing/pricing-bg.jpg" 
          alt="Pricing Background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Abonelik Paketleri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Ön ödeme ile indirimli gönderim avantajlarından yararlanın. Kurumsal müşterilerimiz için özel olarak tasarlanmış paketlerimiz ile operasyonel maliyetlerinizi optimize edin ve teslimat süreçlerinizi hızlandırın.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {subscriptions.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative card flex flex-col h-full ${
                item.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    En Popüler
                  </span>
                </div>
              )}

              <div className="text-center flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-6">
                  <item.icon className="h-8 w-8 text-primary-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{item.price}₺</span>
                    <span className="text-gray-500 ml-2">/{item.period}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.savings}% İndirim
                    </span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <ul className="space-y-3 text-left flex-grow mb-6">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleWhatsAppClick(item.name, item.price, item.savings)}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Paket Hakkında Bilgi Al</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Kurumsal Avantajlar
            </h3>
            <p className="text-gray-600 mb-6">
              Ön ödeme paketlerimiz ile nakit akışınızı optimize edin ve operasyonel maliyetlerinizi düşürün.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Nakit akışı optimizasyonu</span>
              </div>
              <div className="flex items-center justify-center">
                <Bike className="h-5 w-5 text-primary-600 mr-2" />
                <span>Operasyonel maliyet düşürme</span>
              </div>
              <div className="flex items-center justify-center">
                <Plane className="h-5 w-5 text-secondary-600 mr-2" />
                <span>Kurumsal özel fiyatlar</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default Pricing 