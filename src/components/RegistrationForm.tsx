import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Mail, Phone, Calendar, MapPin, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AbstractShapes } from './AbstractShapes';
import { toast } from 'sonner@2.0.3';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../utils/emailConfig';

export function RegistrationForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    school: '',
    parentGuardianName: '',
    parentGuardianPhone: '',
    emergencyContact: '',
    howDidYouHear: '',
    areaOfInterest: [] as string[],
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
        to_email: 'eyf.legacies@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        subject: 'New Program Registration - Ehyeh Youth Foundation',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
        school: formData.school || 'Not provided',
        parent_guardian_name: formData.parentGuardianName || 'Not provided',
        parent_guardian_phone: formData.parentGuardianPhone || 'Not provided',
        emergency_contact: formData.emergencyContact || 'Not provided',
        programs_selected: formData.areaOfInterest.length > 0 ? formData.areaOfInterest.join(', ') : 'None selected',
        how_did_you_hear: formData.howDidYouHear || 'Not specified',
        message: formData.message || 'No additional information provided',
        submission_date: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      toast.success('Registration submitted successfully! We will contact you soon.', {
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        school: '',
        parentGuardianName: '',
        parentGuardianPhone: '',
        emergencyContact: '',
        howDidYouHear: '',
        areaOfInterest: [],
        message: ''
      });
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      areaOfInterest: prev.areaOfInterest.includes(interest)
        ? prev.areaOfInterest.filter(item => item !== interest)
        : [...prev.areaOfInterest, interest]
    }));
  };

  const interestOptions = [
    'Legacy Mentorship Program',
    'E1T1 Education Fund',
    'F.R.E.E.D Skills Hub'
  ];

  return (
    <section id="registration" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Ready to Transform?</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">Program Registration</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Take the first step towards empowerment. Register for our life-changing programs and initiatives designed to unlock your potential and build your legacy.
              </p>
            </motion.div>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <UserPlus size={16} className="text-[#C39223]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-[#C39223]" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-[#C39223]" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="+256 xxx xxx xxx"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-[#C39223]" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-[#C39223]" />
                    Address / Location *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="City, District, Uganda"
                  />
                </div>

                {/* School/Institution */}
                <div className="md:col-span-2">
                  <label htmlFor="school" className="block text-sm text-gray-700 mb-2">
                    School/Institution
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter your school/institution"
                  />
                </div>

                {/* Parent/Guardian Name */}
                <div className="md:col-span-2">
                  <label htmlFor="parentGuardianName" className="block text-sm text-gray-700 mb-2">
                    Parent/Guardian Name
                  </label>
                  <input
                    type="text"
                    id="parentGuardianName"
                    name="parentGuardianName"
                    value={formData.parentGuardianName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter parent/guardian name"
                  />
                </div>

                {/* Parent/Guardian Phone */}
                <div className="md:col-span-2">
                  <label htmlFor="parentGuardianPhone" className="block text-sm text-gray-700 mb-2">
                    Parent/Guardian Phone
                  </label>
                  <input
                    type="tel"
                    id="parentGuardianPhone"
                    name="parentGuardianPhone"
                    value={formData.parentGuardianPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter parent/guardian phone number"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="md:col-span-2">
                  <label htmlFor="emergencyContact" className="block text-sm text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter emergency contact number"
                  />
                </div>

                {/* How did you hear about us */}
                <div className="md:col-span-2">
                  <label htmlFor="howDidYouHear" className="block text-sm text-gray-700 mb-2">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    id="howDidYouHear"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all"
                    placeholder="Enter how you heard about us"
                  />
                </div>

                {/* Area of Interest */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-3">
                    Area of Interest * (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-[#C39223] hover:bg-[#C39223]/5 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.areaOfInterest.includes(interest)}
                          onChange={() => handleCheckboxChange(interest)}
                          className="w-5 h-5 text-[#C39223] rounded focus:ring-[#C39223] focus:ring-2"
                        />
                        <span className="text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none focus:ring-2 focus:ring-[#C39223]/20 transition-all resize-none"
                    placeholder="Tell us more about yourself and why you want to join E.Y.F..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                {isSubmitting ? (
                  <div className="w-full bg-gray-500 text-white py-4 rounded-full text-center">
                    Submitting...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#C39223] text-white py-4 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transform"
                  >
                    <span className="text-lg">Submit Registration</span>
                    <Send size={20} />
                  </button>
                )}
              </div>

              {/* Privacy Notice */}
              <p className="text-sm text-gray-500 text-center mt-6">
                By submitting this form, you agree to be contacted by Ehyeh Youth Foundation regarding membership and programs.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}