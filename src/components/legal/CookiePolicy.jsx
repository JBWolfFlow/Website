import { Helmet } from 'react-helmet-async';
import { Cookie, Settings, Info } from 'lucide-react';

/**
 * Cookie Policy Component
 * Explains cookie usage on NeuroForge Technologies website
 */
const CookiePolicy = () => {
  const lastUpdated = 'January 27, 2025';

  return (
    <>
      <Helmet>
        <title>Cookie Policy | NeuroForge Technologies</title>
        <meta name="description" content="Cookie Policy for NeuroForge Technologies. Learn about how we use cookies and similar technologies." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Cookie className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              This Cookie Policy explains how NeuroForge Technologies ("we," "our," or "us") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2 text-primary-600" />
              What Are Cookies?
            </h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700">
              Cookies can be "persistent" (remaining on your device until deleted or expired) or "session" (deleted when you close your browser).
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Essential Cookies</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose:</strong> These cookies are necessary for the website to function properly.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Examples:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>Form submission handling</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  <strong>Can be disabled:</strong> No (required for website functionality)
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Analytics Cookies</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose:</strong> Help us understand how visitors interact with our website.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Information collected:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                  <li>Navigation patterns</li>
                  <li>Browser and device information</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  <strong>Can be disabled:</strong> Yes (through browser settings)
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Functional Cookies</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Purpose:</strong> Remember your preferences and settings.
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Examples:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Language preferences</li>
                  <li>Theme settings (dark/light mode)</li>
                  <li>Form auto-fill information</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  <strong>Can be disabled:</strong> Yes (may affect user experience)
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set cookies on our website:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Google Analytics:</strong> Website traffic analysis (if enabled)</li>
              <li><strong>Form Services:</strong> Contact form functionality (Formspree, EmailJS, etc.)</li>
              <li><strong>CDN Providers:</strong> Content delivery and performance optimization</li>
            </ul>
            <p className="text-gray-700 mt-4">
              These third parties have their own privacy policies and cookie policies. We recommend reviewing their policies for more information.
            </p>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-primary-600" />
              How to Manage Cookies
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Browser Settings</h3>
            <p className="text-gray-700 mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies after each browsing session</li>
              <li>Accept cookies from specific websites only</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Browser-Specific Instructions</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700">
                <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
              </p>
              <p className="text-gray-700">
                <strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
              </p>
              <p className="text-gray-700">
                <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
              </p>
              <p className="text-gray-700">
                <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Disabling cookies may affect the functionality of our website and your user experience.
              </p>
            </div>
          </section>

          {/* Do Not Track */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Do Not Track Signals</h2>
            <p className="text-gray-700">
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activities tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT signals, but we respect your privacy choices and provide options to control cookies through your browser settings.
            </p>
          </section>

          {/* Updates to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>NeuroForge Technologies</strong></p>
              <p className="text-gray-700">Email: <a href="mailto:privacy@neuroforgetechnologies.net" className="text-primary-600 hover:text-primary-700 underline">privacy@neuroforgetechnologies.net</a></p>
              <p className="text-gray-700">General Inquiries: <a href="mailto:contact@neuroforgetechnologies.net" className="text-primary-600 hover:text-primary-700 underline">contact@neuroforgetechnologies.net</a></p>
              <p className="text-gray-700">Phone: <a href="tel:+12068760437" className="text-primary-600 hover:text-primary-700 underline">(206) 876-0437</a></p>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="bg-blue-50 border-l-4 border-primary-600 p-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Resources</h3>
            <p className="text-gray-700 mb-2">
              For more information about cookies and online privacy:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">AllAboutCookies.org</a></li>
              <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Your Online Choices</a></li>
              <li><a href="https://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Network Advertising Initiative</a></li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;