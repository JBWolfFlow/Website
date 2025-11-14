import { Helmet } from 'react-helmet-async';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Terms of Service Component
 * Comprehensive terms and conditions for NeuroForge Technologies
 */
const TermsOfService = () => {
  const lastUpdated = 'January 27, 2025';

  return (
    <>
      <Helmet>
        <title>Terms of Service | NeuroForge Technologies</title>
        <meta name="description" content="Terms of Service for NeuroForge Technologies. Read our terms and conditions for using our services." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last Updated: {lastUpdated}</p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to NeuroForge Technologies. These Terms of Service ("Terms") govern your access to and use of our website, services, and products. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please read these Terms carefully before using our services. If you do not agree to these Terms, you may not access or use our services.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-primary-600" />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing or using NeuroForge Technologies' website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use our services.
            </p>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* Services Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
            <p className="text-gray-700 mb-4">
              NeuroForge Technologies provides software development services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Web application development</li>
              <li>Mobile application development</li>
              <li>Desktop application development</li>
              <li>AI and automation systems</li>
              <li>Custom software solutions</li>
              <li>Technical consulting and audits</li>
              <li>System integration and API development</li>
            </ul>
            <p className="text-gray-700 mt-4">
              The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate Service Agreement or Statement of Work.
            </p>
          </section>

          {/* User Obligations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
            <p className="text-gray-700 mb-4">
              When using our services, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any illegal or unauthorized purpose</li>
              <li>Not interfere with or disrupt our services or servers</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not transmit any viruses, malware, or harmful code</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Our Intellectual Property</h3>
            <p className="text-gray-700 mb-4">
              All content, features, and functionality on our website, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of NeuroForge Technologies or its licensors and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Client-Owned Work Product</h3>
            <p className="text-gray-700 mb-4">
              Upon full payment for services rendered, you will own the custom work product created specifically for you, as outlined in the Service Agreement. This typically includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Custom code written specifically for your project</li>
              <li>Custom designs and graphics created for your project</li>
              <li>Project-specific documentation</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Retained Rights</h3>
            <p className="text-gray-700 mb-4">
              We retain ownership of:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Pre-existing code, libraries, and frameworks</li>
              <li>Reusable components and templates</li>
              <li>Development tools and methodologies</li>
              <li>General knowledge and experience gained</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              Payment terms will be specified in the Service Agreement. Generally:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>A deposit may be required before work begins</li>
              <li>Milestone payments may be required for larger projects</li>
              <li>Final payment is due upon project completion</li>
              <li>Late payments may incur interest charges</li>
              <li>We reserve the right to suspend services for non-payment</li>
            </ul>
            <p className="text-gray-700 mt-4">
              All fees are non-refundable unless otherwise specified in the Service Agreement.
            </p>
          </section>

          {/* Project Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Project Timeline and Delays</h2>
            <p className="text-gray-700 mb-4">
              We will make reasonable efforts to meet agreed-upon deadlines. However, timelines are estimates and may be affected by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Scope changes or additional requirements</li>
              <li>Delays in receiving necessary materials or feedback from you</li>
              <li>Technical challenges or unforeseen complications</li>
              <li>Force majeure events (see Section 12)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We will communicate any anticipated delays promptly and work with you to adjust timelines as needed.
            </p>
          </section>

          {/* Warranties and Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Warranties and Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Limited Warranty</h3>
            <p className="text-gray-700 mb-4">
              We warrant that services will be performed in a professional and workmanlike manner. We will correct any defects in our work at no additional charge for a period specified in the Service Agreement (typically 30-90 days after delivery).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Disclaimer</h3>
            <p className="text-gray-700 mb-4 uppercase font-semibold">
              EXCEPT AS EXPRESSLY PROVIDED IN THE SERVICE AGREEMENT, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-gray-700">
              We do not warrant that our services will be uninterrupted, error-free, or completely secure. We are not responsible for issues caused by third-party services, hosting providers, or factors outside our control.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4 uppercase font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEUROFORGE TECHNOLOGIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-gray-700">
              Our total liability for any claims arising out of or related to these Terms or our services shall not exceed the amount paid by you for the specific services giving rise to the claim, or $1,000, whichever is greater.
            </p>
          </section>

          {/* Confidentiality */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Confidentiality</h2>
            <p className="text-gray-700 mb-4">
              We respect the confidentiality of your business information. We will:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Keep your confidential information secure</li>
              <li>Not disclose your information to third parties without your consent</li>
              <li>Use your information only for providing services to you</li>
              <li>Sign a Non-Disclosure Agreement (NDA) upon request</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate the Service Agreement:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>For convenience with written notice (notice period specified in agreement)</li>
              <li>Immediately for material breach by the other party</li>
              <li>Immediately if the other party becomes insolvent or bankrupt</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Upon termination, you will pay for all work completed up to the termination date. We will deliver all completed work product and return any client materials.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify, defend, and hold harmless NeuroForge Technologies and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
              <li>Your use of our services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Content or materials you provide to us</li>
            </ul>
          </section>

          {/* Force Majeure */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Force Majeure</h2>
            <p className="text-gray-700">
              Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-700 mb-4">
              Any disputes arising out of or related to these Terms or our services shall be resolved through:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li>Good faith negotiations between the parties</li>
              <li>Mediation, if negotiations fail</li>
              <li>Binding arbitration in Temple, Texas, if mediation fails</li>
            </ol>
          </section>

          {/* Miscellaneous */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Miscellaneous</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Entire Agreement</h3>
            <p className="text-gray-700 mb-4">
              These Terms, together with any Service Agreement and our Privacy Policy, constitute the entire agreement between you and NeuroForge Technologies regarding our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Severability</h3>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Waiver</h3>
            <p className="text-gray-700 mb-4">
              No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Assignment</h3>
            <p className="text-gray-700 mb-4">
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-primary-600" />
              15. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>NeuroForge Technologies</strong></p>
              <p className="text-gray-700">Email: <a href="mailto:legal@neuroforgetechnologies.net" className="text-primary-600 hover:text-primary-700 underline">legal@neuroforgetechnologies.net</a></p>
              <p className="text-gray-700">General Inquiries: <a href="mailto:contact@neuroforgetechnologies.net" className="text-primary-600 hover:text-primary-700 underline">contact@neuroforgetechnologies.net</a></p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
              <p className="text-gray-700">Location: Temple, TX, United States</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Acknowledgment</h3>
            <p className="text-gray-700">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;