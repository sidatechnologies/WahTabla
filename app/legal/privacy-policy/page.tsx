import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Globe, Building2 } from 'lucide-react';
import Link from 'next/link';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
          <span className="text-sm">
            Effective Date: 26th August 2025
          </span>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            <p>
              At <Link href='https://wahtabla.com'><span className="font-semibold text-blue-600">wahtabla.com</span></Link> (&quot;we,&quot; &quot;our,&quot; or &quot;the Site&quot;), 
              we value and respect your privacy. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your personal information when you visit our website or purchase our online music learning courses.
            </p>
            <p className="mt-4">
              This policy is drafted in accordance with the <span className="font-medium">Information Technology Act, 2000</span> and 
              the <span className="font-medium">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</span> applicable in India.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Section 1 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">We may collect the following types of information when you use our website:</p>
              <ul className="space-y-3">
                <li><span className="font-semibold">Personal Information:</span> Name, email address, phone number, and billing address (if provided).</li>
                <li><span className="font-semibold">Payment Information:</span> Payment details required for online transactions. We do not store card numbers directly; payments are processed through secure third-party gateways.</li>
                <li><span className="font-semibold">Usage & Log Data:</span> IP address, browser type, device details, and pages visited.</li>
                <li><span className="font-semibold">Cookies & Tracking Technologies:</span> To improve user experience and site functionality.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">We use the information collected to:</p>
              <ul className="space-y-2">
                <li>• Provide access to purchased courses.</li>
                <li>• Process secure payments.</li>
                <li>• Deliver customer support.</li>
                <li>• Enhance services and user experience.</li>
                <li>• Ensure security and prevent fraud.</li>
                <li>• Send essential notifications and updates (with consent where required).</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">3. Legal Compliance</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-3">We process personal data in compliance with Indian laws, including the IT Act 2000 and IT Rules 2011.</p>
              <p>We may disclose your information if required by law, regulation, or government request.</p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">4. Sharing of Information</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">We do not sell or rent personal data. We may share information with:</p>
              <ul className="space-y-2">
                <li><span className="font-semibold">Payment Processors:</span> Razorpay, PayPal, Stripe, UPI, etc.</li>
                <li><span className="font-semibold">Service Providers:</span> Hosting, email, analytics, and support partners.</li>
                <li><span className="font-semibold">Legal Authorities:</span> Where required by law.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                We use SSL encryption, secure servers, and firewalls to protect your data. However, no method of transmission 
                over the internet is 100% secure. wahtabla.com cannot be held liable for unauthorized access or breaches beyond our control.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, 
                comply with legal obligations, and enforce agreements.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">7. Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-3">
                Our courses are primarily designed for learners above the age of 13. Younger students may also access 
                our services under the supervision of a parent or legal guardian.
              </p>
              <p>
                We do not knowingly collect personal information directly from children under 13 without parental consent. 
                If a parent or guardian believes such data has been shared without supervision, they should contact us, and we will remove it.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">8. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">You have the right to:</p>
              <ul className="space-y-2">
                <li>• Access personal information we hold.</li>
                <li>• Request corrections to inaccurate or incomplete data.</li>
                <li>• Request deletion of personal data, subject to legal and contractual obligations.</li>
                <li>• Contact us to exercise these rights.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">9. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                We use cookies to improve functionality, analyze traffic, and support personalization. You can disable 
                cookies in your browser, but some features may not function properly.
              </p>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">10. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                While we adopt reasonable safeguards, wahtabla.com is not liable for indirect or consequential damages 
                from unauthorized access or breaches.
              </p>
            </CardContent>
          </Card>

          {/* Section 11 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">11. Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                We may update this policy at any time. Changes will be effective immediately upon posting, 
                with the updated date reflected above.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">12. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-900 mb-4">
                If you have questions regarding this Privacy Policy, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-900">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Email:</span>
                  <span>onlineclasses@dhwaniacademy.org</span>
                </div>
                <div className="flex items-center gap-3 text-slate-900">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Website:</span>
                  <Link href='https://wahtabla.com'>
                    <span className='underline text-blue-700'>https://www.wahtabla.com</span>
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-slate-900">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Office Address:</span>
                  <span>Kolkata, India</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;