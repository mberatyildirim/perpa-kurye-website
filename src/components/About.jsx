import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Award, Shield, Bike } from 'lucide-react'

const About = () => {
  const stats = [
    {
      icon: Bike,
      number: '1000+',
      label: 'Günlük Teslimat'
    },
    {
      icon: MapPin,
      number: '39',
      label: 'İlçe Kapsamı'
    },
    {
      icon: Users,
      number: '5000+',
      label: 'Mutlu Müşteri'
    },
    {
      icon: Clock,
      number: '7/24',
      label: 'Hizmet'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Güvenli Teslimat',
      description: 'Tüm gönderileriniz sigortalı olarak taşınır ve güvenli bir şekilde teslim edilir.'
    },
    {
      icon: Clock,
      title: 'Hızlı Hizmet',
      description: '30 dakika içinde kurye kapınızda, en kısa sürede teslimat garantisi.'
    },
    {
      icon: MapPin,
      title: 'Geniş Kapsam',
      description: 'İstanbul\'un tüm ilçelerinde hizmet veriyoruz, şehirler arası kargo imkanı.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* About Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/about/team.jpg" 
                alt="Perpa Kurye Ekibi" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Profesyonel Ekip</h3>
                <p className="text-white/80">Deneyimli kurye ekibimiz</p>
              </div>
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Hakkımızda
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Perpa Kurye</strong> olarak, İstanbul'un her noktasında hızlı, güvenli ve profesyonel kurye hizmeti sunuyoruz. 
                Şişli Belediyesi'ne bağlı Halil Rıfat Paşa Mahallesinde bulunan Perpa Ticaret Merkezi'nde faaliyet gösteriyoruz.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Alanında tecrübeli ekip arkadaşlarımız, emanet ettiğiniz materyallerinizi hassasiyetle teslimat adresine ulaştırmaktadır. 
                Güvenilir, hassas, hızlı ve profesyonel araçlı kurye hizmeti için firmamızı arayarak randevu talep edebilirsiniz.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                Rakamlarla Perpa Kurye
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-primary-100 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Sertifikalar ve Üyelikler
              </h4>
              <div className="space-y-4">
                {/* MKD Üyeliği */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/certifications/mkd-logo.png" 
                        alt="MKD Logo" 
                        className="w-full sm:w-48 h-16 object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        MKD Üyesi
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Motosikletli Kuryeler Derneği üyesiyiz.
                      </p>
                      <a 
                        href="https://motkurder.org.tr/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 text-xs hover:text-primary-700 font-medium"
                      >
                        Detayları Gör →
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Turkish Cargo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/certifications/turkish-cargo-logo.png" 
                        alt="Turkish Cargo Logo" 
                        className="w-full sm:w-48 h-16 object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        Turkish Cargo
                      </h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Turkish Cargo tercih ediyoruz
                      </p>
                      <a 
                        href="https://turkishcargo.com/tr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 text-xs hover:text-primary-700 font-medium"
                      >
                        Detayları Gör →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Lütfen Dikkat!
              </h4>
              <p className="text-gray-700">
                Güvenlik nedeni ile; şüpheli görülen paketler kolluk güçlerine ibraz edilir, 
                kolluk güçleri tarafından onaylanır ise teslimatı gerçekleştirilir.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 