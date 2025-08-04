import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, MapPin, Shield, Truck, Car, Plane, Package } from 'lucide-react'

const ServiceDetail = ({ service, onBack }) => {
  const serviceDetails = {
    'city-courier': {
      title: 'Şehir İçi Kurye',
      description: 'İstanbul\'un her noktasında hızlı ve güvenli şehir içi kurye hizmeti',
      icon: Truck,
      features: [
        '30 dakika içinde kurye kapınızda',
        'Tüm İstanbul ilçelerinde hizmet',
        'Sigortalı kargo',
        'Canlı takip sistemi',
        '7/24 hizmet'
      ],
      pricing: {
        'Yakın Mesafe': '300₺',
        'Orta Mesafe': '400₺',
        'Uzak Mesafe': '500₺'
      },
      areas: [
        'Kadıköy, Beşiktaş, Şişli, Bakırköy',
        'Üsküdar, Maltepe, Kartal, Pendik',
        'Bağcılar, Bahçelievler, Güngören',
        'Tüm İstanbul ilçeleri'
      ]
    },
    'intercity-courier': {
      title: 'Şehirler Arası Kurye',
      description: 'Türkiye\'nin her yerine güvenli şehirler arası kurye hizmeti',
      icon: Car,
      features: [
        'Aynı gün teslimat',
        'Tüm Türkiye kapsamı',
        'Sigortalı kargo',
        'Özel araç filosu',
        'Canlı takip'
      ],
      pricing: {
        'Yakın Şehirler': '800₺',
        'Orta Mesafe': '1200₺',
        'Uzak Şehirler': '2000₺'
      },
      areas: [
        'İstanbul - Ankara, İzmir, Bursa',
        'Tüm Türkiye illeri',
        'Özel araç ile teslimat',
        'Güvenli ve hızlı'
      ]
    },
    'air-cargo': {
      title: 'Uçak Kargo',
      description: 'THY Cargo ile Türkiye\'nin 52 noktasına uçak kargo hizmeti',
      icon: Plane,
      features: [
        'THY Cargo güvencesi',
        '52 noktaya teslimat',
        'Hızlı uçak kargo',
        'Sigortalı kargo',
        'Profesyonel hizmet'
      ],
      pricing: {
        'Küçük Paket': '500₺',
        'Orta Boy Paket': '800₺',
        'Büyük Paket': '1200₺'
      },
      areas: [
        'Atatürk Havalimanı',
        'Sabiha Gökçen Havalimanı',
        'Tüm Türkiye havalimanları',
        '52 noktaya hizmet'
      ]
    },
    'special-services': {
      title: 'Özel Hizmetler',
      description: 'Özel ihtiyaçlarınız için özelleştirilmiş kurye hizmetleri',
      icon: Package,
      features: [
        'Hassas kargo taşıma',
        'Özel araç filosu',
        'VIP hizmet',
        'Canlı takip',
        '7/24 özel destek'
      ],
      pricing: {
        'VIP Hizmet': '1000₺',
        'Hassas Kargo': '800₺',
        'Özel Araç': '600₺'
      },
      areas: [
        'Hassas elektronik cihazlar',
        'VIP müşteri hizmeti',
        'Özel araç filosu',
        '7/24 özel destek'
      ]
    }
  }

  const detail = serviceDetails[service]

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hizmet Bulunamadı</h2>
          <button
            onClick={onBack}
            className="btn-primary"
          >
            Geri Dön
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <detail.icon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">{detail.title}</h1>
            </div>
          </div>
          <p className="mt-4 text-white/80 max-w-3xl">
            {detail.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h2>
              <div className="space-y-4">
                {detail.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Bölgeleri</h2>
              <div className="space-y-3">
                {detail.areas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <MapPin className="h-5 w-5 text-primary-500" />
                    <span className="text-gray-700">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fiyatlandırma</h2>
              <div className="space-y-4">
                {Object.entries(detail.pricing).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-2xl font-bold text-primary-600">{value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hemen Sipariş Ver</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Kurye Çağır
                </button>
                <button className="w-full bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                  Fiyat Teklifi Al
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail 