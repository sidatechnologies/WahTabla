import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import Link from 'next/link';

const ContactUsPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">
            We&apos;d love to hear from you
          </p>
        </div>

        {/* Main Content */}
        <Card className="mb-8 bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed">
            <p className="text-slate-900 mb-6">
              Have questions about our online music learning courses? Need assistance with your enrollment? 
              Want to share feedback or suggestions? We&apos;re here to help!
            </p>
            <p className="text-slate-900 mb-8">
              For all inquiries, please reach out to us via email. Our team at{' '}
              <Link href='https://wahtabla.com'>
                <span className="font-semibold text-blue-600">wahtabla.com</span>
              </Link>{' '}
              will get back to you as soon as possible.
            </p>

            {/* Email Contact Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Us</h3>
              <a 
                href="mailto:wahhtabla@gmail.com" 
                className="text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                wahhtabla@gmail.com
              </a>
              <p className="text-sm text-slate-600 mt-4">
                We typically respond within 24-48 hours
              </p>
            </div>

            <p className="text-slate-700 mt-8 text-center">
              Thank you for choosing wahtabla.com for your musical journey!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUsPage;