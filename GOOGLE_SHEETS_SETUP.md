# Google Sheets Entegrasyonu Kurulum Rehberi

Bu rehber, web sitesindeki form verilerini Google Sheets'e otomatik olarak kaydetmek için gerekli adımları açıklar.

## 📋 Gerekli Adımlar

### 1. Google Sheets Oluşturma
1. [Google Sheets](https://sheets.google.com) adresine gidin
2. Yeni bir spreadsheet oluşturun
3. İlk sayfayı "Form Verileri" olarak adlandırın

### 2. Google Apps Script Kurulumu
1. Google Sheets'te **Extensions > Apps Script** menüsüne tıklayın
2. Açılan editörde `google-apps-script.js` dosyasındaki kodu kopyalayın
3. `Code.gs` dosyasına yapıştırın
4. **Save** butonuna tıklayın (proje adı: "Perpa Kurye Form Handler")

### 3. Sheet Headers Kurulumu
1. Apps Script editöründe `testSetup` fonksiyonunu çalıştırın
2. Bu işlem sheet'e gerekli başlıkları ekleyecek

### 4. Web App Deploy Etme
1. Apps Script editöründe **Deploy > New deployment** tıklayın
2. **Type** olarak "Web app" seçin
3. **Execute as** olarak "Me" seçin
4. **Who has access** olarak "Anyone" seçin
5. **Deploy** butonuna tıklayın
6. **Authorize access** butonuna tıklayın ve gerekli izinleri verin
7. Oluşturulan URL'yi kopyalayın

### 5. Web Sitesi Konfigürasyonu
1. `src/utils/googleSheets.js` dosyasını açın
2. `GOOGLE_SCRIPT_URL` değişkenini deploy ettiğiniz URL ile güncelleyin:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYED_WEB_APP_URL_HERE'
```

## 📊 Veri Yapısı

Google Sheets'te aşağıdaki sütunlar oluşturulacak:

| Sütun | Açıklama |
|-------|----------|
| Timestamp | Veri gönderilme zamanı |
| Date | Tarih |
| Service Type | Hizmet türü (Kurye, Eczaneden Getir, Vale, Hero Form) |
| Alınacak Semt | Alınacak semt bilgisi |
| Teslim Edilecek Semt | Teslim edilecek semt bilgisi |
| Paket Boyutu | Paket boyutu (Küçük, Orta, Büyük) |
| Araç Türü | Araç türü (Motor, Araba) |
| Paket Türü | Paket türü (Standart, Express, VIP) |
| Source | Veri kaynağı (Hero Form, Services Page, Courier Form) |

## 🔧 Test Etme

1. Web sitesini açın
2. Herhangi bir formu doldurun ve gönderin
3. Google Sheets'i kontrol edin - yeni veri eklenmiş olmalı

## 🚨 Sorun Giderme

### CORS Hatası
- Google Apps Script'te CORS ayarlarını kontrol edin
- Web app'in "Anyone" erişimine sahip olduğundan emin olun

### Veri Gelmiyor
- Console'da hata mesajlarını kontrol edin
- Google Apps Script logs'unu kontrol edin
- URL'nin doğru olduğundan emin olun

### Yetki Hatası
- Google Apps Script'te gerekli izinleri verdiğinizden emin olun
- Google Sheets'in düzenleme izninizin olduğundan emin olun

## 📈 Özellikler

- ✅ Otomatik timestamp ekleme
- ✅ Türkçe tarih formatı
- ✅ Hata yakalama ve loglama
- ✅ Farklı form türleri için ayrı veri yapısı
- ✅ Google Sheets'te otomatik başlık oluşturma

## 🔒 Güvenlik

- Web app URL'sini güvenli tutun
- Gerekli izinleri minimum seviyede tutun
- Düzenli olarak logları kontrol edin 