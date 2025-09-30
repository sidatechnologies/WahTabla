import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Globe, Building2, Phone } from 'lucide-react';
import Link from 'next/link';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Refund & Class Policy</h1>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Welcome</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            <p>
              Thank you for choosing to learn Tabla with us. We are committed to providing high-quality 
              online lessons through our learning app. Please read our refund and class policy carefully 
              before enrolling.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          
          {/* Section 1 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">1. No Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                Once a class or course has been purchased, the payment is non-refundable under any circumstances. 
                We encourage students to review the course details carefully before making a purchase.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">2. Technical Issues / Glitches</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p className="mb-4">
                If you experience technical difficulties (such as glitches in the downloaded material or access issues), 
                you must provide proof (e.g., screenshots, screen recordings, or error reports).
              </p>
              <p>
                Upon verification, you will be offered the opportunity to attend live online classes as a replacement, 
                at no additional cost.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">3. Online Classes in Place of Refunds</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <ul className="space-y-2">
                <li>• Replacement classes will be scheduled strictly according to the WahTabla calendar.</li>
                <li>• Students may attend only for the duration of the package originally purchased.</li>
                <li>• Missed classes will not be rescheduled individually.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">4. Student Responsibility</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                Students are expected to ensure they have a stable internet connection and a compatible device 
                for accessing classes. The Academy is not responsible for connectivity issues or device malfunctions 
                on the student’s side.
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">5. Policy Agreement</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-900">
              <p>
                By purchasing and accessing our classes, you acknowledge and agree to abide by this refund and class policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-900 mb-4">
                If you have any questions about this Refund & Class Policy, please contact us:
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

export default RefundPolicyPage;
