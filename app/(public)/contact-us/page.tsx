'use client';

import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section – Tailwind version */}
      <div className="bg-gradient-to-r from-gray-900 to-red-700 text-white py-20">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl max-w-4xl mx-auto">
              Get in touch with our auto parts experts for quick assistance
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Responsive grid – Tailwind handles breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-colors focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-colors focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Phone + Subject row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-colors focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none bg-white transition-colors focus:border-blue-500"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="engine">Engine Inquiry</option>
                      <option value="transmission">Transmission Inquiry</option>
                      <option value="commercial">Commercial Inquiry</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-colors focus:border-blue-500"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Get in Touch
              </h2>
              
              <div className="flex flex-col gap-8">
                
                {/* Phone Card */}
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Call Us
                    </h3>
                    <a 
                      href="tel:+1-888-505-3697"
                      className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors no-underline"
                    >
                      +1-888-505-3697
                    </a>
                    <p className="text-gray-500 mt-2">
                      For immediate assistance
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Email Us
                    </h3>
                    <a 
                      href="mailto:sales@rockautocare.com"
                      className="text-lg text-gray-900 hover:text-blue-600 transition-colors no-underline"
                    >
                      sales@rockautocare.com
                    </a>
                    <p className="text-gray-500 mt-2">
                      Typically responds within 1 hour
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Visit Us
                    </h3>
                    <p className="text-lg text-gray-900">
                      123 Auto Parts Way<br />
                      Detroit, MI 48201
                    </p>
                    <p className="text-gray-500 mt-2">
                      By appointment only
                    </p>
                  </div>
                </div>

                {/* Emergency Support */}
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600">
                    Need Immediate Help?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Call our emergency support line for urgent parts needs
                  </p>
                  <a 
                    href="tel:+1-888-505-3697"
                    className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all no-underline"
                  >
                    Emergency Support Line
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}