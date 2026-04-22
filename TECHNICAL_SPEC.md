# Decigent Web Sitesi Teknik Dokümanı (Detaylı)

## 1) Amaç ve Kapsam

### 1.1 Proje Amacı
Kurumsal müşterilere AI destekli karar ve operasyon çözümlerini sunan, dönüşüm odaklı kurumsal web sitesi geliştirmek.

### 1.2 Birincil Dönüşüm Hedefleri (Öncelik Sırası)
1. Demo/Görüşme talebi
2. İletişim formu
3. Mail üzerinden iletişim
4. Telefon/WhatsApp iletişimi

### 1.3 Hedef Kitle
1. C-level (CEO/COO/CDO)
2. Operasyon ve süreç yöneticileri

---

## 2) İçerik ve Bilgi Mimarisi

### 2.1 Dil
- Türkçe + İngilizce (dil switch)

### 2.2 Sayfa Yapısı
- Hibrit yapı:
  - Ana akış: Tek sayfa mantığıyla hızlı değer anlatımı
  - Ek sayfalar: Hizmet detay sayfaları

### 2.3 Hizmet Detay Sayfası Zorunlu Bölümleri
1. Problem tanımı
2. Çözüm yaklaşımı
3. Kullanım senaryoları
4. Uygulama adımları
5. Beklenen iş çıktıları / KPI
6. SSS
7. CTA (demo talebi)

---

## 3) Fonksiyonel Gereksinimler

### 3.1 Navigasyon
- Üst menü masaüstü + mobil menü
- Çok dilli içerik geçişi
- Sabit (sticky) header

### 3.2 Lead Toplama
- Demo talep formu
- Genel iletişim formu
- Mail ve telefon tıklama aksiyonları
- WhatsApp tıkla-iletişim

### 3.3 Chat
- Custom canlı destek chat
- İlk fazda mevcut backend'e entegre şekilde çalışacak

### 3.4 İçerik Yönetimi
- Statik içerik + yapılandırılabilir metin alanları
- TR/EN içerik eşleştirmesi

---

## 4) Entegrasyon Gereksinimleri

### 4.1 Zorunlu Entegrasyonlar
- WhatsApp tıkla-ara / tıkla-yaz
- Custom canlı chat

### 4.2 Geçici Teknik Varsayım (Backend belirsizliği nedeniyle)
- Node.js (Express)
- PostgreSQL
- Docker

Not: Mevcut backend bilgisi kesinleşince mimari revize edilecektir.

---

## 5) Teknik Mimari

### 5.1 Frontend
- Next.js + React + TypeScript
- Tailwind CSS
- shadcn/ui bileşen mimarisi

### 5.2 Bileşen Standartları
- UI bileşenleri: `components/ui`
- Yardımcı fonksiyonlar: `lib`
- Global stil: `app/globals.css`

### 5.3 API Katmanı (Öneri)
- `POST /api/leads/demo`
- `POST /api/leads/contact`
- `POST /api/chat/session`
- `POST /api/chat/message`
- `GET /api/chat/history/:sessionId`

### 5.4 Veri Modeli (Öneri)
- `leads_demo`
  - id, name, email, phone, company, message, lang, consent, created_at
- `leads_contact`
  - id, name, email, phone, subject, message, lang, consent, created_at
- `chat_sessions`
  - id, visitor_id, lang, started_at, closed_at
- `chat_messages`
  - id, session_id, sender_type(user/agent/system), content, created_at

---

## 6) SEO Gereksinimleri (Tam Paket)

### 6.1 Teknik SEO
- `sitemap.xml`
- `robots.txt`
- Canonical URL yönetimi
- Çok dilli `hreflang` etiketleri

### 6.2 Sayfa Meta
- Her sayfa için title/description
- Open Graph / Twitter Card

### 6.3 Yapısal Veri
- Schema.org
  - Organization
  - Service

---

## 7) Güvenlik ve Yasal Gereksinimler (Tam Paket)

1. KVKK/GDPR uyumlu çerez bildirimi
2. Aydınlatma metni + gizlilik politikası
3. Terms / hizmet şartları
4. Formlarda açık rıza checkbox

Ek teknik önlemler:
- CSRF/XSS önlemleri
- Form rate limit
- Input doğrulama ve sanitization
- Hassas log maskeleme

---

## 8) Yayın ve Operasyon

### 8.1 Hosting/Panel
- Natro + Plesk

### 8.2 Yayın Modeli
- Staging ortamı önerilir
- Production deploy öncesi checklist
  - Form testleri
  - Dil testi
  - SEO etiket testi
  - Yasal sayfa link testi

---

## 9) Performans ve İzleme

### 9.1 Performans Hedefi
- İlk fazda zorunlu metrik hedefi yok
- Sonraki fazda performans optimizasyonu yapılacak

### 9.2 Sonraki Faz İzleme Önerisi
- Web Vitals
- Form dönüşüm oranları
- Dil bazlı dönüşüm kıyasları

---

## 10) Faz Planı

### Faz 1 (MVP)
- Ana sayfa + hizmet detay şablonu
- TR/EN yapı
- Menü ve CTA akışları
- Demo + iletişim formları
- WhatsApp aksiyonu
- Custom chat temel sürüm
- SEO temel kurulum
- Yasal sayfalar

### Faz 2
- Chat geliştirmeleri (agent panel, etiketleme)
- İçerik yönetim kolaylıkları
- Performans optimizasyonu
- Gelişmiş dönüşüm raporları

---

## 11) Riskler ve Açık Konular

### 11.1 Riskler
- Mevcut backend belirsizliği entegrasyon süresini uzatabilir
- Plesk/Natro ortamında Node deployment kısıtları olabilir
- Çoklu dil içerik yönetimi operasyonel disiplin gerektirir

### 11.2 Açık Konular
1. Mevcut backend teknolojisi kesinleşecek
2. Chat agent tarafı kapsamı netleşecek
3. Formdan sonra CRM aktarımı istenip istenmediği netleşecek

---

## 12) Kabul Kriterleri (Özet)

- `/` ana akışta TR/EN içerik ve CTA’lar çalışır
- Demo ve iletişim formu gönderimi başarılı
- WhatsApp aksiyonu çalışır
- Custom chat mesajlaşma akışı çalışır
- SEO dosyaları ve meta etiketler tamam
- Yasal sayfalar erişilebilir ve formlarda rıza checkbox mevcut

---

## 13) Son Not
Bu doküman, mevcut kararlar baz alınarak hazırlanmıştır. Backend ve operasyonel kısıtlar netleştikçe revizyon sürümü oluşturulacaktır.
