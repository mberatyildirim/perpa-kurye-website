import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Phone, Star } from 'lucide-react'

const Regions = ({ onRegionClick }) => {
  // Featured regions as requested by Şahan
  const featuredRegions = [
    {
      name: 'Perpa Kurye',
      description: 'Şişli Perpa Ticaret Merkezi merkezli kurye hizmeti',
      icon: MapPin,
      region: 'perpa',
      featured: true,
      districts: ['Şişli', 'Beşiktaş', 'Beyoğlu', 'Kağıthane', 'Sarıyer']
    },
    {
      name: 'Beylikdüzü Kurye',
      description: 'Beylikdüzü bölgesinde hızlı ve güvenli kurye hizmeti',
      icon: MapPin,
      region: 'beylikduzu',
      featured: true,
      districts: ['Beylikdüzü', 'Avcılar', 'Küçükçekmece', 'Esenyurt']
    },
    {
      name: 'Tuzla Kurye',
      description: 'Tuzla bölgesinde profesyonel kurye hizmeti',
      icon: MapPin,
      region: 'tuzla',
      featured: true,
      districts: ['Tuzla', 'Pendik', 'Kartal', 'Maltepe']
    }
  ]

  // Function to handle region click and send WhatsApp message
  const handleRegionClick = (region) => {
    const message = `Merhaba! ${region.name} hizmeti hakkında bilgi almak istiyorum.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/905319855356?text=${encodedMessage}`
    
    // Use window.location.href for better mobile compatibility
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = whatsappUrl
    } else {
      window.open(whatsappUrl, '_blank') // Open WhatsApp in new tab for desktop
    }
  }

  return (
    <section id="regions" className="py-20 bg-gray-50">
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
            Popüler Bölgeler
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            En çok tercih edilen bölgelerimizde hızlı, güvenli ve profesyonel kurye hizmeti sunuyoruz.
          </p>
        </motion.div>

        {/* Featured Regions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredRegions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Region Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <region.icon className="h-6 w-6" />
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  {region.featured && (
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  )}
                </div>
                <p className="text-primary-100 text-sm">{region.description}</p>
              </div>

              {/* Region Content */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Hizmet Verilen Bölgeler</h4>
                <div className="space-y-2 mb-6">
                  {region.districts.map((district, districtIndex) => (
                    <div key={districtIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-600 text-sm">{district}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleRegionClick(region)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp ile İletişim</span>
                  </button>
                  <a
                    href="tel:05319855356"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Hemen Ara</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              İstanbul Kurye Hizmeti
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Perpa Kurye olarak İstanbul'un her noktasında profesyonel kurye hizmeti sunuyoruz. 
              Anadolu yakasından Avrupa yakasına, merkez ilçelerden uzak semtlere kadar geniş bir coğrafyada hizmet veriyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Anadolu Yakası */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900">Anadolu Yakası Kurye</h4>
              <p className="text-gray-600">
                Kadıköy'den Tuzla'ya, Üsküdar'dan Beykoz'a kadar Anadolu yakasının tüm ilçelerinde 
                hızlı ve güvenli kurye hizmeti sunuyoruz.
              </p>
              <button
                onClick={() => onRegionClick('anatolian-side')}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
              >
                <span>Detayları Gör</span>
                <MapPin className="h-4 w-4" />
              </button>
            </div>

            {/* Avrupa Yakası */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900">Avrupa Yakası Kurye</h4>
              <p className="text-gray-600">
                Beşiktaş'tan Esenyurt'a, Şişli'den Silivri'ye kadar Avrupa yakasının tüm ilçelerinde 
                profesyonel kurye hizmeti veriyoruz.
              </p>
              <button
                onClick={() => onRegionClick('european-side')}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
              >
                <span>Detayları Gör</span>
                <MapPin className="h-4 w-4" />
              </button>
            </div>

            {/* Şehirler Arası */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900">Şehirler Arası Kurye</h4>
              <p className="text-gray-600">
                Ankara'dan Van'a, İzmir'den Trabzon'a kadar Türkiye'nin her yerine 
                şehirler arası kurye hizmeti sunuyoruz.
              </p>
              <button
                onClick={() => onRegionClick('intercity')}
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
              >
                <span>Detayları Gör</span>
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Regions
