import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AbstractShapes } from '../components/AbstractShapes';
import { Navigation } from '../components/Navigation';
import logo from 'figma:asset/822bd6c21182d886839e7597a3f559ec4794f932.png';

export function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Ehyeh Youth Foundation?',
          answer: 'Ehyeh Youth Foundation (E.Y.F) is a nonprofit organization dedicated to empowering young people in Uganda through mentorship, education, and skills development. We focus on holistic youth development, preparing them to become responsible leaders and productive members of society.'
        },
        {
          question: 'Who can participate in your programs?',
          answer: 'Our programs are primarily designed for youth between 10-25 years old. The Legacy Mentorship Program serves ages 10-18, the E1T1 Education Fund supports secondary and tertiary students, and the F.R.E.E.D Skills Hub welcomes youth ages 16-25. Each program has specific eligibility criteria.'
        },
        {
          question: 'Where are you located?',
          answer: 'Our main office is located at Lourdel Towers, Kampala, Uganda (P.O. Box 127928). However, we conduct programs at various schools, community centers, and partner locations throughout Kampala and surrounding areas.'
        }
      ]
    },
    {
      category: 'Legacy Mentorship Program (LMP)',
      questions: [
        {
          question: 'What is the Legacy Mentorship Program?',
          answer: 'The Legacy Mentorship Program is our flagship initiative that provides comprehensive mentorship to young people aged 10-18. The program covers critical topics including self-awareness, decision-making, character development, relationships, career guidance, and life skills through interactive sessions with experienced mentors.'
        },
        {
          question: 'How long does the Legacy Mentorship Program last?',
          answer: 'The standard LMP runs during school holidays and consists of 8-10 modules delivered over 2-3 weeks. We also offer specialized editions like Legacy Agents and Legacy @ Work which have tailored durations based on specific objectives.'
        },
        {
          question: 'How do I register for the LMP?',
          answer: 'You can register through our website by filling out the registration form, or contact us directly via email (eyf.legacies@gmail.com) or phone (+256 755 992 026). For participants under 18, parental consent is required.'
        },
        {
          question: 'Is there a cost to participate?',
          answer: 'We strive to keep our programs affordable and accessible. Some programs are offered free of charge through partnerships and donations, while others may have minimal registration fees to cover materials. Financial assistance is available for deserving participants who cannot afford the fees.'
        }
      ]
    },
    {
      category: 'E1T1 Education Fund',
      questions: [
        {
          question: 'What is the E1T1 Education Fund?',
          answer: 'E1T1 (Everyone Teaching One) is our scholarship initiative that provides financial assistance to bright but financially disadvantaged students. The fund covers school fees, books, uniforms, and other educational necessities, ensuring that economic challenges don\'t prevent talented youth from achieving their academic dreams.'
        },
        {
          question: 'How can I apply for the E1T1 Education Fund?',
          answer: 'Applications are typically accepted at the beginning of each academic term. Applicants must submit academic transcripts, proof of financial need, recommendation letters, and a personal essay. Contact us at eyf.legacies@gmail.com for application forms and deadlines.'
        },
        {
          question: 'What are the eligibility criteria?',
          answer: 'Applicants must demonstrate academic excellence, financial need, and commitment to education. Priority is given to students from disadvantaged backgrounds, orphans, and those facing significant economic hardships. Applicants must also show leadership potential and community involvement.'
        }
      ]
    },
    {
      category: 'F.R.E.E.D Skills Hub',
      questions: [
        {
          question: 'What is the F.R.E.E.D Skills Hub?',
          answer: 'F.R.E.E.D (Financial literacy, Real-world skills, Entrepreneurship, Empowerment, Development) Skills Hub is our vocational and entrepreneurship training center. It equips youth aged 16-25 with practical skills in areas like digital marketing, graphic design, business management, financial literacy, and more.'
        },
        {
          question: 'What skills are taught at the F.R.E.E.D Hub?',
          answer: 'We offer training in digital skills (web design, social media marketing, content creation), business skills (entrepreneurship, financial management, business planning), creative skills (graphic design, photography, video editing), and soft skills (communication, leadership, teamwork).'
        },
        {
          question: 'Do I receive a certificate after completing training?',
          answer: 'Yes! Participants who successfully complete F.R.E.E.D Skills Hub training programs receive certificates of completion. These certificates can enhance your CV and demonstrate your skills to potential employers or investors.'
        }
      ]
    },
    {
      category: 'Getting Involved',
      questions: [
        {
          question: 'How can I volunteer with E.Y.F?',
          answer: 'We welcome volunteers! You can sign up through our registration form on the website. We need mentors, skills trainers, event coordinators, administrative support, and more. All volunteers undergo orientation and training before working with our participants.'
        },
        {
          question: 'How can I donate or sponsor a program?',
          answer: 'You can support E.Y.F through monetary donations, sponsoring specific programs or participants, donating materials and supplies, or providing in-kind support. Contact us at eyf.legacies@gmail.com to discuss donation options. All donations are tax-deductible to the extent permitted by law.'
        },
        {
          question: 'Can my organization partner with E.Y.F?',
          answer: 'Absolutely! We partner with schools, churches, businesses, NGOs, and government agencies. Partnership opportunities include hosting programs, co-sponsoring events, providing venues, offering technical expertise, and more. Reach out to discuss how we can collaborate.'
        },
        {
          question: 'How can I stay updated on E.Y.F activities?',
          answer: 'Follow us on social media (Facebook, Instagram, Twitter, TikTok, LinkedIn), subscribe to our newsletter, or regularly visit our website for the latest news, events, and success stories. You can also contact us directly for specific information.'
        }
      ]
    },
    {
      category: 'Programs & Events',
      questions: [
        {
          question: 'When do programs typically run?',
          answer: 'The Legacy Mentorship Program runs during school holidays (April, August, December). F.R.E.E.D Skills Hub offers continuous training throughout the year with new cohorts every quarter. Community outreach events and special programs are scheduled throughout the year.'
        },
        {
          question: 'Can parents attend LMP sessions?',
          answer: 'We typically conduct parent orientation sessions at the beginning and end of the program. Some sessions may include parent-child activities. However, most sessions are designed for youth only to create a safe, open environment for learning and sharing.'
        },
        {
          question: 'What safety measures are in place?',
          answer: 'Participant safety is our top priority. All staff and volunteers undergo background checks and safeguarding training. We maintain appropriate child protection policies, secure facilities, adult supervision at all times, emergency response procedures, and confidential reporting mechanisms.'
        }
      ]
    },
    {
      category: 'Contact & Support',
      questions: [
        {
          question: 'How can I contact E.Y.F?',
          answer: 'Email: eyf.legacies@gmail.com | Phone: +256 755 992 026 or +256 788 268 464 | Address: Lourdel Towers, P.O. Box 127928, Kampala, Uganda. We typically respond to inquiries within 24-48 hours.'
        },
        {
          question: 'Do you offer virtual/online programs?',
          answer: 'Yes! In addition to in-person programs, we offer some virtual mentorship sessions, online skills training, and digital resources. This allows us to reach youth in remote areas and accommodate different schedules.'
        },
        {
          question: 'I have more questions. Who should I contact?',
          answer: 'For any additional questions not covered here, please email us at eyf.legacies@gmail.com or call +256 755 992 026. Our team is happy to provide more information about our programs, registration process, volunteer opportunities, or any other inquiries.'
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.category,
      globalIndex: categoryIndex * 100 + questionIndex
    }))
  );

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
                  <HelpCircle size={40} className="text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-gray-400 text-lg">Find answers to common questions about E.Y.F and our programs</p>
            </div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {allQuestions.map((item, index) => (
                <div
                  key={item.globalIndex}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-[#C39223]/20 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-[#C39223]/5 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-[#C39223] uppercase tracking-wider mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-lg text-white">{item.question}</h3>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`text-[#C39223] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Still Have Questions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-br from-[#C39223] to-[#b08520] rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl text-white mb-4">Still Have Questions?</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Can't find the answer you're looking for? Our team is here to help! Reach out and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-white text-[#C39223] px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
                >
                  Contact Us
                </a>
                <a
                  href="#/"
                  className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-all"
                >
                  <ArrowLeft size={20} className="mr-2" />
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