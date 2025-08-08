import React from 'react' // Import React for component functionality
import { motion } from 'framer-motion' // Import motion for animations
import { ShoppingBag, Plane, Truck, Car, Clock, Shield, MapPin, Zap, MessageCircle } from 'lucide-react' // Import icons for services

const Services = ({ onServiceClick }) => {
  // Define the four main services with their details
  const services = [
    {
      icon: ShoppingBag, // Icon for market delivery service
      title: 'Marketten Getir', // Service title
      description: 'Market alışverişinizi biz yapalım. Taze ürünler, hızlı teslimat ve güvenli paketleme ile market ihtiyaçlarınızı kapınıza getiriyoruz.', // Service description
      features: ['Taze ürün garantisi', 'Hızlı teslimat', 'Güvenli paketleme'], // Key features
      type: 'market' // Service type for identification
    },
    {
      icon: Plane, // Icon for air cargo service
      title: 'Hava Kargo', // Service title
      description: 'Acil gönderileriniz için hızlı hava kargo hizmeti. Türkiye\'nin her noktasına güvenli ve hızlı kargo taşımacılığı yapıyoruz.', // Service description
      features: ['Hızlı teslimat', 'Güvenli taşıma', 'Türkiye geneli'], // Key features
      type: 'air-cargo' // Service type for identification
    },
    {
      icon: Truck, // Icon for intercity courier service
      title: 'Sehirlerarası Kurye', // Service title
      description: 'Şehirler arası kurye hizmetimiz ile belgelerinizi, paketlerinizi güvenle ve hızla ulaştırıyoruz. Tüm Türkiye\'ye hizmet veriyoruz.', // Service description
      features: ['Şehirler arası', 'Güvenli teslimat', 'Takip sistemi'], // Key features
      type: 'intercity-courier' // Service type for identification
    },
    {
      icon: Car, // Icon for driver rental service
      title: 'Şoför Kiralama', // Service title
      description: 'Profesyonel şoför kiralama hizmeti. Deneyimli ve güvenilir şoförlerimiz ile seyahatlerinizde yanınızdayız.', // Service description
      features: ['Deneyimli şoförler', 'Güvenli sürüş', '7/24 hizmet'], // Key features
      type: 'driver-rental' // Service type for identification
    }
  ]

  // Function to handle service button clicks and send WhatsApp messages
  const handleServiceClick = (service) => {
    // Create WhatsApp message with service information
    const message = `Merhaba! ${service.title} hizmeti hakkında bilgi almak istiyorum.`
    const encodedMessage = encodeURIComponent(message) // Encode message for URL
    const whatsappUrl = `https://wa.me/905447835455?text=${encodedMessage}` // WhatsApp URL with phone number
    window.open(whatsappUrl, '_blank') // Open WhatsApp in new tab
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
            Diğer Hizmetlerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İstanbul'un her noktasında profesyonel hizmet sunuyoruz. 
            İhtiyacınıza uygun çözümü seçin.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
                  src={`/images/services/${service.title.toLowerCase().replace(/[çğıöşü]/g, (match) => {
                    const replacements = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' }
                    return replacements[match]
                  }).replace(/\s+/g, '-')}.jpg`}
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
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* WhatsApp Button - Green with WhatsApp icon */}
                <button
                  onClick={() => handleServiceClick(service)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Bilgi Al</span>
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
              Perpa Kurye, T.C. Ulaştırma Bakanlığı yetki belgesi ile Bilgi Teknolojileri Kurumu Evrensel Posta Hizmeti Sağlayıcısı yetki belgesine sahiptir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">Hızlı Teslimat</h4>
                <p className="text-primary-100 text-sm">Şehir içi ve şehirlerarası gönderileriniz en kısa sürede adrese ulaşır.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">Uygun Fiyat Politikası</h4>
                <p className="text-primary-100 text-sm">Semt ve mahalle bazlı fiyatlandırma ile sürpriz maliyet yok.</p>
              </div>
            </motion.div>

            {/* Feature 3 - Combined */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">Geniş Hizmet Ağı ve Çeşitli Teslimat Seçenekleri</h4>
                <p className="text-primary-100 text-sm">İstanbul başta olmak üzere Türkiye'nin her noktasına ihtiyacınıza yönelik çeşitli hizmetler veriyoruz.</p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">7/24 Hizmet</h4>
                <p className="text-primary-100 text-sm">Günün her saati iletişim kurabileceğiniz müşteri hizmetleri.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 