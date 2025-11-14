# J&H Digital Website - Customization Guide

**Version:** 1.0.0  
**Last Updated:** 2024-01-24  
**Audience:** Developers, Content Managers, Marketing Teams

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Branding Updates](#branding-updates)
3. [Content Management](#content-management)
4. [Design Customization](#design-customization)
5. [Adding Real Images](#adding-real-images)
6. [Extending Functionality](#extending-functionality)
7. [Advanced Customization](#advanced-customization)
8. [Best Practices](#best-practices)

---

## Quick Start

This guide helps you customize the J&H Digital website to match your brand and content needs. All customizations can be made without deep technical knowledge by editing configuration files.

### What You Can Customize

- ✅ Company name and branding
- ✅ Colors and typography
- ✅ All text content
- ✅ Images and media
- ✅ Contact information
- ✅ Social media links
- ✅ Services and portfolio items
- ✅ Testimonials
- ✅ Navigation structure

### Files You'll Edit

Most customizations involve editing these files:
- [`src/data/siteConfig.js`](src/data/siteConfig.js:1) - Site-wide settings
- [`src/data/projects.js`](src/data/projects.js:1) - Portfolio projects
- [`src/data/testimonials.js`](src/data/testimonials.js:1) - Client testimonials
- [`tailwind.config.js`](tailwind.config.js:1) - Design system (colors, fonts)

---

## Branding Updates

### 1. Company Name and Tagline

**File:** [`src/data/siteConfig.js`](src/data/siteConfig.js:1)

```javascript
export const siteConfig = {
  // Change these values
  name: 'Your Company Name',           // Replace "J&H Digital"
  tagline: 'Your Company Tagline',     // Replace "Crafting Digital Excellence"
  description: 'Your company description for SEO',
  url: 'https://yourcompany.com',
  
  // ... rest of config
};
```

**Where it appears:**
- Browser tab title
- Header logo text
- Footer
- SEO meta tags
- Social media shares

### 2. Logo and Favicon

#### Replace Logo

**Option A: Text Logo (Current)**
The site currently uses text-based logo. To keep using text, just update the company name in [`siteConfig.js`](src/data/siteConfig.js:1).

**Option B: Image Logo**

1. **Add your logo file:**
   ```bash
   # Place logo in public folder
   public/logo.svg        # SVG format (recommended)
   # or
   public/logo.png        # PNG format (with transparency)
   ```

2. **Update Header component:**
   
   **File:** [`src/components/layout/Header.jsx`](src/components/layout/Header.jsx:1)
   
   ```javascript
   // Find the logo section (around line 50)
   // Replace text logo with image:
   
   <a href="#hero" className="flex items-center gap-2">
     <img 
       src="/logo.svg" 
       alt={siteConfig.name}
       className="h-8 w-auto"  // Adjust height as needed
     />
   </a>
   ```

#### Replace Favicon

1. **Generate favicon files:**
   - Use [Favicon Generator](https://realfavicongenerator.net/)
   - Upload your logo
   - Download the generated files

2. **Replace files in `public/` folder:**
   ```
   public/
   ├── favicon.ico
   ├── favicon-16x16.png
   ├── favicon-32x32.png
   ├── apple-touch-icon.png
   └── android-chrome-192x192.png
   ```

3. **Update [`index.html`](index.html:1):**
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
   ```

### 3. Color Scheme

**File:** [`tailwind.config.js`](tailwind.config.js:1)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary color (main brand color)
        primary: {
          50: '#eff6ff',   // Lightest
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Base color - CHANGE THIS
          600: '#2563eb',  // Darker
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',  // Darkest
        },
        // Accent color (secondary brand color)
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Base accent - CHANGE THIS
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
    },
  },
};
```

**Quick color change:**
1. Choose your brand colors
2. Use [Tailwind Color Generator](https://uicolors.app/create) to generate shades
3. Replace the color values above
4. Restart dev server: `npm run dev`

**Where colors are used:**
- `primary`: Buttons, links, highlights
- `accent`: Secondary elements, hover states
- `neutral`: Text, backgrounds, borders

### 4. Typography

**File:** [`tailwind.config.js`](tailwind.config.js:1)

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Change font family
        sans: ['Your Font', 'sans-serif'],  // Replace 'Inter'
        // Add custom fonts:
        heading: ['Your Heading Font', 'serif'],
      },
    },
  },
};
```

**To use Google Fonts:**

1. **Add to [`index.html`](index.html:1):**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```

2. **Update Tailwind config:**
   ```javascript
   fontFamily: {
     sans: ['Poppins', 'sans-serif'],
   }
   ```

### 5. Contact Information

**File:** [`src/data/siteConfig.js`](src/data/siteConfig.js:1)

```javascript
export const siteConfig = {
  // Update contact details
  email: 'your-email@company.com',
  phone: '+1 (555) 123-4567',
  
  // Update social media links
  social: {
    twitter: 'https://twitter.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany',
    github: 'https://github.com/yourcompany',
    instagram: 'https://instagram.com/yourcompany',
  },
};
```

**Also update in:**
- [`src/components/sections/Contact.jsx`](src/components/sections/Contact.jsx:21) - Contact info cards
- [`.env`](.env.example:1) - Environment variables

---

## Content Management

### 1. Hero Section

**File:** [`src/components/sections/Hero.jsx`](src/components/sections/Hero.jsx:1)

```javascript
// Update headline (around line 30)
<h1 className="text-5xl md:text-7xl font-bold mb-6">
  Your Compelling Headline
</h1>

// Update subheadline (around line 35)
<p className="text-xl md:text-2xl text-gray-600 mb-8">
  Your value proposition or tagline
</p>

// Update CTA buttons (around line 40)
<Button size="lg" onClick={() => scrollTo('contact')}>
  Your CTA Text
</Button>
```

### 2. About Section

**File:** [`src/components/sections/About.jsx`](src/components/sections/About.jsx:1)

```javascript
// Update company story (around line 25)
<h2 className="text-4xl md:text-5xl font-bold mb-6">
  Your About Headline
</h2>

<p className="text-lg text-gray-600 mb-6">
  Your company story and mission. Tell visitors who you are,
  what you do, and why you're different.
</p>

// Update statistics (around line 50)
const stats = [
  { number: '100+', label: 'Your Metric' },
  { number: '50+', label: 'Your Achievement' },
  { number: '99%', label: 'Your Success Rate' },
];
```

### 3. Services

**File:** Create/Edit service data

```javascript
// src/data/services.js (create this file)
import { Code, Smartphone, Palette, Zap } from 'lucide-react';

export const services = [
  {
    id: 'service-1',
    icon: Code,
    title: 'Your Service Name',
    description: 'Detailed description of what this service includes and the value it provides to clients.',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ]
  },
  {
    id: 'service-2',
    icon: Smartphone,
    title: 'Another Service',
    description: 'Description of your second service offering.',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ]
  },
  // Add more services...
];
```

**Then import in Services component:**

**File:** [`src/components/sections/Services.jsx`](src/components/sections/Services.jsx:1)

```javascript
import { services } from '../../data/services';

// Use in component
{services.map((service) => (
  <ServiceCard key={service.id} service={service} />
))}
```

### 4. Portfolio Projects

**File:** [`src/data/projects.js`](src/data/projects.js:1)

```javascript
export const projects = [
  {
    id: 'project-1',
    title: 'Your Project Name',
    description: 'Brief description of the project, client, and outcomes achieved.',
    image: '/images/portfolio/project-1.jpg',  // Add your image
    tags: ['React', 'Node.js', 'MongoDB'],     // Technologies used
    category: 'Web Development',                // For filtering
    link: 'https://project-url.com',           // Live project URL
    featured: true,                             // Show on homepage
    details: {
      client: 'Client Name',
      duration: '3 months',
      role: 'Full Stack Development',
      challenge: 'What problem did you solve?',
      solution: 'How did you solve it?',
      results: [
        '50% increase in conversions',
        '2x faster load times',
        '99.9% uptime',
      ]
    }
  },
  // Add more projects...
];
```

**Image requirements:**
- Format: JPG or WebP
- Dimensions: 800x600px (4:3 ratio)
- File size: < 200KB
- Location: `public/images/portfolio/`

### 5. Testimonials

**File:** [`src/data/testimonials.js`](src/data/testimonials.js:1)

```javascript
export const testimonials = [
  {
    id: 'testimonial-1',
    quote: 'The actual testimonial text from your client. Keep it authentic and specific about results achieved.',
    author: 'Client Name',
    role: 'CEO',
    company: 'Company Name',
    avatar: '/images/testimonials/client-1.jpg',  // Optional
    rating: 5,  // Optional: 1-5 stars
  },
  // Add more testimonials...
];
```

**Best practices:**
- Use real client testimonials
- Include specific results/metrics
- Get permission to use names
- Add client photos if possible
- Keep quotes concise (2-3 sentences)

### 6. Contact Form

**File:** [`src/components/sections/Contact.jsx`](src/components/sections/Contact.jsx:1)

#### Update Form Fields

```javascript
// Customize project types (around line 42)
const projectTypes = [
  'Your Service Type 1',
  'Your Service Type 2',
  'Your Service Type 3',
  'Other'
];

// Update contact info cards (around line 21)
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'your-email@company.com',
    href: 'mailto:your-email@company.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Your City, State',
    href: null
  }
];
```

#### Configure Form Submission

**Option 1: Formspree**

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a form and get your endpoint
3. Update [`.env`](.env.example:1):
   ```bash
   VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```

4. Update form submission (around line 96):
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!validateForm()) return;
     
     setIsSubmitting(true);
     
     try {
       const response = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });
       
       if (response.ok) {
         setSubmitSuccess(true);
         setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
       }
     } catch (error) {
       console.error('Form submission error:', error);
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

**Option 2: Netlify Forms**

If deploying to Netlify, add to form element:
```javascript
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Rest of form */}
</form>
```

---

## Design Customization

### 1. Spacing and Layout

**File:** [`tailwind.config.js`](tailwind.config.js:1)

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Add custom spacing values
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        // Adjust container widths
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
};
```

### 2. Border Radius

```javascript
borderRadius: {
  'none': '0',
  'sm': '0.25rem',
  'md': '0.5rem',
  'lg': '1rem',      // Adjust for your brand
  'xl': '1.5rem',
  '2xl': '2rem',
  'full': '9999px',
}
```

### 3. Shadows

```javascript
boxShadow: {
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  // Add custom shadows
  'brand': '0 10px 40px rgba(59, 130, 246, 0.3)',
}
```

### 4. Animations

**File:** [`tailwind.config.js`](tailwind.config.js:1)

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-out',
  'slide-up': 'slideUp 0.5s ease-out',
  'bounce-slow': 'bounce 3s infinite',
  // Add custom animations
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
},
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}
```

---

## Adding Real Images

### Image Optimization Guidelines

#### Recommended Formats

1. **WebP** - Best compression, modern browsers
2. **JPEG** - Good for photos, universal support
3. **PNG** - Transparency needed
4. **SVG** - Icons, logos, illustrations

#### Recommended Dimensions

```
Hero Background:     1920x1080px (Full HD)
Portfolio Thumbnails: 800x600px (4:3 ratio)
Team Photos:         400x400px (square)
Testimonial Avatars: 200x200px (square)
Service Icons:       SVG (scalable)
```

#### Compression Guidelines

- **Quality**: 80-85% for JPEG
- **File Size**: 
  - Hero images: < 500KB
  - Portfolio: < 200KB
  - Avatars: < 50KB

### Converting to WebP

```bash
# Install imagemagick or use online tools
# Command line conversion:
convert input.jpg -quality 85 output.webp

# Or use online tools:
# - Squoosh.app
# - TinyPNG.com
# - CloudConvert.com
```

### Image Locations

```
public/
├── images/
│   ├── hero/
│   │   └── background.webp
│   ├── portfolio/
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── project-3.jpg
│   ├── testimonials/
│   │   ├── client-1.jpg
│   │   └── client-2.jpg
│   └── team/
│       ├── member-1.jpg
│       └── member-2.jpg
```

### Replacing Gradient Placeholders

Current portfolio cards use gradient backgrounds. To replace with real images:

**File:** [`src/components/ui/ProjectCard.jsx`](src/components/ui/ProjectCard.jsx:1)

```javascript
// Find the image section (around line 20)
// Replace gradient div with actual image:

<div className="relative h-64 overflow-hidden">
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
</div>
```

### Lazy Loading Images

Use the LazyImage component for better performance:

**File:** [`src/components/common/LazyImage.jsx`](src/components/common/LazyImage.jsx:1)

```javascript
import LazyImage from '../common/LazyImage';

<LazyImage
  src="/images/portfolio/project-1.jpg"
  alt="Project description"
  className="w-full h-64 object-cover"
/>
```

---

## Extending Functionality

### 1. Adding Analytics

#### Google Analytics 4

1. **Get tracking ID** from [Google Analytics](https://analytics.google.com)

2. **Add to [`.env`](.env.example:1):**
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Create analytics utility:**
   
   **File:** `src/utils/analytics.js` (create new file)
   
   ```javascript
   export const initGA = () => {
     const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
     if (!measurementId) return;
     
     const script = document.createElement('script');
     script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
     script.async = true;
     document.head.appendChild(script);
     
     window.dataLayer = window.dataLayer || [];
     function gtag() { dataLayer.push(arguments); }
     gtag('js', new Date());
     gtag('config', measurementId);
   };
   
   export const trackEvent = (eventName, eventParams) => {
     if (window.gtag) {
       window.gtag('event', eventName, eventParams);
     }
   };
   ```

4. **Initialize in [`src/main.jsx`](src/main.jsx:1):**
   ```javascript
   import { initGA } from './utils/analytics';
   
   initGA();
   ```

### 2. Adding a Blog

#### Option A: Integrate with CMS

**Contentful Integration:**

```bash
npm install contentful
```

```javascript
// src/utils/contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getBlogPosts = async () => {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  });
  return entries.items;
};
```

#### Option B: Static Blog Posts

```javascript
// src/data/blog.js
export const blogPosts = [
  {
    id: 'post-1',
    title: 'Blog Post Title',
    slug: 'blog-post-title',
    excerpt: 'Brief summary of the post...',
    content: 'Full post content in markdown...',
    author: 'Author Name',
    date: '2024-01-24',
    image: '/images/blog/post-1.jpg',
    tags: ['Web Development', 'React'],
  },
];
```

### 3. Adding Dark Mode

1. **Install dependencies:**
   ```bash
   npm install next-themes
   ```

2. **Create theme provider:**
   
   **File:** `src/components/ThemeProvider.jsx`
   
   ```javascript
   import { ThemeProvider as NextThemesProvider } from 'next-themes';
   
   export function ThemeProvider({ children }) {
     return (
       <NextThemesProvider attribute="class" defaultTheme="light">
         {children}
       </NextThemesProvider>
     );
   }
   ```

3. **Add theme toggle button:**
   ```javascript
   import { useTheme } from 'next-themes';
   import { Moon, Sun } from 'lucide-react';
   
   function ThemeToggle() {
     const { theme, setTheme } = useTheme();
     
     return (
       <button
         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
         className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
       >
         {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
       </button>
     );
   }
   ```

4. **Add dark mode styles to Tailwind:**
   ```javascript
   // tailwind.config.js
   module.exports = {
     darkMode: 'class',
     // ... rest of config
   };
   ```

### 4. Adding Multi-language Support

```bash
npm install react-i18next i18next
```

```javascript
// src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'hero.title': 'Welcome to Our Site',
          'hero.subtitle': 'We build amazing things',
        }
      },
      es: {
        translation: {
          'hero.title': 'Bienvenido a Nuestro Sitio',
          'hero.subtitle': 'Construimos cosas increíbles',
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
```

---

## Advanced Customization

### 1. Custom Components

Create reusable components in `src/components/`:

```javascript
// src/components/ui/Modal.jsx
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
```

### 2. Custom Hooks

Create reusable logic in `src/hooks/`:

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
```

### 3. API Integration

```javascript
// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}

export async function postData(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}
```

---

## Best Practices

### Content Guidelines

1. **Keep it concise** - Users scan, they don't read
2. **Use active voice** - "We build" not "Websites are built"
3. **Focus on benefits** - What's in it for the user?
4. **Include CTAs** - Guide users to take action
5. **Update regularly** - Keep content fresh and relevant

### Image Guidelines

1. **Optimize before upload** - Use compression tools
2. **Use descriptive alt text** - For accessibility and SEO
3. **Consistent aspect ratios** - Maintains visual harmony
4. **WebP format** - Better compression than JPEG
5. **Lazy load** - Improves initial page load

### Performance Guidelines

1. **Monitor bundle size** - Run `npm run build` regularly
2. **Lazy load components** - Use React.lazy() for heavy components
3. **Optimize images** - Compress and use appropriate formats
4. **Minimize dependencies** - Only install what you need
5. **Use production build** - Always test with `npm run build`

### SEO Guidelines

1. **Update meta tags** - In [`src/components/common/SEO.jsx`](src/components/common/SEO.jsx:1)
2. **Use semantic HTML** - Proper heading hierarchy
3. **Add alt text** - All images need descriptions
4. **Update sitemap** - When adding new pages
5. **Mobile-first** - Ensure mobile experience is excellent

### Accessibility Guidelines

1. **Keyboard navigation** - All interactive elements accessible
2. **Color contrast** - WCAG AA minimum (4.5:1)
3. **ARIA labels** - For screen readers
4. **Focus indicators** - Visible focus states
5. **Semantic HTML** - Use proper elements

---

## Troubleshooting

### Changes Not Appearing

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Styles Not Updating

```bash
# Rebuild Tailwind
npm run build
```

### Images Not Loading

- Check file path is correct
- Verify image is in `public/` folder
- Check file extension matches
- Clear browser cache

---

## Additional Resources

### Design Tools
- [Figma](https://figma.com) - Design mockups
- [Coolors](https://coolors.co) - Color palette generator
- [Google Fonts](https://fonts.google.com) - Free fonts

### Image Tools
- [Squoosh](https://squoosh.app) - Image compression
- [Remove.bg](https://remove.bg) - Background removal
- [Unsplash](https://unsplash.com) - Free stock photos

### Icon Libraries
- [Lucide Icons](https://lucide.dev) - Current icon set
- [Heroicons](https://heroicons.com) - Alternative icons
- [Font Awesome](https://fontawesome.com) - Popular icon library

### Learning Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

## Support

Need help with customization?

- **Documentation**: See [`README.md`](README.md:1)
- **Email**: dev@jhdigital.com
- **Issues**: GitHub Issues

---

**Last Updated:** 2024-01-24  
**Version:** 1.0.0  
**Maintained by:** J&H Digital Development Team