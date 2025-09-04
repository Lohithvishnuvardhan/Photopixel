import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Translation data
const translations = {
  en: {
    // Header
    'header.title': 'Photo Pixel',
    'header.search': 'Search for cameras, lenses, accessories...',
    'header.cart': 'Shopping cart',
    'header.profile': 'Profile',
    'header.demo': 'Demo Mode',
    
    // Navigation
    'nav.cameras': 'Cameras',
    'nav.lenses': 'Lenses',
    'nav.accessories': 'Accessories',
    'nav.batteries': 'Batteries',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    
    // Home page
    'home.hero.title': 'Turn Pixels into Profit.',
    'home.hero.subtitle': 'Professional photography equipment for every level of expertise. From beginners to pros, find your perfect gear.',
    'home.hero.shopNow': 'Shop Now',
    'home.hero.learnMore': 'Learn More',
    'home.stats.customers': 'Happy Customers',
    'home.stats.products': 'Products Available',
    'home.stats.years': 'Years of Excellence',
    'home.stats.reviews': '5-Star Reviews',
    'home.trust.secure': 'Secure Shopping',
    'home.trust.secureDesc': '100% Protected Payments',
    'home.trust.shipping': 'Free Shipping',
    'home.trust.shippingDesc': 'On orders over ₹50,000',
    'home.trust.support': '24/7 Support',
    'home.trust.supportDesc': 'Dedicated customer care',
    'home.trust.price': 'Price Match',
    'home.trust.priceDesc': 'Best price guaranteed',
    'home.featured': 'Featured Products',
    'home.testimonials': 'What Our Customers Say',
    
    // Product pages
    'products.cameras.title': 'Professional Cameras',
    'products.cameras.subtitle': 'Discover our selection of high-end cameras for professionals',
    'products.lenses.title': 'Professional Lenses',
    'products.lenses.subtitle': 'Premium quality lenses for exceptional image quality',
    'products.accessories.title': 'Professional Accessories',
    'products.accessories.subtitle': 'Essential gear for your photography needs',
    'products.batteries.title': 'Professional Batteries',
    'products.batteries.subtitle': 'Premium power solutions for your camera equipment',
    'products.freeShipping': 'Free Shipping',
    'products.warranty': 'Warranty Included',
    'products.addToCart': 'Add to Cart',
    'products.buyNow': 'Buy Now',
    'products.inStock': 'In Stock',
    'products.outOfStock': 'Out of Stock',
    'products.keyFeatures': 'Key Features',
    'products.specifications': 'Specifications',
    'products.ships': 'Ships in 24 hours',
    
    // About page
    'about.title': 'About PhotoPro',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'We believe that every photographer deserves access to the best equipment to capture their vision. Our mission is to provide photographers with not just equipment, but the knowledge and support they need to create amazing images.',
    'about.why.title': 'Why Choose Us?',
    'about.why.expert': 'Expert staff with years of photography experience',
    'about.why.curated': 'Carefully curated selection of premium equipment',
    'about.why.prices': 'Competitive prices and price match guarantee',
    'about.why.warranty': 'Extended warranty options',
    'about.why.shipping': 'Free shipping on orders over $100',
    'about.guarantee.title': 'Our Guarantee',
    'about.guarantee.desc': 'We stand behind every product we sell. If you\'re not completely satisfied with your purchase, we offer a 30-day return policy with no questions asked.',
    'about.intro': 'Welcome to PhotoPixel, your premier destination for professional photography equipment. Since 2010, we\'ve been serving photographers of all levels with the highest quality cameras, lenses, and accessories.',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.orderSummary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.free': 'Free',
    
    // Footer
    'footer.aboutUs': 'About Us',
    'footer.aboutDesc': 'Professional photography equipment for every level of expertise.',
    'footer.quickLinks': 'Quick Links',
    'footer.customerService': 'Customer Service',
    'footer.shippingInfo': 'Shipping Info',
    'footer.returns': 'Returns',
    'footer.trackOrder': 'Track Order',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsConditions': 'Terms & Conditions',
    'footer.faq': 'FAQ',
    'footer.copyright': '© 2024 Photo Pixel. All rights reserved.',
    
    // Blog
    'blog.title': 'Photography Blog',
    'blog.subtitle': 'Discover the latest photography tips, gear reviews, and industry insights from our expert team.',
    'blog.search': 'Search articles...',
    'blog.readMore': 'Read More',
    'blog.noResults': 'No articles found',
    'blog.noResultsDesc': 'Try adjusting your search or filter criteria.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.close': 'Close',
  },
  hi: {
    // Header
    'header.title': 'फोटो पिक्सेल',
    'header.search': 'कैमरा, लेंस, एक्सेसरीज खोजें...',
    'header.cart': 'शॉपिंग कार्ट',
    'header.profile': 'प्रोफाइल',
    'header.demo': 'डेमो मोड',
    
    // Navigation
    'nav.cameras': 'कैमरा',
    'nav.lenses': 'लेंस',
    'nav.accessories': 'एक्सेसरीज',
    'nav.batteries': 'बैटरी',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.blog': 'ब्लॉग',
    
    // Home page
    'home.hero.title': 'पिक्सेल को मुनाफे में बदलें।',
    'home.hero.subtitle': 'हर स्तर की विशेषज्ञता के लिए पेशेवर फोटोग्राफी उपकरण। शुरुआती से लेकर पेशेवरों तक, अपना सही गियर खोजें।',
    'home.hero.shopNow': 'अभी खरीदें',
    'home.hero.learnMore': 'और जानें',
    'home.stats.customers': 'खुश ग्राहक',
    'home.stats.products': 'उपलब्ध उत्पाद',
    'home.stats.years': 'उत्कृष्टता के वर्ष',
    'home.stats.reviews': '5-स्टार रिव्यू',
    'home.trust.secure': 'सुरक्षित खरीदारी',
    'home.trust.secureDesc': '100% सुरक्षित भुगतान',
    'home.trust.shipping': 'मुफ्त शिपिंग',
    'home.trust.shippingDesc': '₹50,000 से अधिक के ऑर्डर पर',
    'home.trust.support': '24/7 सहायता',
    'home.trust.supportDesc': 'समर्पित ग्राहक सेवा',
    'home.trust.price': 'मूल्य मैच',
    'home.trust.priceDesc': 'सर्वोत्तम मूल्य की गारंटी',
    'home.featured': 'विशेष उत्पाद',
    'home.testimonials': 'हमारे ग्राहक क्या कहते हैं',
    
    // Product pages
    'products.cameras.title': 'पेशेवर कैमरा',
    'products.cameras.subtitle': 'पेशेवरों के लिए हमारे उच्च-गुणवत्ता कैमरा का चयन खोजें',
    'products.lenses.title': 'पेशेवर लेंस',
    'products.lenses.subtitle': 'असाधारण छवि गुणवत्ता के लिए प्रीमियम गुणवत्ता लेंस',
    'products.accessories.title': 'पेशेवर एक्सेसरीज',
    'products.accessories.subtitle': 'आपकी फोटोग्राफी आवश्यकताओं के लिए आवश्यक गियर',
    'products.batteries.title': 'पेशेवर बैटरी',
    'products.batteries.subtitle': 'आपके कैमरा उपकरण के लिए प्रीमियम पावर समाधान',
    'products.freeShipping': 'मुफ्त शिपिंग',
    'products.warranty': 'वारंटी शामिल',
    'products.addToCart': 'कार्ट में जोड़ें',
    'products.buyNow': 'अभी खरीदें',
    'products.inStock': 'स्टॉक में',
    'products.outOfStock': 'स्टॉक में नहीं',
    'products.keyFeatures': 'मुख्य विशेषताएं',
    'products.specifications': 'विशिष्टताएं',
    'products.ships': '24 घंटे में शिप',
    
    // About page
    'about.title': 'फोटोप्रो के बारे में',
    'about.mission.title': 'हमारा मिशन',
    'about.mission.desc': 'हम मानते हैं कि हर फोटोग्राफर को अपनी दृष्टि को कैप्चर करने के लिए सर्वोत्तम उपकरण तक पहुंच का हक है। हमारा मिशन फोटोग्राफरों को न केवल उपकरण प्रदान करना है, बल्कि उन्हें अद्भुत छवियां बनाने के लिए आवश्यक ज्ञान और सहायता भी प्रदान करना है।',
    'about.why.title': 'हमें क्यों चुनें?',
    'about.why.expert': 'वर्षों के फोटोग्राफी अनुभव वाले विशेषज्ञ कर्मचारी',
    'about.why.curated': 'प्रीमियम उपकरण का सावधानीपूर्वक चयनित संग्रह',
    'about.why.prices': 'प्रतिस्पर्धी कीमतें और मूल्य मैच गारंटी',
    'about.why.warranty': 'विस्तारित वारंटी विकल्प',
    'about.why.shipping': '$100 से अधिक के ऑर्डर पर मुफ्त शिपिंग',
    'about.guarantee.title': 'हमारी गारंटी',
    'about.guarantee.desc': 'हम अपने द्वारा बेचे जाने वाले हर उत्पाद के पीछे खड़े हैं। यदि आप अपनी खरीदारी से पूरी तरह संतुष्ट नहीं हैं, तो हम बिना किसी सवाल के 30-दिन की वापसी नीति प्रदान करते हैं।',
    'about.intro': 'फोटोपिक्सेल में आपका स्वागत है, पेशेवर फोटोग्राफी उपकरण के लिए आपका प्रमुख गंतव्य। 2010 से, हम सभी स्तरों के फोटोग्राफरों को उच्चतम गुणवत्ता वाले कैमरा, लेंस और एक्सेसरीज के साथ सेवा प्रदान कर रहे हैं।',
    
    // Cart
    'cart.title': 'शॉपिंग कार्ट',
    'cart.empty': 'आपका कार्ट खाली है',
    'cart.continueShopping': 'खरीदारी जारी रखें',
    'cart.orderSummary': 'ऑर्डर सारांश',
    'cart.subtotal': 'उप-योग',
    'cart.shipping': 'शिपिंग',
    'cart.total': 'कुल',
    'cart.checkout': 'चेकआउट पर जाएं',
    'cart.free': 'मुफ्त',
    
    // Footer
    'footer.aboutUs': 'हमारे बारे में',
    'footer.aboutDesc': 'हर स्तर की विशेषज्ञता के लिए पेशेवर फोटोग्राफी उपकरण।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.customerService': 'ग्राहक सेवा',
    'footer.shippingInfo': 'शिपिंग जानकारी',
    'footer.returns': 'रिटर्न',
    'footer.trackOrder': 'ऑर्डर ट्रैक करें',
    'footer.privacyPolicy': 'गोपनीयता नीति',
    'footer.termsConditions': 'नियम और शर्तें',
    'footer.faq': 'FAQ',
    'footer.copyright': '© 2024 फोटो पिक्सेल। सभी अधिकार सुरक्षित।',
    
    // Blog
    'blog.title': 'फोटोग्राफी ब्लॉग',
    'blog.subtitle': 'हमारी विशेषज्ञ टीम से नवीनतम फोटोग्राफी टिप्स, गियर रिव्यू और उद्योग अंतर्दृष्टि खोजें।',
    'blog.search': 'लेख खोजें...',
    'blog.readMore': 'और पढ़ें',
    'blog.noResults': 'कोई लेख नहीं मिला',
    'blog.noResultsDesc': 'अपनी खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें।',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.close': 'बंद करें',
  },
  te: {
    // Header
    'header.title': 'ఫోటో పిక్సెల్',
    'header.search': 'కెమెరాలు, లెన్స్‌లు, యాక్సెసరీలను వెతకండి...',
    'header.cart': 'షాపింగ్ కార్ట్',
    'header.profile': 'ప్రొఫైల్',
    'header.demo': 'డెమో మోడ్',
    
    // Navigation
    'nav.cameras': 'కెమెరాలు',
    'nav.lenses': 'లెన్స్‌లు',
    'nav.accessories': 'యాక్సెసరీలు',
    'nav.batteries': 'బ్యాటరీలు',
    'nav.about': 'మా గురించి',
    'nav.contact': 'సంప్రదింపులు',
    'nav.blog': 'బ్లాగ్',
    
    // Home page
    'home.hero.title': 'పిక్సెల్‌లను లాభంగా మార్చండి.',
    'home.hero.subtitle': 'ప్రతి స్థాయి నైపుణ్యం కోసం వృత్తిపరమైన ఫోటోగ్రఫీ పరికరాలు. ప్రారంభకుల నుండి నిపుణుల వరకు, మీ పర్ఫెక్ట్ గేర్‌ను కనుగొనండి.',
    'home.hero.shopNow': 'ఇప్పుడే కొనండి',
    'home.hero.learnMore': 'మరింత తెలుసుకోండి',
    'home.stats.customers': 'సంతోషకరమైన కస్టమర్లు',
    'home.stats.products': 'అందుబాటులో ఉన్న ఉత్పత్తులు',
    'home.stats.years': 'అత్యుత్తమ సంవత్సరాలు',
    'home.stats.reviews': '5-స్టార్ రివ్యూలు',
    'home.trust.secure': 'సురక్షిత షాపింగ్',
    'home.trust.secureDesc': '100% రక్షిత చెల్లింపులు',
    'home.trust.shipping': 'ఉచిత షిప్పింగ్',
    'home.trust.shippingDesc': '₹50,000 కంటే ఎక్కువ ఆర్డర్లపై',
    'home.trust.support': '24/7 మద్దతు',
    'home.trust.supportDesc': 'అంకితమైన కస్టమర్ కేర్',
    'home.trust.price': 'ధర మ్యాచ్',
    'home.trust.priceDesc': 'ఉత్తమ ధర హామీ',
    'home.featured': 'ప్రత్యేక ఉత్పత్తులు',
    'home.testimonials': 'మా కస్టమర్లు ఏమి చెబుతున్నారు',
    
    // Product pages
    'products.cameras.title': 'వృత్తిపరమైన కెమెరాలు',
    'products.cameras.subtitle': 'వృత్తిపరుల కోసం మా అధిక-నాణ్యత కెమెరాల ఎంపికను కనుగొనండి',
    'products.lenses.title': 'వృత్తిపరమైన లెన్స్‌లు',
    'products.lenses.subtitle': 'అసాధారణ చిత్ర నాణ్యత కోసం ప్రీమియం నాణ్యత లెన్స్‌లు',
    'products.accessories.title': 'వృత్తిపరమైన యాక్సెసరీలు',
    'products.accessories.subtitle': 'మీ ఫోటోగ్రఫీ అవసరాలకు అవసరమైన గేర్',
    'products.batteries.title': 'వృత్తిపరమైన బ్యాటరీలు',
    'products.batteries.subtitle': 'మీ కెమెరా పరికరాలకు ప్రీమియం పవర్ సొల్యూషన్స్',
    'products.freeShipping': 'ఉచిత షిప్పింగ్',
    'products.warranty': 'వారంటీ చేర్చబడింది',
    'products.addToCart': 'కార్ట్‌కు జోడించండి',
    'products.buyNow': 'ఇప్పుడే కొనండి',
    'products.inStock': 'స్టాక్‌లో ఉంది',
    'products.outOfStock': 'స్టాక్‌లో లేదు',
    'products.keyFeatures': 'ముఖ్య లక్షణాలు',
    'products.specifications': 'వివరణలు',
    'products.ships': '24 గంటల్లో షిప్',
    
    // About page
    'about.title': 'ఫోటోప్రో గురించి',
    'about.mission.title': 'మా లక్ష్యం',
    'about.mission.desc': 'ప్రతి ఫోటోగ్రాఫర్ వారి దృష్టిని క్యాప్చర్ చేయడానికి ఉత్తమ పరికరాలకు యాక్సెస్ అర్హులని మేము నమ్ముతున్నాము. మా లక్ష్యం ఫోటోగ్రాఫర్లకు కేవలం పరికరాలను మాత్రమే కాకుండా, అద్భుతమైన చిత్రాలను సృష్టించడానికి అవసరమైన జ్ఞానం మరియు మద్దతును అందించడం.',
    'about.why.title': 'మమ్మల్ని ఎందుకు ఎంచుకోవాలి?',
    'about.why.expert': 'సంవత్సరాల ఫోటోగ్రఫీ అనుభవం ఉన్న నిపుణుల సిబ్బంది',
    'about.why.curated': 'ప్రీమియం పరికరాల జాగ్రత్తగా ఎంపిక చేసిన ఎంపిక',
    'about.why.prices': 'పోటీ ధరలు మరియు ధర మ్యాచ్ హామీ',
    'about.why.warranty': 'పొడిగించిన వారంటీ ఎంపికలు',
    'about.why.shipping': '$100 కంటే ఎక్కువ ఆర్డర్లపై ఉచిత షిప్పింగ్',
    'about.guarantee.title': 'మా హామీ',
    'about.guarantee.desc': 'మేము విక్రయించే ప్రతి ఉత్పత్తి వెనుక మేము నిలబడతాము. మీరు మీ కొనుగోలుతో పూర్తిగా సంతృప్తి చెందకపోతే, మేము ఎటువంటి ప్రశ్నలు లేకుండా 30-రోజుల రిటర్న్ పాలసీని అందిస్తాము।',
    'about.intro': 'ఫోటోపిక్సెల్‌కు స్వాగతం, వృత్తిపరమైన ఫోటోగ్రఫీ పరికరాలకు మీ ప్రధాన గమ్యస్థానం. 2010 నుండి, మేము అన్ని స్థాయిల ఫోటోగ్రాఫర్లకు అత్యధిక నాణ్యత కెమెరాలు, లెన్స్‌లు మరియు యాక్సెసరీలతో సేవలు అందిస్తున్నాము।',
    
    // Cart
    'cart.title': 'షాపింగ్ కార్ట్',
    'cart.empty': 'మీ కార్ట్ ఖాళీగా ఉంది',
    'cart.continueShopping': 'షాపింగ్ కొనసాగించండి',
    'cart.orderSummary': 'ఆర్డర్ సారాంశం',
    'cart.subtotal': 'ఉప-మొత్తం',
    'cart.shipping': 'షిప్పింగ్',
    'cart.total': 'మొత్తం',
    'cart.checkout': 'చెక్‌అవుట్‌కు వెళ్లండి',
    'cart.free': 'ఉచితం',
    
    // Footer
    'footer.aboutUs': 'మా గురించి',
    'footer.aboutDesc': 'ప్రతి స్థాయి నైపుణ్యం కోసం వృత్తిపరమైన ఫోటోగ్రఫీ పరికరాలు.',
    'footer.quickLinks': 'త్వరిత లింక్‌లు',
    'footer.customerService': 'కస్టమర్ సేవ',
    'footer.shippingInfo': 'షిప్పింగ్ సమాచారం',
    'footer.returns': 'రిటర్న్స్',
    'footer.trackOrder': 'ఆర్డర్ ట్రాక్ చేయండి',
    'footer.privacyPolicy': 'గోప్యతా విధానం',
    'footer.termsConditions': 'నియమాలు మరియు షరతులు',
    'footer.faq': 'FAQ',
    'footer.copyright': '© 2024 ఫోటో పిక్సెల్. అన్ని హక్కులు రక్షించబడ్డాయి.',
    
    // Blog
    'blog.title': 'ఫోటోగ్రఫీ బ్లాగ్',
    'blog.subtitle': 'మా నిపుణుల బృందం నుండి తాజా ఫోటోగ్రఫీ చిట్కాలు, గేర్ రివ్యూలు మరియు పరిశ్రమ అంతర్దృష్టులను కనుగొనండి.',
    'blog.search': 'వ్యాసాలను వెతకండి...',
    'blog.readMore': 'మరింత చదవండి',
    'blog.noResults': 'వ్యాసాలు కనుగొనబడలేదు',
    'blog.noResultsDesc': 'మీ శోధన లేదా ఫిల్టర్ ప్రమాణాలను సర్దుబాటు చేయడానికి ప్రయత్నించండి.',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'సేవ్ చేయండి',
    'common.edit': 'సవరించండి',
    'common.delete': 'తొలగించండి',
    'common.view': 'చూడండి',
    'common.close': 'మూసివేయండి',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};