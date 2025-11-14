import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO Component
 * Manages all meta tags, Open Graph, Twitter Cards, and structured data
 * for optimal search engine optimization and social media sharing
 */
const SEO = ({
  title = 'NeuroForge Technologies | AI-Powered Software Solutions',
  description = 'NeuroForge Technologies delivers cutting-edge AI systems, custom software development, and intelligent automation solutions. From web and mobile apps to desktop applications and machine learning pipelines — we engineer the future.',
  keywords = 'AI development, machine learning, custom software, web development, mobile apps, desktop applications, automation systems, React, Python, artificial intelligence, software engineering, Temple TX',
  ogImage = '/og-image.jpg',
  url = 'https://neuroforgetechnologies.net',
  type = 'website',
  author = 'NeuroForge Technologies',
  twitterHandle = '@neuroforgetech',
}) => {
  // Structured data for Organization
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NeuroForge Technologies',
    alternateName: 'NeuroForge',
    description: description,
    url: url,
    logo: `${url}/logo.svg`,
    image: `${url}${ogImage}`,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'contact@neuroforgetechnologies.net',
      areaServed: 'US',
      availableLanguage: ['English'],
      contactOption: 'TollFree',
    },
    sameAs: [
      'https://twitter.com/neuroforgetech',
      'https://linkedin.com/company/neuroforgetechnologies',
      'https://github.com/neuroforgetech',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Temple',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
    },
  };

  // Structured data for LocalBusiness
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NeuroForge Technologies',
    description: description,
    url: url,
    telephone: '+1-555-123-4567',
    email: 'contact@neuroforgetechnologies.net',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Temple',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.0982',
      longitude: '-97.3428',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  // Structured data for WebSite
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NeuroForge Technologies',
    url: url,
    description: description,
    publisher: {
      '@type': 'Organization',
      name: 'NeuroForge Technologies',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Structured data for Service offerings
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software Development',
    provider: {
      '@type': 'Organization',
      name: 'NeuroForge Technologies',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom web applications and responsive websites',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & Automation Systems',
            description: 'Machine learning models and intelligent automation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Desktop Applications',
            description: 'Cross-platform desktop software solutions',
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NeuroForge Technologies" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${ogImage}`} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Temple" />
      <meta name="geo.position" content="31.0982;-97.3428" />
      <meta name="ICBM" content="31.0982, -97.3428" />
      
      {/* Structured Data (JSON-LD) - Multiple schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  twitterHandle: PropTypes.string,
};

export default SEO;