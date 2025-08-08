import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Phone, Truck } from 'lucide-react'

const RegionDetail = ({ region, onBack }) => {
  const regionDetails = {
    'anatolian-side': {
      title: 'Anadolu Yakası',
      description: 'İstanbul Anadolu yakasının tüm ilçelerinde kurye hizmeti',
      icon: MapPin,
      districts: [
        'Kadıköy', 'Üsküdar', 'Maltepe', 'Kartal', 'Pendik',
        'Ataşehir', 'Çekmeköy', 'Sancaktepe', 'Sultanbeyli',
        'Ümraniye', 'Şile', 'Tuzla', 'Beykoz', 'Adalar'
      ],
      features: [
        '30 dakika içinde kurye',
        'Tüm ilçelerde hizmet',
        'Sigortalı kargo',
        '7/24 destek'
      ],
      pricing: {
        'Yakın İlçeler': '300₺',
        'Orta Mesafe': '400₺',
        'Uzak İlçeler': '500₺'
      }
    },
    'european-side': {
      title: 'Avrupa Yakası',
      description: 'İstanbul Avrupa yakasının tüm ilçelerinde kurye hizmeti',
      icon: MapPin,
      districts: [
        'Beşiktaş', 'Şişli', 'Bakırköy', 'Bahçelievler', 'Bağcılar',
        'Güngören', 'Bayrampaşa', 'Esenler', 'Beyoğlu', 'Fatih',
        'Eyüp', 'Gaziosmanpaşa', 'Kağıthane', 'Küçükçekmece',
        'Sarıyer', 'Silivri', 'Sultangazi', 'Zeytinburnu',
        'Arnavutköy', 'Avcılar', 'Beylikdüzü', 'Büyükçekmece',
        'Çatalca', 'Esenyurt'
      ],
      features: [
        '30 dakika içinde kurye',
        'Tüm ilçelerde hizmet',
        'Sigortalı kargo',
        '7/24 destek'
      ],
      pricing: {
        'Yakın İlçeler': '300₺',
        'Orta Mesafe': '400₺',
        'Uzak İlçeler': '500₺'
      }
    },
    'intercity': {
      title: 'Şehirler Arası',
      description: 'Türkiye\'nin her yerine şehirler arası kurye hizmeti',
      icon: Truck,
      districts: [
        'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana',
        'Konya', 'Kayseri', 'Samsun', 'Trabzon', 'Erzurum',
        'Diyarbakır', 'Gaziantep', 'Şanlıurfa', 'Van',
        'Tüm Türkiye illeri'
      ],
      features: [
        'Aynı gün teslimat',
        'Tüm Türkiye kapsamı',
        'Sigortalı kargo',
        'Özel araç filosu'
      ],
      pricing: {
        'Yakın Şehirler': '800₺',
        'Orta Mesafe': '1200₺',
        'Uzak Şehirler': '2000₺'
      }
    }
  }

  const detail = regionDetails[region]

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bölge Bulunamadı</h2>
          <button onClick={onBack} className="btn-primary">Geri Dön</button>
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
          <p className="mt-4 text-white/80 max-w-3xl">{detail.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Districts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Verilen İlçeler</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {detail.districts.map((district, index) => (
                  <motion.div
                    key={district}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <MapPin className="h-4 w-4 text-primary-500" />
                    <span className="text-gray-700">{district}</span>
                  </motion.div>
                ))}
              </div>
            </div>

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
          </motion.div>

          {/* Pricing & Contact */}
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hemen İletişime Geç</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/905447835455?text=Kurye%20hizmeti%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Kurye Çağır
                </a>
                <a
                  href="https://wa.me/905447835455?text=Kurye%20hizmeti%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  Fiyat Teklifi Al
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RegionDetail 