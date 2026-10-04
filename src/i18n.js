import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('rky-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('rky-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }

// البيانات من صفحة الورشة على خرائط Google ولافتتها
export const site = {
  whatsapp: '966537829087',
  phone: { tel: '+966537829087', label: '053 782 9087' },
  rating: '4.4', reviews: '134',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.6994984,46.6549713',
  mapEmbed: 'https://www.google.com/maps?q=24.6994984,46.6549713&z=17&output=embed',
}
export const img = (p) => `/img/${p}`
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const brands = ['MG', 'Changan', 'Geely', 'Chery', 'Haval', 'GAC', 'Jetour', 'BYD', 'Great Wall', 'Hongqi', 'JAC', 'Exeed']

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لركن اليمامة لصيانة السيارات',
    brand: 'ركن اليمامة', brandSub: 'لصيانة السيارات الصينية',
    nav: { services: 'الخدمات', brands: 'الماركات', why: 'لماذا نحن', reviews: 'التقييمات', visit: 'الموقع', book: 'احجز فحص' },
    hero: {
      tag: 'مفتوح 24 ساعة · 7 أيام',
      title1: 'سيارتك صينية؟',
      title2: 'إحنا متخصصين فيها.',
      lead: 'ميكانيكا، كهرباء، برمجة، سمكرة وجيربوكس — لسيارات MG وشانجان وجيلي وشيري وهافال وغيرها. فحص وتشخيص بالكمبيوتر، وشرح واضح قبل أي قطعة.',
      cta1: 'احجز فحص عبر واتساب', cta2: 'اتصل الآن',
      bay: 'محل رقم 5',
    },
    brands: { kicker: 'الماركات', title: 'نشتغل على أغلب السيارات الصينية', note: 'ماركتك غير موجودة؟ أرسل لنا موديل سيارتك ونرد عليك.' },
    services: {
      kicker: 'الخدمات',
      title: 'كل اللي تحتاجه سيارتك… تحت سقف واحد',
      items: [
        { k: 'mech', t: 'ميكانيكا', d: 'محركات، تصفية كاملة، تبديل قطع، ودورات زيت وفلاتر.' },
        { k: 'gear', t: 'جيربوكس', d: 'فحص وإصلاح القير الأوتوماتيك، مع ضمان على العمل.' },
        { k: 'elec', t: 'كهرباء', d: 'أعطال كهربائية، حساسات، إضاءة، وتكييف السيارة.' },
        { k: 'prog', t: 'برمجة وتشخيص', d: 'فحص كمبيوتر، قراءة الأعطال، وبرمجة الوحدات والمفاتيح.' },
        { k: 'body', t: 'سمكرة', d: 'إصلاح الصدمات والهيكل وإرجاع السيارة لشكلها.' },
        { k: 'check', t: 'فحص قبل الشراء', d: 'تبي تشتري سيارة صينية مستعملة؟ نفحصها قبل لا تدفع.' },
      ],
    },
    why: {
      kicker: 'لماذا ركن اليمامة',
      title: 'اللي يقوله عملاؤنا',
      points: [
        { n: '24/7', t: 'مفتوحين على مدار الساعة', d: 'عطل بالليل؟ الورشة شغالة كل الأيام، كل الساعات.' },
        { n: '01', t: 'شرح قبل أي قطعة', d: 'المهندس يشرح لك المشكلة ويستشيرك قبل شراء أي قطعة.' },
        { n: '30', t: 'يوم ضمان على الجيربوكس', d: 'ضمان شهر كامل على إصلاح القير — حسب تجربة أحد العملاء.' },
        { n: '★', t: 'تقييم 4.4 من 134', d: 'عملاء يذكرون المهندس طارق وإبراهيم بالاسم.' },
      ],
    },
    reviews: { kicker: 'التقييمات', title: 'من مراجعات Google', count: 'تقييم على Google', note: 'مقتطفات حقيقية من مراجعات الورشة على خرائط Google.' },
    book: {
      kicker: 'احجز', title: 'احجز فحص لسيارتك',
      sub: 'اكتب بيانات سيارتك والمشكلة، ويفتح واتساب برسالة جاهزة للورشة.',
      name: 'الاسم', phone: 'الجوال', brand: 'الماركة', model: 'الموديل والسنة', service: 'نوع الخدمة', issue: 'وش المشكلة؟', urgent: 'السيارة واقفة / تحتاج سطحة',
      other: 'أخرى',
      send: 'أرسل عبر واتساب', required: 'الرجاء كتابة الاسم ورقم الجوال.',
      msg: { hello: 'السلام عليكم، أبي أحجز فحص/صيانة لسيارتي', name: 'الاسم', phone: 'الجوال', brand: 'الماركة', model: 'الموديل', service: 'الخدمة', issue: 'المشكلة', urgent: '⚠️ السيارة واقفة وتحتاج سطحة' },
    },
    visit: {
      kicker: 'الموقع', title: 'أم الحمام الشرقي — محل رقم 5',
      addr: 'شارع إبراهيم النفيسي، أم الحمام الشرقي، الرياض 12326',
      hours: 'مفتوح 24 ساعة طوال أيام الأسبوع',
      dir: 'الاتجاهات', call: 'اتصال',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', book: 'احجز عبر واتساب' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Rukn Al Yamama Car Maintenance',
    brand: 'Rukn Al Yamama', brandSub: 'Chinese car specialists',
    nav: { services: 'Services', brands: 'Brands', why: 'Why us', reviews: 'Reviews', visit: 'Location', book: 'Book a check' },
    hero: {
      tag: 'Open 24 hours · 7 days',
      title1: 'Driving a Chinese car?',
      title2: 'We specialise in it.',
      lead: 'Mechanics, electrics, programming, body work and gearboxes — for MG, Changan, Geely, Chery, Haval and more. Computer diagnostics and a clear explanation before any part is bought.',
      cta1: 'Book a check on WhatsApp', cta2: 'Call now',
      bay: 'Unit 5',
    },
    brands: { kicker: 'Brands', title: 'We work on most Chinese makes', note: 'Don’t see your make? Send us your model and we’ll get back to you.' },
    services: {
      kicker: 'Services',
      title: 'Everything your car needs — under one roof',
      items: [
        { k: 'mech', t: 'Mechanics', d: 'Engines, full tune-ups, part replacement, oil and filter service.' },
        { k: 'gear', t: 'Gearbox', d: 'Automatic gearbox diagnosis and repair, with a warranty on the work.' },
        { k: 'elec', t: 'Electrics', d: 'Electrical faults, sensors, lighting and car A/C.' },
        { k: 'prog', t: 'Programming & diagnostics', d: 'Computer scans, fault reading, module and key programming.' },
        { k: 'body', t: 'Body work', d: 'Dent and body repair to bring your car back to shape.' },
        { k: 'check', t: 'Pre-purchase inspection', d: 'Buying a used Chinese car? We check it before you pay.' },
      ],
    },
    why: {
      kicker: 'Why Rukn Al Yamama',
      title: 'What our customers say',
      points: [
        { n: '24/7', t: 'Open round the clock', d: 'Breakdown at night? The workshop is open every day, all hours.' },
        { n: '01', t: 'Explained before any part', d: 'The engineer explains the problem and consults you before buying parts.' },
        { n: '30', t: 'day gearbox warranty', d: 'A full month’s warranty on gearbox repair — per a customer review.' },
        { n: '★', t: 'Rated 4.4 from 134', d: 'Customers mention engineer Tarek and Ibrahim by name.' },
      ],
    },
    reviews: { kicker: 'Reviews', title: 'From Google reviews', count: 'Google reviews', note: 'Real excerpts from the workshop’s Google Maps reviews (in Arabic).' },
    book: {
      kicker: 'Book', title: 'Book a check for your car',
      sub: 'Enter your car details and the problem — WhatsApp opens with a ready message to the workshop.',
      name: 'Name', phone: 'Mobile', brand: 'Make', model: 'Model & year', service: 'Service', issue: 'What’s the problem?', urgent: 'Car won’t move / needs a tow',
      other: 'Other',
      send: 'Send on WhatsApp', required: 'Please enter your name and mobile number.',
      msg: { hello: 'Hello, I would like to book a check/service for my car', name: 'Name', phone: 'Mobile', brand: 'Make', model: 'Model', service: 'Service', issue: 'Problem', urgent: '⚠️ Car won’t move — needs a tow' },
    },
    visit: {
      kicker: 'Location', title: 'Umm Al Hamam East — Unit 5',
      addr: 'Ibrahim Al Nafisi St., Umm Al Hamam East, Riyadh 12326',
      hours: 'Open 24 hours, 7 days a week',
      dir: 'Directions', call: 'Call',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', book: 'Book on WhatsApp' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'Dr. Mokhtar Fal', q: 'كل التحية والتقدير للمهندس القدير طارق على شغله الرائع وأمانته العالية في شرح كل شيء بالتفصيل، وكذلك استشارتي قبل شراء أي قطعة للسيارة… وأعطاني ضمان لمدة شهر كامل على الجربوكس.' },
  { n: 'Private Mail', q: 'طارق وإبراهيم شكرًا على التعامل الراقي والمحترم. سويت تصفية كاملة جيلي كولراي وتغيير قطعة، سعرهم مناسب وشغل ممتاز 👍🏻' },
]
