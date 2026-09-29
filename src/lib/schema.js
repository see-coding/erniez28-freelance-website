import { site, faq } from '../data/e28.js'

export const person = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: 'Sascha Ernst',
  alternateName: 'Ernie',
  url: `${site.url}/`,
  image: `${site.url}/images/ernie-card.jpg`,
  email: `mailto:${site.email}`,
  jobTitle: 'Freelance Shopware 6 Entwickler',
  address: { '@type': 'PostalAddress', addressLocality: 'Hagen', addressRegion: 'NRW', addressCountry: 'DE' },
  knowsLanguage: ['de', 'en'],
  knowsAbout: ['Shopware 6', 'Shopware-Plugin-Entwicklung', 'Shopware Storefront und Themes', 'Shopware-Updates und Migration auf 6.7', 'Shopware-Schnittstellen und API-Anbindungen', 'PHP', 'Symfony', 'Twig', 'Vue.js', 'E-Commerce', 'Shop-Wartung', 'IT-Sicherheit'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Google Cybersecurity Professional Certificate', credentialCategory: 'certificate', url: 'https://coursera.org/verify/professional-cert/HCHP1KRB0IHY' },
    { '@type': 'EducationalOccupationalCredential', name: 'Google IT Support Professional Certificate', credentialCategory: 'certificate', url: 'https://coursera.org/verify/professional-cert/N65BH8UF9K73' },
  ],
  sameAs: [site.linkedin, site.github],
}

export const service = {
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#service`,
  name: 'erniez28 · Shopware-Entwicklung Sascha Ernst',
  url: `${site.url}/`,
  image: `${site.url}/images/ernie-og.jpg`,
  email: site.email,
  telephone: '+49 2331 6957172',
  founder: { '@id': `${site.url}/#person` },
  address: { '@type': 'PostalAddress', streetAddress: 'Franklinstr. 18', postalCode: '58089', addressLocality: 'Hagen', addressRegion: 'NRW', addressCountry: 'DE' },
  areaServed: [{ '@type': 'Country', name: 'Deutschland' }, { '@type': 'Country', name: 'Österreich' }, { '@type': 'Country', name: 'Schweiz' }],
  priceRange: '€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Shopware-Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopware-Plugin-Entwicklung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopware-Storefront, Themes und Updates' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopware-Schnittstellen und Integrationen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopware-Wartung und Notfall-Hilfe' }, priceSpecification: { '@type': 'UnitPriceSpecification', price: 150, priceCurrency: 'EUR', unitText: 'Monat', description: 'ab 150 € im Monat' } },
    ],
  },
}

export const website = { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: 'erniez28', inLanguage: 'de-DE', publisher: { '@id': `${site.url}/#person` } }

export const faqPage = {
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
}

export const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes })
