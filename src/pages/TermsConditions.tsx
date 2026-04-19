import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { FileText, ArrowLeft } from 'lucide-react';
import { AbstractShapes } from '../components/AbstractShapes';
import { Navigation } from '../components/Navigation';
import logo from 'figma:asset/822bd6c21182d886839e7597a3f559ec4794f932.png';

export function TermsConditions() {
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
                  <FileText size={40} className="text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">Terms & Conditions</h1>
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
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to the Ehyeh Youth Foundation (E.Y.F). By accessing our website and participating in our programs, 
                  you agree to comply with and be bound by the following terms and conditions. Please review them carefully. 
                  If you do not agree with these terms, you should not use our services or participate in our programs.
                </p>
              </div>

              {/* Use of Services */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">2. Use of Services</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p><strong className="text-white">2.1 Eligibility:</strong> Our programs are primarily designed for youth between the ages of 10-25 years. Participants under 18 years must have parental or guardian consent.</p>
                  <p><strong className="text-white">2.2 Registration:</strong> You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account information.</p>
                  <p><strong className="text-white">2.3 Acceptable Use:</strong> You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our services.</p>
                </div>
              </div>

              {/* Program Participation */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">3. Program Participation</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p><strong className="text-white">3.1 Commitment:</strong> Participants are expected to attend all scheduled sessions and actively engage in program activities.</p>
                  <p><strong className="text-white">3.2 Code of Conduct:</strong> All participants must respect mentors, fellow participants, and program staff. Disruptive behavior may result in removal from the program.</p>
                  <p><strong className="text-white">3.3 Photography & Media:</strong> By participating in our programs, you consent to being photographed or recorded for promotional purposes unless you explicitly opt out in writing.</p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">4. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and software, is the property of 
                  Ehyeh Youth Foundation and is protected by copyright laws. You may not reproduce, distribute, or create 
                  derivative works from our content without express written permission.
                </p>
              </div>

              {/* Donations & Financial Contributions */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">5. Donations & Financial Contributions</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p><strong className="text-white">5.1 Tax Deductibility:</strong> E.Y.F is a registered nonprofit organization. Donations may be tax-deductible to the extent permitted by law.</p>
                  <p><strong className="text-white">5.2 Refund Policy:</strong> All donations are final and non-refundable unless otherwise agreed upon in writing.</p>
                  <p><strong className="text-white">5.3 Use of Funds:</strong> We reserve the right to allocate donations to areas of greatest need within our mission and programs.</p>
                </div>
              </div>

              {/* Liability & Disclaimer */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">6. Liability & Disclaimer</h2>
                <div className="text-gray-300 leading-relaxed space-y-3">
                  <p><strong className="text-white">6.1 No Warranty:</strong> Our services and programs are provided "as is" without any warranty of any kind.</p>
                  <p><strong className="text-white">6.2 Limitation of Liability:</strong> E.Y.F shall not be liable for any indirect, incidental, or consequential damages arising from participation in our programs or use of our services.</p>
                  <p><strong className="text-white">6.3 Medical Disclaimer:</strong> While we provide mentorship and guidance, we are not medical or mental health professionals. Participants requiring professional assistance will be referred to appropriate services.</p>
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">7. Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-[#C39223] hover:underline">Privacy Policy</a> to 
                  understand how we collect, use, and protect your personal information.
                </p>
              </div>

              {/* Modifications */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">8. Modifications to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  E.Y.F reserves the right to modify these terms and conditions at any time. Changes will be posted on this page 
                  with an updated revision date. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </div>

              {/* Governing Law */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">9. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of Uganda. Any disputes arising from 
                  these terms shall be subject to the exclusive jurisdiction of the courts of Uganda.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20">
                <h2 className="text-2xl text-[#C39223] mb-4">10. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms & Conditions, please contact us:
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