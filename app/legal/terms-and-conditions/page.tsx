import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Globe, Building2, Phone } from 'lucide-react';
import Link from 'next/link';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms & Conditions</h1>
          <span className="text-sm">
            Effective Date: [Insert Date]
          </span>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Welcome to WahTabla!</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            <p>
              By accessing or using our website and enrolling in our online courses, you agree to the following Terms & Conditions. 
              Please read them carefully before making a purchase.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Section 1 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">1. Use of Our Website</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">Our website is intended for individuals who wish to learn tabla through our structured online courses.</p>
              <ul className="space-y-2">
                <li>• You agree to use the website only for lawful purposes and in a respectful manner.</li>
                <li>• Any misuse, including attempts to hack, copy content, or disrupt services, will lead to termination of access.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">2. Course Enrollment & Access</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <ul className="space-y-2">
                <li>• Once you purchase a course, you will receive access credentials (username/password). These are personal and non-transferable.</li>
                <li>• Course content is available according to the schedule/calendar shared at the time of enrollment.</li>
                <li>• Sharing, recording, or distributing our classes and materials without permission is strictly prohibited.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">3. Payments & Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <ul className="space-y-2">
                <li>• All payments must be made through the designated payment gateway on our website.</li>
                <li>• <span className="font-semibold">Refund Policy:</span> Fees are generally non-refundable. However, in case of technical glitches in downloaded content, you may request verification and, upon confirmation, we will provide alternative access (not a refund).</li>
                <li>• Any promotional offers or discounts are subject to specific terms mentioned at the time of the offer.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">4. Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">We respect your privacy. Personal information (such as name, email, phone number, and payment details) collected during registration will only be used for enrollment, communication, and course delivery.</p>
              <ul className="space-y-2">
                <li>• We do not sell or share your information with third parties, except as required by law or payment processors.</li>
                <li>• All data is stored securely and processed in compliance with applicable data protection laws.</li>
                <li>• For more details, please see our <Link href="/privacy-policy"><span className="underline text-blue-700">Privacy Policy</span></Link>.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                All course materials, videos, documents, and website content are the intellectual property of WahTabla and/or its instructors. 
                You may not copy, modify, reproduce, or distribute any material without prior written permission.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                WahTabla is committed to providing high-quality training but does not guarantee personal results 
                (such as exam success, professional opportunities, or performance outcomes). 
                We are not liable for any interruptions caused by internet failures, device issues, or force majeure events.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">7. Code of Conduct</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                Respectful communication is expected during live classes, forums, or community discussions. 
                Any abusive, disruptive, or inappropriate behavior may result in suspension of access without refund.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">8. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                We may update these Terms & Conditions from time to time. Any changes will be posted on this page, 
                and continued use of the website after updates means you accept the revised terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-900 mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-900">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Email:</span>
                  <span>[Insert Email Address]</span>
                </div>
                <div className="flex items-center gap-3 text-slate-900">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Phone:</span>
                  <span>[Insert Phone Number]</span>
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

export default TermsAndConditionsPage;
