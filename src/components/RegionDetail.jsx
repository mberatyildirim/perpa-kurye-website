import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Phone, Truck, MessageCircle, Star, Shield, Zap } from 'lucide-react'

const RegionDetail = ({ region, onBack }) => {
  // Function to generate blog content for each district
  const generateDistrictContent = (districtName, regionType) => {
    const regionText = regionType === 'anatolian-side' ? 'Anadolu Yakası' : 
                      regionType === 'european-side' ? 'Avrupa Yakası' : 'Şehirler Arası'
    
    return {
      title: `${districtName} Kurye Hizmeti - Perpa Kurye`,
      content: `
        <h2>${districtName} Kurye Hizmeti</h2>
        <p>Perpa Kurye olarak ${districtName} bölgesinde profesyonel kurye hizmeti sunuyoruz. ${regionText} kapsamında yer alan ${districtName} ilçesinde hızlı, güvenli ve uygun fiyatlı kurye hizmetlerimizle yanınızdayız.</p>
        
        <h3>${districtName} Kurye Hizmetlerimiz</h3>
        <p>${districtName} bölgesinde sunduğumuz kurye hizmetleri:</p>
        <ul>
          <li><strong>Belge ve Evrak Teslimatı:</strong> Resmi belgeler, sözleşmeler ve önemli evraklarınızı güvenle teslim ediyoruz.</li>
          <li><strong>Paket Teslimatı:</strong> Küçük, orta ve büyük boyutlu paketlerinizi hızlıca ulaştırıyoruz.</li>
          <li><strong>Eczaneden Getir:</strong> İlaçlarınızı eczaneden alıp kapınıza getiriyoruz.</li>
          <li><strong>Marketten Getir:</strong> Market alışverişlerinizi sizin için yapıyoruz.</li>
          <li><strong>Vale Hizmeti:</strong> Kişisel ulaşım ihtiyaçlarınız için profesyonel şoför hizmeti.</li>
        </ul>
        
        <h3>Neden Perpa Kurye?</h3>
        <p>${districtName} bölgesinde tercih edilme nedenlerimiz:</p>
        <ul>
          <li><strong>Hızlı Teslimat:</strong> 30 dakika içinde kurye kapınızda</li>
          <li><strong>Güvenli Taşıma:</strong> Tüm gönderileriniz sigortalı olarak taşınır</li>
          <li><strong>Uygun Fiyat:</strong> Semt bazlı fiyatlandırma ile sürpriz maliyet yok</li>
          <li><strong>7/24 Hizmet:</strong> Günün her saati hizmetinizdeyiz</li>
          <li><strong>Profesyonel Ekip:</strong> Deneyimli ve güvenilir kuryelerimiz</li>
        </ul>
        
        <h3>${districtName} Kurye Fiyatları</h3>
        <p>${districtName} bölgesi için güncel fiyat bilgileri almak için bizimle iletişime geçin. Fiyatlarımız mesafe ve paket boyutuna göre değişiklik göstermektedir.</p>
        
        <h3>İletişim</h3>
        <p>${districtName} kurye hizmeti için hemen arayın veya WhatsApp üzerinden iletişime geçin. En kısa sürede size ulaşacağız.</p>
      `
    }
  }

  const regionDetails = {
    'anatolian-side': {
      title: 'Anadolu Yakası Kurye',
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
      },
      blogContent: `
        <h2>Anadolu Yakası Kurye Hizmeti</h2>
        <p>Perpa Kurye olarak İstanbul Anadolu yakasının tüm ilçelerinde profesyonel kurye hizmeti sunuyoruz. Kadıköy'den Tuzla'ya, Üsküdar'dan Beykoz'a kadar geniş bir coğrafyada hızlı, güvenli ve uygun fiyatlı kurye hizmetlerimizle yanınızdayız.</p>
        
        <h3>Anadolu Yakası Kurye Hizmetlerimiz</h3>
        <p>Anadolu yakasında sunduğumuz kapsamlı kurye hizmetleri:</p>
        <ul>
          <li><strong>Belge ve Evrak Teslimatı:</strong> Resmi belgeler, sözleşmeler ve önemli evraklarınızı güvenle teslim ediyoruz.</li>
          <li><strong>Paket Teslimatı:</strong> Küçük, orta ve büyük boyutlu paketlerinizi hızlıca ulaştırıyoruz.</li>
          <li><strong>Eczaneden Getir:</strong> İlaçlarınızı eczaneden alıp kapınıza getiriyoruz.</li>
          <li><strong>Marketten Getir:</strong> Market alışverişlerinizi sizin için yapıyoruz.</li>
          <li><strong>Vale Hizmeti:</strong> Kişisel ulaşım ihtiyaçlarınız için profesyonel şoför hizmeti.</li>
        </ul>
        
        <h3>Hizmet Verilen İlçeler</h3>
        <p>Anadolu yakasında hizmet verdiğimiz ilçeler: Kadıköy, Üsküdar, Maltepe, Kartal, Pendik, Ataşehir, Çekmeköy, Sancaktepe, Sultanbeyli, Ümraniye, Şile, Tuzla, Beykoz ve Adalar.</p>
        
        <h3>Neden Perpa Kurye?</h3>
        <p>Anadolu yakasında tercih edilme nedenlerimiz:</p>
        <ul>
          <li><strong>Hızlı Teslimat:</strong> 30 dakika içinde kurye kapınızda</li>
          <li><strong>Güvenli Taşıma:</strong> Tüm gönderileriniz sigortalı olarak taşınır</li>
          <li><strong>Uygun Fiyat:</strong> Semt bazlı fiyatlandırma ile sürpriz maliyet yok</li>
          <li><strong>7/24 Hizmet:</strong> Günün her saati hizmetinizdeyiz</li>
          <li><strong>Profesyonel Ekip:</strong> Deneyimli ve güvenilir kuryelerimiz</li>
        </ul>
      `
    },
    'european-side': {
      title: 'Avrupa Yakası Kurye',
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
      },
      blogContent: `
        <h2>Avrupa Yakası Kurye Hizmeti</h2>
        <p>Perpa Kurye olarak İstanbul Avrupa yakasının tüm ilçelerinde profesyonel kurye hizmeti sunuyoruz. Beşiktaş'tan Esenyurt'a, Şişli'den Silivri'ye kadar geniş bir coğrafyada hızlı, güvenli ve uygun fiyatlı kurye hizmetlerimizle yanınızdayız.</p>
        
        <h3>Avrupa Yakası Kurye Hizmetlerimiz</h3>
        <p>Avrupa yakasında sunduğumuz kapsamlı kurye hizmetleri:</p>
        <ul>
          <li><strong>Belge ve Evrak Teslimatı:</strong> Resmi belgeler, sözleşmeler ve önemli evraklarınızı güvenle teslim ediyoruz.</li>
          <li><strong>Paket Teslimatı:</strong> Küçük, orta ve büyük boyutlu paketlerinizi hızlıca ulaştırıyoruz.</li>
          <li><strong>Eczaneden Getir:</strong> İlaçlarınızı eczaneden alıp kapınıza getiriyoruz.</li>
          <li><strong>Marketten Getir:</strong> Market alışverişlerinizi sizin için yapıyoruz.</li>
          <li><strong>Vale Hizmeti:</strong> Kişisel ulaşım ihtiyaçlarınız için profesyonel şoför hizmeti.</li>
        </ul>
        
        <h3>Hizmet Verilen İlçeler</h3>
        <p>Avrupa yakasında hizmet verdiğimiz ilçeler: Beşiktaş, Şişli, Bakırköy, Bahçelievler, Bağcılar, Güngören, Bayrampaşa, Esenler, Beyoğlu, Fatih, Eyüp, Gaziosmanpaşa, Kağıthane, Küçükçekmece, Sarıyer, Silivri, Sultangazi, Zeytinburnu, Arnavutköy, Avcılar, Beylikdüzü, Büyükçekmece, Çatalca ve Esenyurt.</p>
        
        <h3>Neden Perpa Kurye?</h3>
        <p>Avrupa yakasında tercih edilme nedenlerimiz:</p>
        <ul>
          <li><strong>Hızlı Teslimat:</strong> 30 dakika içinde kurye kapınızda</li>
          <li><strong>Güvenli Taşıma:</strong> Tüm gönderileriniz sigortalı olarak taşınır</li>
          <li><strong>Uygun Fiyat:</strong> Semt bazlı fiyatlandırma ile sürpriz maliyet yok</li>
          <li><strong>7/24 Hizmet:</strong> Günün her saati hizmetinizdeyiz</li>
          <li><strong>Profesyonel Ekip:</strong> Deneyimli ve güvenilir kuryelerimiz</li>
        </ul>
      `
    },
    'intercity': {
      title: 'Şehirler Arası Kurye',
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
      },
      blogContent: `
        <h2>Şehirler Arası Kurye Hizmeti</h2>
        <p>Perpa Kurye olarak Türkiye'nin her yerine şehirler arası kurye hizmeti sunuyoruz. Ankara'dan Van'a, İzmir'den Trabzon'a kadar geniş bir coğrafyada hızlı, güvenli ve profesyonel kurye hizmetlerimizle yanınızdayız.</p>
        
        <h3>Şehirler Arası Kurye Hizmetlerimiz</h3>
        <p>Türkiye genelinde sunduğumuz kapsamlı kurye hizmetleri:</p>
        <ul>
          <li><strong>Belge ve Evrak Teslimatı:</strong> Resmi belgeler, sözleşmeler ve önemli evraklarınızı güvenle teslim ediyoruz.</li>
          <li><strong>Paket Teslimatı:</strong> Küçük, orta ve büyük boyutlu paketlerinizi hızlıca ulaştırıyoruz.</li>
          <li><strong>Uçak Kargo:</strong> Acil gönderileriniz için hızlı uçak kargo hizmeti.</li>
          <li><strong>Özel Araç Filosu:</strong> Büyük ve ağır paketler için özel araçlarımız.</li>
        </ul>
        
        <h3>Hizmet Verilen Şehirler</h3>
        <p>Türkiye genelinde hizmet verdiğimiz şehirler: Ankara, İzmir, Bursa, Antalya, Adana, Konya, Kayseri, Samsun, Trabzon, Erzurum, Diyarbakır, Gaziantep, Şanlıurfa, Van ve tüm Türkiye illeri.</p>
        
        <h3>Neden Perpa Kurye?</h3>
        <p>Şehirler arası hizmette tercih edilme nedenlerimiz:</p>
        <ul>
          <li><strong>Aynı Gün Teslimat:</strong> Acil gönderileriniz aynı gün teslim edilir</li>
          <li><strong>Güvenli Taşıma:</strong> Tüm gönderileriniz sigortalı olarak taşınır</li>
          <li><strong>Takip Sistemi:</strong> Gönderinizin konumunu anlık takip edebilirsiniz</li>
          <li><strong>Profesyonel Ekip:</strong> Deneyimli ve güvenilir kuryelerimiz</li>
        </ul>
      `
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
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Blog Article */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: detail.blogContent }}
              />
            </div>

            {/* Districts Grid */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Verilen İlçeler</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {detail.districts.map((district, index) => (
                  <motion.div
                    key={district}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-primary-500" />
                    <span className="text-gray-700 font-medium">{district} Kurye</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Card */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Hemen İletişime Geç</h3>
              <p className="text-primary-100 mb-6">
                {detail.title} hizmeti için hemen arayın veya WhatsApp üzerinden iletişime geçin.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/905319855356?text=Kurye%20hizmeti%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:05319855356"
                  className="w-full bg-primary-500 hover:bg-primary-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Ara</span>
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Özellikler</h3>
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

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fiyat Bilgileri</h3>
              <div className="space-y-3">
                {Object.entries(detail.pricing).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700 font-medium">{key}</span>
                    <span className="text-primary-600 font-bold">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RegionDetail 