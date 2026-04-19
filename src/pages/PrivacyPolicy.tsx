import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Shield, ArrowLeft } from 'lucide-react';
import { AbstractShapes } from '../components/AbstractShapes';
import { Navigation } from '../components/Navigation';

export function PrivacyPolicy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <section className="py-32 relative overflow-hidden">{/* Added top padding for navbar */}
        <AbstractShapes />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-[#C39223] rounded-full flex items-center justify-center">
                  <Shield size={40} className="text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-400">Last updated: November 21, 2025</p>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Introduction */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  At Ehyeh Youth Foundation (E.Y.F), we are committed to protecting your privacy and safeguarding your personal 
                  information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you 
                  visit our website, participate in our programs, or interact with our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">2. Information We Collect</h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <div>
                    <p className="mb-2"><strong className="text-white">2.1 Personal Information:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Name, date of birth, and gender</li>
                      <li>Contact information (email, phone number, address)</li>
                      <li>Educational background and institution</li>
                      <li>Parent/guardian information for minors</li>
                      <li>Emergency contact details</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">2.2 Program Information:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Program preferences and interests</li>
                      <li>Attendance records and participation details</li>
                      <li>Feedback and testimonials</li>
                      <li>Skills assessments and progress reports</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">2.3 Technical Information:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Website usage data and cookies</li>
                      <li>Pages visited and time spent on site</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">3. How We Use Your Information</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p><strong className="text-white">3.1 Program Administration:</strong> To register participants, coordinate program activities, and communicate schedules and updates.</p>
                  <p><strong className="text-white">3.2 Communication:</strong> To send program information, newsletters, event invitations, and organizational updates.</p>
                  <p><strong className="text-white">3.3 Improvement:</strong> To analyze program effectiveness, gather feedback, and improve our services.</p>
                  <p><strong className="text-white">3.4 Safety:</strong> To ensure the safety and well-being of all participants during programs and events.</p>
                  <p><strong className="text-white">3.5 Marketing:</strong> To promote our programs and share success stories (with consent).</p>
                  <p><strong className="text-white">3.6 Compliance:</strong> To comply with legal obligations and protect our rights.</p>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">4. Information Sharing and Disclosure</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p className="mb-3">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
                  <p><strong className="text-white">4.1 With Consent:</strong> When you provide explicit consent to share your information.</p>
                  <p><strong className="text-white">4.2 Service Providers:</strong> With trusted third-party service providers who assist us in operating our programs (e.g., email services, event management platforms).</p>
                  <p><strong className="text-white">4.3 Partners:</strong> With program partners, mentors, and educational institutions involved in delivering our services.</p>
                  <p><strong className="text-white">4.4 Legal Requirements:</strong> When required by law, court order, or to protect the rights and safety of E.Y.F, participants, or others.</p>
                  <p><strong className="text-white">4.5 Parents/Guardians:</strong> We may share participant information with parents or legal guardians of minors.</p>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">5. Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information from 
                  unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet 
                  or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>

              {/* Data Retention */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">6. Data Retention</h2>
                <p className="text-gray-300 leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                  unless a longer retention period is required by law. Program records and participant information are typically retained 
                  for 5 years for reporting and impact assessment purposes.
                </p>
              </div>

              {/* Your Rights */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">7. Your Rights</h2>
                <div className="text-gray-300 leading-relaxed space-y-2">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                    <li><strong className="text-white">Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong className="text-white">Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                    <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong className="text-white">Object:</strong> Object to certain processing of your information</li>
                    <li><strong className="text-white">Portability:</strong> Request transfer of your information to another organization</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, please contact us at eyf.legacies@gmail.com</p>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">8. Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Many of our programs serve minors. We obtain parental or guardian consent before collecting personal information 
                  from participants under 18 years of age. Parents have the right to review, modify, or delete their child's information 
                  at any time.
                </p>
              </div>

              {/* Cookies */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website uses cookies and similar tracking technologies to enhance user experience, analyze site traffic, and 
                  understand user preferences. You can control cookies through your browser settings, but disabling cookies may affect 
                  website functionality.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">10. Third-Party Links</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content 
                  of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">12. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">Email:</strong> eyf.legacies@gmail.com</p>
                  <p><strong className="text-white">Phone:</strong> +256 755 992 026 / +256 788 268 464</p>
                  <p><strong className="text-white">Address:</strong> Lourdel Towers, P.O. Box 127928, Kampala, Uganda</p>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center pt-8">
                <a 
                  href="#/"
                  className="inline-flex items-center gap-2 bg-[#C39223] text-white px-8 py-4 rounded-full hover:bg-[#b08520] transition-all"
                >
                  <ArrowLeft size={20} />
                  Back to Home
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}