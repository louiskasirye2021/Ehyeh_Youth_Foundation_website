import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AbstractShapes } from './AbstractShapes';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { EMAILJS_CONFIG } from '../utils/emailConfig';
import { useSiteContent } from '../content/store';
import { safeHref } from './RichText';

/** Accepts either the embed link or the whole <iframe> code Google Maps gives you. */
function mapEmbedSrc(value: string) {
  const fromIframe = value.match(/src=["']([^"']+)["']/i);
  const src = (fromIframe ? fromIframe[1] : value).trim();
  return /^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/i.test(src) ? src : '';
}

export function ContactSection() {
  const { contact } = useSiteContent().content;
  const mapSrc = mapEmbedSrc(contact.mapEmbed || '');
  const mapHref = safeHref(contact.mapLink);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.error('EmailJS not configured. Please set up your EmailJS credentials in src/utils/emailConfig.ts');
      toast.error('Email service not configured. Please contact administrator.', {
        duration: 5000,
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: contact.email,
        from_name: formData.name,
        from_email: formData.email,
        subject: `Contact Form: ${formData.subject}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        submission_date: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      toast.success('Message sent successfully! We will get back to you soon.', {
        duration: 5000,
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Something went wrong. Please try again or contact us directly.', {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <AbstractShapes />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C39223] uppercase tracking-widest text-sm">{contact.label}</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">{contact.title}</h2>
              {contact.intro && (
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{contact.intro}</p>
              )}
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl text-black mb-6">{contact.connectTitle}</h3>
                {contact.connectText && (
                  <p className="text-gray-600 leading-relaxed">{contact.connectText}</p>
                )}
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C39223] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg text-black mb-1">Phone</h4>
                      {contact.phones.map((phone, i) => (
                        <p key={i} className="text-gray-600">
                          <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="hover:text-[#C39223]">{phone}</a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C39223] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg text-black mb-1">Email</h4>
                      <p className="text-gray-600">
                        <a href={`mailto:${contact.email}`} className="hover:text-[#C39223] break-all">{contact.email}</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <a
                  href={mapHref || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[#C39223] block group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C39223] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg text-black mb-1">Location</h4>
                      <p className="text-gray-600">{contact.addressLine}</p>
                      {contact.addressDetail && (
                        <p className="text-gray-600 text-sm mt-1">{contact.addressDetail}</p>
                      )}
                      {mapHref && (
                        <p className="text-[#C39223] text-sm mt-2 group-hover:underline">Click to view on Google Maps →</p>
                      )}
                    </div>
                  </div>
                </a>
              </div>

              {/* Map */}
              {mapSrc && (
              <div className="bg-gray-200 rounded-2xl h-64 md:h-80 overflow-hidden shadow-lg">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ehyeh Youth Foundation Location"
                  className="rounded-2xl"
                ></iframe>
              </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl text-black mb-6">Send us a Message</h3>
                
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors"
                      placeholder="+256 xxx xxx xxx"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="volunteer">I want to volunteer</option>
                      <option value="partner">Partnership inquiry</option>
                      <option value="donate">Donation information</option>
                      <option value="program">Program inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-700 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how you'd like to get involved..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C39223] text-white py-4 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
