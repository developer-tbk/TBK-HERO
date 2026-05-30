import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Share2, Globe, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { contactInfo, addMessage } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save guest enquiry to dynamic context
    setTimeout(() => {
      addMessage(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-8 bg-surface-low border-b border-outline-variant/20 relative"
    >
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-label text-xs text-secondary font-bold uppercase tracking-[0.25em]">
            Connect With Us
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-white font-semibold">
            Get in Touch
          </h2>
          <p className="font-body text-base text-on-surface-variant font-light">
            Have questions about catering, reservations, or events? Send us a message and our team will get right back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: Contact details, hours & socials */}
          <div className="lg:col-span-5 space-y-10">

            <div className="space-y-6">
              <h3 className="font-headline text-2xl text-white font-medium">The Bagara Kitchen</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4 text-on-surface-variant group">
                  <div className="p-3 bg-surface border border-outline-variant/30 rounded-xl group-hover:border-secondary transition-colors duration-300 text-secondary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Location</h4>
                    <p className="text-sm font-light mt-1 leading-relaxed">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-on-surface-variant group">
                  <div className="p-3 bg-surface border border-outline-variant/30 rounded-xl group-hover:border-secondary transition-colors duration-300 text-secondary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Call Us</h4>
                    <p className="text-sm font-light mt-1">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-on-surface-variant group">
                  <div className="p-3 bg-surface border border-outline-variant/30 rounded-xl group-hover:border-secondary transition-colors duration-300 text-secondary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Email Inquiry</h4>
                    <p className="text-sm font-light mt-1">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating hours */}
            <div className="space-y-4 p-6 bg-surface border border-outline-variant/20 rounded-2xl">
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-secondary">
                <Clock size={16} /> Hours of Operation
              </h4>
              <div className="text-xs space-y-2 text-on-surface-variant font-light">
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Monday - Friday</span>
                  <span className="text-white font-medium">{contactInfo.hoursWeekday}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span>Saturday - Sunday</span>
                  <span className="text-white font-medium">{contactInfo.hoursWeekend}</span>
                </div>
              </div>
            </div>

            {/* Social connections */}
            <div className="space-y-4">
              <h4 className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Follow Our Culinary Journey</h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                    href: contactInfo.instagram || 'https://www.instagram.com/thebagarakitchen.bar'
                  },
                  { icon: <Globe size={18} />, href: contactInfo.website || 'https://bagarakitchen.com' },
                  { icon: <Share2 size={18} />, href: '#' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-on-secondary hover:bg-secondary hover:border-secondary transition-all duration-300 active:scale-90"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7 bg-surface border border-outline-variant/35 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <h3 className="font-headline text-2xl text-white font-medium mb-2">Send an Inquiry</h3>
            <p className="text-sm text-on-surface-variant font-light mb-6">Drop us a line and our guest relations executive will contact you shortly.</p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle size={28} />
                  </div>
                  <h4 className="font-headline text-xl text-white font-semibold">Message Dispatched Successfully!</h4>
                  <p className="text-sm text-on-surface-variant font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for writing to us. We have received your query and will respond shortly. Aadab and have a wonderful day!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter Your Name: "
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-outline-variant/60 rounded-xl py-3 px-4 text-sm text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border border-outline-variant/60 rounded-xl py-3 px-4 text-sm text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Message Description</label>
                    <textarea
                      name="message"
                      required
                      placeholder="Enter details of your catering query, dining plans, or event inquiry here..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-background border border-outline-variant/60 rounded-xl py-3 px-4 text-sm text-white placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:brightness-110 text-on-secondary py-4.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-secondary/15 cursor-pointer duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Dispatching Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
