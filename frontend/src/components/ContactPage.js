import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  User, 
  Globe,
  ArrowRight
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Get in Touch
              </h2>
              <p className="text-gray-300 text-lg">
                Have questions about our platform? Want to collaborate? We'd love to hear from you.
                Drop us a message and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-gray-800/50">
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-400">arjunshukla6558@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-gray-800/50">
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-400">+91 88304 45632</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-gray-800/50">
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-gray-400">Pune , Maharashtra , India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-gray-800/50">
                <div className="w-12 h-12 bg-violet-500/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50">
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none pl-12"
                    placeholder="Your name"
                  />
                  <User className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none pl-12"
                    placeholder="your@email.com"
                  />
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
                  placeholder="Message subject"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl text-white font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;