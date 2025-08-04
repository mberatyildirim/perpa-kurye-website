import React from 'react'
import { motion } from 'framer-motion'
import { Bike, Plane, Car, Package, Clock, Shield, MapPin, Zap } from 'lucide-react'

const Services = ({ onServiceClick }) => {
  const services = [
    {
      icon: Bike,
      title: 'Moto Kurye',
      description: 'Evrak, küçük paket vb. gönderilerinizin bir bölgeden alınıp başka bir bölgeye teslim edildiği gönderi şeklidir.',
      features: ['Hızlı teslimat', 'Ekonomik fiyat', 'Tüm İstanbul']
    },
    {
      icon: Car,
      title: 'Arabalı Kurye',
      description: 'Ebatlı ve hassas gönderileriniz güvenli bir şekilde vakit kaybetmeden yerine ulaştırılır.',
      features: ['Büyük paketler', 'Hassas kargo', 'Güvenli taşıma']
    },
    {
      icon: Plane,
      title: 'Ucak Kurye',
      description: 'Türkiye\'nin her yerine şehirlerarası uçak kargo ile en hızlı şekilde güvenilir teslimat.',
      features: ['Şehirler arası', 'Hızlı teslimat', 'Güvenli kargo']
    }
  ]

  const features = [
    {
      icon: Clock,
      title: '30 Dakika İçinde',
      description: 'Kurye kapınızda'
    },
    {
      icon: Shield,
      title: 'Güvenli Teslimat',
      description: 'Sigortalı kargo'
    },
    {
      icon: MapPin,
      title: 'Tüm İstanbul',
      description: 'Her noktaya hizmet'
    },
    {
      icon: Zap,
      title: '7/24 Hizmet',
      description: 'Gece gündüz yanınızdayız'
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
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
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İstanbul'un her noktasında profesyonel kurye hizmeti sunuyoruz. 
            İhtiyacınıza uygun çözümü seçin.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.button
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card group hover:scale-105 transition-transform duration-300 w-full text-left overflow-hidden"
              onClick={() => {
                const serviceMap = {
                  'Moto Kurye': 'city-courier',
                  'Arabalı Kurye': 'intercity-courier',
                  'Ucak Kurye': 'air-cargo'
                }
                onServiceClick(serviceMap[service.title])
              }}
            >
              {/* Service Image */}
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
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
              
              <div className="px-6 pb-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Features */}
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
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-primary-100 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 