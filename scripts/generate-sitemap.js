import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://dukaanmitra.in';

// Define core routes
const routes = [
  { path: '', changefreq: 'daily', priority: 1.0 },
  { path: 'features', changefreq: 'weekly', priority: 0.9 },
  { path: 'services', changefreq: 'weekly', priority: 0.9 },
  { path: 'how-it-works', changefreq: 'weekly', priority: 0.9 },
  { path: 'pricing', changefreq: 'monthly', priority: 0.7 },
  { path: 'udhaar-management-app', changefreq: 'weekly', priority: 1.0 },
  { path: 'whatsapp-shop-management', changefreq: 'weekly', priority: 1.0 },
  { path: 'get-more-google-reviews-for-shop', changefreq: 'weekly', priority: 1.0 },
  { path: 'free-tools', changefreq: 'weekly', priority: 0.9 },
  { path: 'templates', changefreq: 'weekly', priority: 0.9 },
  { path: 'case-studies', changefreq: 'weekly', priority: 0.8 },
  { path: 'contact', changefreq: 'weekly', priority: 0.8 },
  { path: 'blog', changefreq: 'daily', priority: 0.8 },
  { path: 'faq', changefreq: 'monthly', priority: 0.5 },
];

const programmaticComparisons = ['okcredit', 'khatabook', 'vyapar'];
const programmaticPages = [
  'kirana-store-software', 'bahi-khata-alternative', 'inventory-management-kirana',
  'increase-google-business-rating', 'whatsapp-review-automation', 'dukaan-online-kaise-laye',
  'whatsapp-se-saman-kaise-beche', 'kirana-store-ko-grow-kaise-kare', 'best-billing-software-for-mobile-shop',
  'garment-shop-software-free', 'hardware-shop-billing-app', 'medical-store-software-india',
  'supermarket-billing-software-free-download', 'jewellery-shop-management-software',
  'sweet-shop-billing-software', 'footwear-shop-software', 'electronics-shop-billing-app',
  'kirana-khata-app-for-pc', 'bina-internet-ke-billing-machine', 'whatsapp-par-customer-ko-bill-kaise-bheje',
  'auto-parts-shop-free-billing', 'grocery-shop-inventory-excel', 'retail-shop-accounting-software',
  'free-gst-billing-software', 'mobile-accessories-shop-software', 'kirana-shop-profit-calculator',
  'whatsapp-catalog-maker-app', 'digital-payment-tracker-for-shop'
];

const blogPages = [
  'udhaar-ka-hisaab-kaise-rakhe', 'kirana-shop-daily-sales-system', 'best-billing-software-for-small-shop',
  'kanpur-me-shop-ko-online-kaise-laaye', 'ai-sandboxing-secure-shop-data', 'google-business-profile-kaise-banaye',
  'gbp-suspend-kyun-hota-hai', 'whatsapp-se-order-kaise-le', 'local-business-ko-customer-kaise-mile',
  'manage-kirana-store-digitally-india-2026'
];

const cities = [
  'lucknow', 'kanpur', 'delhi', 'mumbai', 'bangalore', 'pune', 'ahmedabad', 'hyderabad', 'chennai', 'kolkata', 'jaipur', 'surat',
  'agra', 'aligarh', 'allahabad', 'amritsar', 'aurangabad', 'bareilly', 'bhavnagar', 'bhiwandi', 'bhopal', 'bhubaneswar',
  'bikaner', 'chandigarh', 'coimbatore', 'cuttack', 'dehradun', 'dhanbad', 'bhilai', 'durgapur', 'erode', 'faridabad',
  'firozabad', 'ghaziabad', 'gorakhpur', 'gulbarga', 'guntur', 'gwalior', 'guwahati', 'hubli', 'indore', 'jabalpur',
  'jalandhar', 'jalgaon', 'jamnagar', 'jamshedpur', 'jhansi', 'jodhpur', 'kakinada', 'kochi', 'kolhapur', 'kollam',
  'kota', 'kozhikode', 'kurnool', 'ludhiana', 'madurai', 'malegaon', 'mangalore', 'meerut', 'moradabad', 'mysore',
  'nagpur', 'nanded', 'nashik', 'nellore', 'noida', 'patna', 'pondicherry', 'raipur', 'rajkot', 'rajahmundry', 'ranchi',
  'rourkela', 'salem', 'sangli', 'siliguri', 'solapur', 'srinagar', 'thiruvananthapuram', 'thrissur', 'tiruchirappalli',
  'tirunelveli', 'tiruppur', 'ujjain', 'vadodara', 'varanasi', 'vasai-virar', 'vijayawada', 'visakhapatnam', 'warangal',
  'gurgaon', 'ajmer', 'akola', 'ulhasnagar', 'saharanpur', 'rohtak', 'mathura', 'gaya'
];

const today = new Date().toISOString().split('T')[0];

function generateXmlEntry(url, changefreq, priority, lastmod = today) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Core Routes
routes.forEach(route => {
  xmlContent += generateXmlEntry(`${SITE_URL}${route.path ? '/' + route.path : ''}`, route.changefreq, route.priority) + '\n';
});

// Comparison Routes
programmaticComparisons.forEach(slug => {
  xmlContent += generateXmlEntry(`${SITE_URL}/compare/${slug}`, 'monthly', 0.8) + '\n';
});

// Programmatic Features/Pain Point Pages
programmaticPages.forEach(slug => {
  xmlContent += generateXmlEntry(`${SITE_URL}/p/${slug}`, 'weekly', 0.8) + '\n';
});

// Blog Pages
blogPages.forEach(slug => {
  xmlContent += generateXmlEntry(`${SITE_URL}/blog/${slug}`, 'weekly', 0.8) + '\n';
});

// City Pages
cities.forEach(city => {
  xmlContent += generateXmlEntry(`${SITE_URL}/${city}`, 'weekly', 0.6) + '\n';
});

xmlContent += `</urlset>`;

// Write to public folder usually, but we will write to dist before deploying and to root for keeping track
fs.writeFileSync(path.resolve('./sitemap.xml'), xmlContent);

