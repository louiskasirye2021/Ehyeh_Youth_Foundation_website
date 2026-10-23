// Every piece of content the public website shows, in its original form.
//
// The admin panel edits a copy of this content and saves it to Supabase
// (table `site_content`, one row per key below). When a key has never been
// saved, or Supabase can't be reached, the website falls back to what's here.

import heroImage from 'figma:asset/20819b45a1e4911bf8c3e2175f46ea1338b52a61.png';
import lucyImage from 'figma:asset/25ce06d8368056839a9b2b8982c7dd47409a36cd.png';
import latifahImage from 'figma:asset/2b75ebe65558dd1cd0425b1798eafe07b2dc0f65.png';
import nabasaImage from '../imports/ChatGPT_Image_Apr_15__2026__04_38_01_PM-removebg-preview.png';
import louisImage from '../imports/Apr_15__2026__10_20_01_AM-removebg-preview-1.png';

// Program images
import lmpImage from 'figma:asset/8af8190d680badaabb7f54acbd51ca364eaaeb27.png';
import e1t1Image from 'figma:asset/8699283214e5eb50bfc25cdcc553639e00d46e71.png';
import skillsHubImage from 'figma:asset/5a7810e8c401f85c9a1195afa79c11c7bd456836.png';

// Testimonial images
import victorImage from 'figma:asset/4c53b366fa6e4b21dd5d92f5fe707914fb515271.png';
import elizabethImage from 'figma:asset/e3cc66de3cd3d478c6713fe36314e09ba0c3834d.png';
import rashidImage from 'figma:asset/af2f36aedd8ef9ca63bcdf6cb22755f306c65bc4.png';

// Blog images
import drSabrinaSession from 'figma:asset/80512cb32b4e1d31a3dad0b8abe9ebd2e6ccb629.png';
import mrIsingomaSession from 'figma:asset/816918400983c21870e79b27d0f0267b3295d2ba.png';
import easterOutreachNaguru from 'figma:asset/d05f5a01781c3735d39a148d8279d05d1ac869a2.png';

// Gallery images
import outreachImage from 'figma:asset/4e976b786b3c9210027aa1f4ae29bade1c41bf84.png';
import easterImage from 'figma:asset/8699283214e5eb50bfc25cdcc553639e00d46e71.png';
import menteesImage from 'figma:asset/0c51c6d1634fdbf9c1e8ba2151c2dc75ca70aab9.png';
import easterOutreach2 from 'figma:asset/42be2c9f2d3fbc59a4c12d000474a2feeacde27e.png';
import stBalikudembeStudents from 'figma:asset/82cd7a56e33baae87fcbeea52ca9768829fe6f9c.png';
import stBalikudembeSession from 'figma:asset/063bf2501bf926301a229a559a409b1d81accced.png';



// Images bundled with the site. Vite renames these files on every build, so
// they're saved to the database as stable tokens ("asset:lucyImage") and
// turned back into real URLs when read (see store.ts).
export const BUNDLED_IMAGES: Record<string, string> = {
  heroImage,
  lucyImage, latifahImage, nabasaImage, louisImage,
  lmpImage, e1t1Image, skillsHubImage,
  victorImage, elizabethImage, rashidImage,
  drSabrinaSession, mrIsingomaSession, easterOutreachNaguru,
  outreachImage, easterImage, menteesImage, easterOutreach2,
  stBalikudembeStudents, stBalikudembeSession,
};

/** An uploaded PDF or Word file. */
export interface ReportFile {
  url: string;
  name: string;
  type: string; // 'pdf' | 'docx' | 'doc'
  size: number; // bytes
}

export interface Report {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string; // YYYY-MM-DD, when the report was published
  featured: boolean;
  cover: string; // optional cover image
  file: ReportFile | null;
  createdAt?: number;
}

export const DEFAULT_CONTENT = {
  hero: {
    headingLine1: 'Empowered Youth,',
    headingLine2: 'Eternal Legacies.',
    intro: 'Together, we are shaping a generation that dares to dream beyond limitations, leads with empathy and integrity, and rises with the courage to transform their communities—building a future that outlives them and echoes through generations to come.',
    buttonText: 'Get Involved',
    image: heroImage,
  },

  about: {
    label: 'Who We Are',
    title: 'About Us',
    backgroundTitle: 'Background',
    background: 'The Ehyeh Youth Foundation (E.Y.F) is a non-profit organization committed to uplifting and empowering young people by providing them with the tools, guidance, and opportunities needed to thrive in an ever-changing world. Founded on the belief that every young person possesses untapped potential, E.Y.F aims to bridge gaps in education, mentorship, and skills development, ensuring that no youth is left behind due to lack of access or resources.\n\nWith programs designed to nurture holistic growth—spanning emotional, intellectual, social, and vocational development—E.Y.F is dedicated to creating sustainable pathways for youth to realize their dreams and contribute meaningfully to their communities.',
    missionTitle: 'Mission',
    mission: 'To inspire and empower young minds, fostering personal growth, leadership skills, and a sense of community, while providing opportunities for education, mentorship, and positive impact thereby shaping a resilient and forward-thinking generation.',
    visionTitle: 'Vision',
    vision: 'We envision a world where every young person is equipped with the knowledge, skills, and confidence to lead transformative change—creating a future defined by innovation, compassion, and shared prosperity across communities globally.',
  },

  programsSection: {
    label: 'What We Do',
    title: 'Programs & Initiatives',
    overviewTabLabel: 'Overview',
    overviewTitle: 'Building confident, capable and connected young people.',
    overviewIntro: 'The Ehyeh Youth Foundation runs integrated programs that nurture talent, build skills and create opportunities for young people to thrive. Through mentorship, education, skills development and community support, we equip youth with the tools they need for a brighter future.',
    overviewImage: menteesImage,
    overviewQuote: 'Empowered Youth, Eternal Legacies.',
    // Impact numbers, e.g. { icon: 'people', value: '1,500+', label: 'Young People Reached', text: 'Across our programs.' }.
    // Left empty until the foundation confirms its real figures.
    overviewStats: [] as { id: string; icon: string; value: string; label: string; text: string }[],
    overviewPoints: [
      { id: 'ov-audience', icon: 'target', title: 'Target Audience', text: 'Young people (ages 10–25), especially those from underserved communities.' },
      { id: 'ov-beneficiaries', icon: 'people', title: 'Beneficiaries', text: 'Youth, families, local communities and future leaders.' },
      { id: 'ov-focus', icon: 'care', title: 'Our Focus', text: 'Mentorship, education, skills development, leadership and community impact.' },
    ],
  },

  programs: [
    {
      id: '1',
      title: 'Legacy Mentorship Program (LMP)',
      tabLabel: 'Mentorship',
      stats: [] as { id: string; icon: string; value: string; label: string; text: string }[],
      points: [
        { id: 'lmp-ages', icon: 'people', title: 'Who It Serves', text: 'Pre-teens, teenagers, young adults and young professionals.' },
        { id: 'lmp-format', icon: 'book', title: 'How It Works', text: 'Training sessions, group discussions, projects and expert speakers.' },
        { id: 'lmp-award', icon: 'award', title: 'Recognition', text: 'Each module ends with a commissioning ceremony and certificates.' },
      ],
      subtitle: 'Changing their tomorrow today!!',
      description: 'A comprehensive mentorship ecosystem designed to nurture and empower young people at every stage of their journey. Through structured programs tailored to different age groups and contexts, LMP provides the guidance, skills, and support needed to unlock potential and build lasting legacies.',
      fullDescription: 'The Legacy Mentorship Program encompasses four specialized modules, each addressing the unique developmental needs of specific age groups and life situations. From early adolescence through young adulthood, and into professional development, our mentorship approach combines training sessions, group discussions, relevant assignments, outreach programs, projects, and expert speakers. Each module is crowned by a commissioning ceremony with certificate awards, and outstanding participants are retained as future mentors, creating a sustainable cycle of empowerment.',
      icon: '👥',
      image: lmpImage,
      modules: [
        'Self Awareness and building resilience',
        'Mental Health and well-being',
        'Life skills',
        'Financial literacy',
        'Civic engagement and social responsibility',
        'Understanding diversity and global awareness'
      ],
      subPrograms: [
        {
          name: 'JLMP - Junior Legacy Mentorship Programme',
          desc: 'A foundational mentorship program designed for pre-teens and early adolescents, held during school holidays. JLMP creates a safe, engaging environment where young minds explore the changes happening in their bodies and communities while learning the fundamentals of growing up with confidence and self-awareness.',
          duration: 'Holiday-based program (typically 2-3 weeks)',
          format: 'Interactive workshops, games, group activities, parent engagement sessions',
          groupSize: '25-30 participants per cohort',
          ageRange: '8 - 15 years',
          objectives: [
            'Help young people understand physical and emotional changes during puberty',
            'Build foundational social skills and healthy peer relationships',
            'Develop awareness of community roles and responsibilities',
            'Foster self-esteem and positive self-image during formative years',
            'Equip children with age-appropriate life skills and decision-making abilities'
          ],
          weeklyModules: [
            'Understanding Our Changing Bodies',
            'Emotions & Expressing Ourselves',
            'Making Friends & Being Kind',
            'My Role in My Community',
            'Staying Safe & Making Good Choices',
            'Dreams & Goals for My Future'
          ],
          outcomes: [
            'Increased confidence in navigating physical and emotional changes',
            'Better understanding of personal boundaries and safety',
            'Improved communication with parents and peers',
            'Foundation for positive community engagement',
            'Age-appropriate awareness of health and hygiene'
          ]
        },
        {
          name: 'AYMP - Alpha Youth Mentorship Programme',
          desc: 'An intensive transition-focused mentorship program for young adults navigating the critical shift from teenage years to adulthood. Designed specifically for S.6 vacists and university students, AYMP addresses the unique challenges, opportunities, and responsibilities that come with emerging independence and adult life.',
          duration: '12 weeks (1 session per week, 2-3 hours each)',
          format: 'Facilitated discussions, peer mentoring circles, guest speakers, real-world projects',
          groupSize: '20-35 participants per cohort',
          ageRange: '18 - 25 years',
          objectives: [
            'Support successful transition from adolescence to young adulthood',
            'Develop career readiness and employability skills',
            'Build emotional intelligence and healthy relationship skills',
            'Foster financial independence and planning capabilities',
            'Strengthen identity, purpose, and personal values clarification'
          ],
          weeklyModules: [
            'Week 1-2: Identity & Self-Discovery in Young Adulthood',
            'Week 3-4: Navigating Relationships & Social Dynamics',
            'Week 5-6: Career Planning & Professional Development',
            'Week 7-8: Financial Literacy & Independence',
            'Week 9-10: Mental Wellness & Stress Management',
            'Week 11-12: Purpose, Vision & Creating Your Legacy'
          ],
          outcomes: [
            'Clear sense of personal identity and life direction',
            'Enhanced confidence in professional and social settings',
            'Practical skills for managing adult responsibilities',
            'Stronger decision-making and problem-solving abilities',
            'Network of peers and mentors for ongoing support'
          ]
        },
        {
          name: 'Legacy Agents Edition',
          desc: 'A dynamic, tailored 6-week mentorship program for sales agents. Designed to equip field agents with the personal and professional competencies needed to succeed in a results-driven, people-oriented role.',
          duration: '6 weeks (1 session per week, 1.5–2 hours)',
          format: 'Energizing workshops, coaching circles, reflection tasks',
          groupSize: '20–30 agents per cohort',
          objectives: [
            'Boost agent confidence and motivation in high-performance roles',
            'Enhance persuasive communication and relationship-building',
            'Strengthen collaboration and team synergy',
            'Promote mental wellness and work-life harmony',
            'Equip agents with employability and personal branding skills'
          ],
          weeklyModules: [
            'Week 1: Growth Mindset & Self-Leadership',
            'Week 2: Communication for Influence & Trust',
            'Week 3: Work-Life Balance for Agents',
            'Week 4: Team Dynamics & Peer Accountability',
            'Week 5: Personal Branding & Employability',
            'Week 6: Motivation, Goal Setting & Next Steps'
          ],
          outcomes: [
            'More energized, motivated agents with clear growth plans',
            'Improved client interaction and persuasive communication',
            'Reduced burnout and better time management',
            'Greater alignment between personal and company goals'
          ]
        },
        {
          name: 'Legacy @ Work',
          desc: 'A customized 6-week mentorship experience designed for entry-level permanent staff. Empowers young employees with critical soft skills to thrive in a competitive, collaborative, and values-driven workplace.',
          duration: '6 weeks (1 session per week, 2 hours each)',
          format: 'Interactive workshops, team activities, guided reflections',
          groupSize: 'Up to 25 staff per cohort',
          objectives: [
            'Strengthen self-awareness and emotional intelligence in the workplace',
            'Improve communication, feedback, and interpersonal relationships',
            'Cultivate teamwork and cross-functional collaboration',
            'Support work-life balance and employee well-being',
            'Build employability and long-term growth plans'
          ],
          weeklyModules: [
            'Week 1: Foundations of Emotional Intelligence',
            'Week 2: Communication & Feedback Culture',
            'Week 3: Professionalism & Workplace Conduct',
            'Week 4: Teamwork & Collaborative Workstyles',
            'Week 5: Work-Life Balance & Mental Wellness',
            'Week 6: Vision Planning & Career Ownership'
          ],
          outcomes: [
            'Stronger team engagement and interpersonal relationships',
            'Increased personal responsibility and productivity',
            'Improved communication and professionalism',
            'Healthier employee mindset and retention support'
          ]
        },
        {
          name: 'School Thrive Initiative (STI)',
          desc: 'A structured school-based counselling and mentorship program designed to strengthen emotional resilience, social competence, leadership capacity, and academic focus among learners. STI fosters holistic learner development and psychosocial support, building student resilience infrastructure and promoting a school well-being system that benefits the entire school community.',
          duration: 'Customizable based on school needs (typically ongoing throughout school term)',
          format: 'One-on-one counselling sessions, mentorship circles, group workshops, teacher collaboration',
          groupSize: 'Tailored to school population',
          objectives: [
            'Strengthen emotional resilience and wellbeing among learners',
            'Build social competence and healthy relationship skills',
            'Develop leadership capacity and values-driven decision-making',
            'Enhance academic focus and school engagement',
            'Create a sustainable school-based support system'
          ],
          corePillars: [
            {
              title: 'Emotional Wellbeing & Counselling',
              elements: [
                'Confidential one-on-one sessions',
                'Emotional regulation support',
                'Stress & anxiety management',
                'Safe reporting & referral system'
              ]
            },
            {
              title: 'Social-Emotional Learning',
              elements: [
                'Communication skills',
                'Relationship navigation',
                'Conflict resolution',
                'Healthy identity formation'
              ]
            },
            {
              title: 'Leadership & Purpose Development',
              elements: [
                'Self-awareness',
                'Goal setting',
                'Responsibility & agency',
                'Values-driven decision-making'
              ]
            },
            {
              title: 'Belonging & School Culture Strengthening',
              elements: [
                'Mentorship circles',
                'Peer support systems',
                'Workshops',
                'Teacher collaboration'
              ]
            }
          ],
          outcomes: [
            'Enhanced emotional resilience and mental wellness among students',
            'Improved social skills and peer relationships',
            'Stronger leadership qualities and sense of purpose',
            'Better academic performance and school engagement',
            'Sustainable in-house support infrastructure for schools',
            'Positive school culture benefiting entire community'
          ]
        }
      ],
      promisesTitle: 'Our Promises',
      promises: [
        { id: 'promise-parents', title: 'To Parents', text: 'Assurance of a safe, supportive environment for their children\'s growth and development by instilling values, fostering 21st Century skills, and preparing them for a bright future.' },
        { id: 'promise-mentees', title: 'To Mentees', text: 'An unwavering support in unlocking their potential, offering guidance to navigate challenges and creating a platform for growth and success.' },
        { id: 'promise-community', title: 'To Community', text: 'A pledge to cultivate responsible and engaged citizens, contributing positively to society, and creating a ripple effect of empowerment and progress.' }
      ]
    },
    {
      id: '2',
      title: 'E1T1 Education Fund',
      tabLabel: 'Education',
      stats: [] as { id: string; icon: string; value: string; label: string; text: string }[],
      points: [
        { id: 'e1t1-support', icon: 'graduation', title: 'What We Provide', text: 'Scholarships, school supplies, tutoring and digital literacy.' },
        { id: 'e1t1-partners', icon: 'partnership', title: 'Who Can Join', text: 'Young professionals, companies, NGOs, schools and partners.' },
        { id: 'e1t1-event', icon: 'calendar', title: 'Annual Fundraiser', text: 'Held every September to share our dream and success stories.' },
      ],
      subtitle: 'Each One Teach One',
      description: 'Through fundraising and collaboration with fellow Ugandans, together with like-minded entities, we aim to see over 1 million brilliant yet underprivileged youth through school—giving them a chance to better their lives and transform their communities.',
      fullDescription: 'The E1T1 Education fund targets young corporate individuals, Civil Society Organizations (CSOs), NGOs, community-based organizations, educational institutions, private sector partners, government agencies, and other organizations that understand and appreciate the need to educate our own and therefore have a desire to join hands to make this happen. E.Y.F will have an annual fund-raising event in September to bring together young people, corporate entities and organizations to share our dream and some of the success stories with them and have them contribute to this cause.',
      icon: '🎓',
      image: e1t1Image,
      modules: [
        'Scholarship Programs for Underprivileged Youth',
        'School Supplies & Learning Materials',
        'Tutoring & Academic Support',
        'Digital Literacy Programs',
        'Annual Fundraising Events in September',
        'Partnership with Corporate Entities'
      ],
      target: 'Young corporate individuals, Civil Society Organizations (CSOs), NGOs, community-based organizations, educational institutions, private sector partners, government agencies, and other organizations committed to educational empowerment and multi-sector collaboration',
      goal: 'Support over 1 million brilliant yet underprivileged Ugandan youth through school'
    },
    {
      id: '3',
      title: 'F.R.E.E.D Skills Hub',
      tabLabel: 'Skills',
      stats: [] as { id: string; icon: string; value: string; label: string; text: string }[],
      points: [
        { id: 'freed-who', icon: 'heart', title: 'Who It Serves', text: 'Teen mothers and young women seeking a second chance.' },
        { id: 'freed-skills', icon: 'skills', title: 'Skills Taught', text: 'Tailoring, baking, hairdressing, business and money management.' },
        { id: 'freed-outcome', icon: 'growth', title: 'The Result', text: 'Self-starters with income-generating skills and confidence.' },
      ],
      subtitle: 'See Me Fly!',
      description: 'Fearless. Resilient. Empowered. Exceptional. Determined. Together, these words represent the spirit and strength of young people, especially girls, inspiring them to embrace their uniqueness, overcome their current challenges, and reach for their dreams with confidence and courage.',
      fullDescription: 'Through skills development training programs, think tanks, and innovation sessions, participants are taught vocational and income generating skills. They become self starters and gain business skills to help them better and change their lives. This strand is mainly aimed at helping teen mothers that may have dropped out of school due to early pregnancies and abandoned by family as a result. Through this program they get a second chance at life.',
      icon: '✨',
      image: skillsHubImage,
      modules: [
        'Vocational Skills Training (Tailoring, Baking, Hairdressing)',
        'Business & Entrepreneurship Development',
        'Financial Literacy & Money Management',
        'Innovation Sessions & Think Tanks',
        'Income Generating Skills',
        'Mental Health & Wellness Support'
      ],
      target: 'Teen mothers and young women who have faced educational disruption, seeking economic independence and a second chance at life',
      acronymTitle: 'What F.R.E.E.D Stands For',
      acronym: [
        { id: 'acr-f', letter: 'F', word: 'Fearless' },
        { id: 'acr-r', letter: 'R', word: 'Resilient' },
        { id: 'acr-e1', letter: 'E', word: 'Empowered' },
        { id: 'acr-e2', letter: 'E', word: 'Exceptional' },
        { id: 'acr-d', letter: 'D', word: 'Determined' }
      ]
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Mutasa Victor Alpha',
      role: 'Sir. Apollo Kaggwa Primary School',
      quote: 'What I loved about the Legacy Mentorship Program was making new friends and learning important life lessons. I learned that body changes are completely normal, and we shouldn\'t feel embarrassed, angry, or upset about them.',
      highlight: 'Learning important life lessons',
      message: 'Please keep researching and improving the program for the next holiday\'s Legacy Mentorship Program!',
      image: victorImage
    },
    {
      id: '2',
      name: 'Aranthe Elizabeth',
      role: 'Makerere College School',
      quote: 'I really liked that we get to learn how to make good decisions, especially as young people, and avoid bad influences so we can grow into responsible adults.',
      highlight: 'Making good decisions',
      message: 'I would encourage other teenagers to join next time, because many of the challenges we face are being addressed and solved here.',
      image: elizabethImage
    },
    {
      id: '3',
      name: 'Rashid Ssemanda',
      role: 'Makerere Business School',
      quote: 'Taking part in the Legacy Mentorship Program has been an incredible experience that continues to impact my daily life and studies.',
      highlight: 'Excel academically and personally',
      message: 'I highly encourage other young people to join the Legacy Mentorship Program because it equips you with practical tools and guidance to succeed in school, life, and beyond.',
      image: rashidImage
    }
  ],
  blog: [
    {
      id: '1',
      title: 'Legacy Mentorship Program – Module 1: Self Awareness',
      excerpt: 'The Ehyeh Youth Foundation kicked off its Legacy Mentorship Program with Dr. Sabrina B. Kitaka leading the first module on Self Awareness at Lourdel Towers.',
      content: 'The Ehyeh Youth Foundation kicked off its Legacy Mentorship Program with Dr. Sabrina B. Kitaka leading the first module on Self Awareness at Lourdel Towers on Monday, 19th February.\n\nParticipants explored the importance of self-identity, learned how to use personal strengths to make an impact, and identified areas for growth.',
      image: drSabrinaSession,
      date: '2025-02-19',
      category: 'Programs',
      readTime: '3 min read',
      author: 'EYF Team'
    },
    {
      id: '2',
      title: 'A Heartfelt Thank You: Reflecting on Our Easter Outreach',
      excerpt: 'Thanks to your incredible generosity, we were able to deliver essential food supplies and share moments of genuine Easter love and kindness with the community at The Naguru Remond Home.',
      content: 'Thanks to your incredible generosity, we were able to deliver essential food supplies including rice, cooking oil, and soda and share moments of genuine Easter love and kindness with the community.\n\nThe smiles, laughter, and genuine connections made during this outreach will have a lasting impact on everyone who participated.',
      image: easterOutreachNaguru,
      date: '2024-03-29',
      category: 'Community Outreach',
      readTime: '4 min read',
      author: 'EYF Team'
    },
    {
      id: '3',
      title: 'Changing Their Tomorrow Today',
      excerpt: 'The Legacy Mentorship Program successfully embodied its mission with an impactful full-day session led by the esteemed Mr. Isingoma George at Lourdel Towers.',
      content: 'The event, which ran from 9:00 AM to 8:00 PM EAT at Lourdel Towers, featured an impactful session led by the esteemed Mr. Isingoma George.\n\nThrough practical workshops, group discussions, and one-on-one mentoring sessions, participants gained tools and strategies to overcome challenges.',
      image: mrIsingomaSession,
      date: '2024-03-11',
      category: 'Impact Stories',
      readTime: '5 min read',
      author: 'EYF Team'
    }
  ],
  gallery: [
    { id: '1', url: outreachImage, caption: 'Community Outreach - Clothing Donation', category: 'Outreach Programs' },
    { id: '2', url: easterImage, caption: 'Easter Outreach at Naguru Remond Home', category: 'Community Events' },
    { id: '3', url: menteesImage, caption: 'Legacy Mentorship Program Mentees', category: 'LMP' },
    { id: '4', url: easterOutreach2, caption: 'Easter Outreach - Community Distribution', category: 'Community Events' },
    { id: '5', url: stBalikudembeStudents, caption: 'St. Balikudembe Students After LMP Session', category: 'LMP' },
    { id: '6', url: stBalikudembeSession, caption: 'LMP Session at St. Balikudembe', category: 'LMP' },
    { id: '7', url: drSabrinaSession, caption: 'LMP Session with Dr. Sabrina', category: 'LMP' },
    { id: '8', url: mrIsingomaSession, caption: 'LMP Session with Mr. Isingoma', category: 'LMP' },
    { id: '9', url: easterOutreachNaguru, caption: 'Easter Outreach at Naguru Remond Home', category: 'Community Events' }
  ],
  team: [
    { id: '1', name: 'Mrs. Lucy Tindimwebwa', role: 'Executive Director', image: lucyImage },
    { id: '2', name: 'Ms. Latifah Mutesi', role: 'Programs Coordinator', image: latifahImage },
    { id: '3', name: 'Mr. Nabasa Enoth', role: 'Partnership and Fundraising Lead', image: nabasaImage },
    { id: '4', name: 'Mr. Louis Lukoma', role: 'Communications Lead', image: louisImage }
  ],

  testimonialsSection: {
    label: 'Success Stories',
    title: 'Testimonials',
    intro: 'Real stories. Lasting impact.',
  },

  gallerySection: {
    label: 'Our Journey',
    title: 'Gallery',
    intro: 'Capturing moments of transformation, growth, and community impact.',
  },

  blogSection: {
    label: 'Latest Updates',
    title: 'News & Stories',
    intro: 'Stay updated with our latest activities, success stories, and community impact.',
  },

  reportsSection: {
    label: 'Accountability',
    title: 'Reports & Publications',
    intro: 'Annual reports, financial statements and program reports, published openly for our partners, donors and community.',
  },

  // Uploaded through the admin panel.
  reports: [] as Report[],

  teamSection: {
    title: 'Meet the Team',
  },

  contact: {
    label: 'Join The Movement',
    title: 'Become Part of E.Y.F',
    intro: "Whether you're interested in volunteering, partnering with us, offering support, or exploring collaboration opportunities—we'd love to hear from you. Together, we can create lasting impact.",
    connectTitle: "Let's Connect",
    connectText: "Whether you want to volunteer, partner with us, or learn more about our programs, we'd love to hear from you. Together, we can empower the next generation.",
    phones: ['+256 755 992 026', '+256 788 268 464'],
    email: 'eyf.legacies@gmail.com',
    addressLine: 'AHA Towers, along Lourdel Road',
    addressDetail: 'P.O. Box 127928 Kampala, Uganda',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=AHA+Towers%2C+Lourdel+Road%2C+Kampala',
    mapEmbed: 'https://maps.google.com/maps?q=AHA+Towers%2C+Lourdel+Road%2C+Kampala&z=16&output=embed',
  },

  footer: {
    tagline: 'Empowering the youth, transforming tomorrow. Together, we shape a generation that leads with purpose.',
    youtube: 'https://www.youtube.com/channel/UCew3S6TrCXtD8iSZewX-ejQ',
    instagram: 'https://www.instagram.com/ehyeh_youth_foundation/',
    x: 'https://x.com/EyfLegacies',
    linkedin: 'https://www.linkedin.com/in/ehyeh-youth-foundation-aa4771404',
    tiktok: 'https://www.tiktok.com/@ehyehyouthfoundation?lang=en',
    madeWith: "for Uganda's Youth",
  },

  faq: {
    title: 'Frequently Asked Questions',
    intro: 'Find answers to common questions about E.Y.F and our programs',
    categories: [
    {
      name: 'General',
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
          answer: 'Our main office is located at AHA Towers, along Lourdel Road, Kampala, Uganda (P.O. Box 127928). However, we conduct programs at various schools, community centers, and partner locations throughout Kampala and surrounding areas.'
        }
      ]
    },
    {
      name: 'Legacy Mentorship Program (LMP)',
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
          answer: 'You can register by sending us a message through the contact form on our website, or contact us directly via email (eyf.legacies@gmail.com) or phone (+256 755 992 026). For participants under 18, parental consent is required.'
        },
        {
          question: 'Is there a cost to participate?',
          answer: 'We strive to keep our programs affordable and accessible. Some programs are offered free of charge through partnerships and donations, while others may have minimal registration fees to cover materials. Financial assistance is available for deserving participants who cannot afford the fees.'
        }
      ]
    },
    {
      name: 'E1T1 Education Fund',
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
      name: 'F.R.E.E.D Skills Hub',
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
      name: 'Getting Involved',
      questions: [
        {
          question: 'How can I volunteer with E.Y.F?',
          answer: 'We welcome volunteers! You can sign up by sending us a message through the contact form on our website. We need mentors, skills trainers, event coordinators, administrative support, and more. All volunteers undergo orientation and training before working with our participants.'
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
      name: 'Programs & Events',
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
      name: 'Contact & Support',
      questions: [
        {
          question: 'How can I contact E.Y.F?',
          answer: 'Email: eyf.legacies@gmail.com | Phone: +256 755 992 026 or +256 788 268 464 | Address: AHA Towers, along Lourdel Road, P.O. Box 127928, Kampala, Uganda. We typically respond to inquiries within 24-48 hours.'
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
  ],
    ctaTitle: 'Still Have Questions?',
    ctaText: "Can't find the answer you're looking for? Our team is here to help! Reach out and we'll get back to you as soon as possible.",
  },

  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'November 21, 2025',
    sections: [
      {
        heading: '1. Introduction',
        body: 'At Ehyeh Youth Foundation (E.Y.F), we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website, participate in our programs, or interact with our services.',
      },
      {
        heading: '2. Information We Collect',
        body: '**2.1 Personal Information:**\n- Name, date of birth, and gender\n- Contact information (email, phone number, address)\n- Educational background and institution\n- Parent/guardian information for minors\n- Emergency contact details\n\n**2.2 Program Information:**\n- Program preferences and interests\n- Attendance records and participation details\n- Feedback and testimonials\n- Skills assessments and progress reports\n\n**2.3 Technical Information:**\n- IP address and browser type\n- Device information and operating system\n- Website usage data and cookies\n- Pages visited and time spent on site',
      },
      {
        heading: '3. How We Use Your Information',
        body: '**3.1 Program Administration:** To register participants, coordinate program activities, and communicate schedules and updates.\n\n**3.2 Communication:** To send program information, newsletters, event invitations, and organizational updates.\n\n**3.3 Improvement:** To analyze program effectiveness, gather feedback, and improve our services.\n\n**3.4 Safety:** To ensure the safety and well-being of all participants during programs and events.\n\n**3.5 Marketing:** To promote our programs and share success stories (with consent).\n\n**3.6 Compliance:** To comply with legal obligations and protect our rights.',
      },
      {
        heading: '4. Information Sharing and Disclosure',
        body: 'We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:\n\n**4.1 With Consent:** When you provide explicit consent to share your information.\n\n**4.2 Service Providers:** With trusted third-party service providers who assist us in operating our programs (e.g., email services, event management platforms).\n\n**4.3 Partners:** With program partners, mentors, and educational institutions involved in delivering our services.\n\n**4.4 Legal Requirements:** When required by law, court order, or to protect the rights and safety of E.Y.F, participants, or others.\n\n**4.5 Parents/Guardians:** We may share participant information with parents or legal guardians of minors.',
      },
      {
        heading: '5. Data Security',
        body: 'We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
      },
      {
        heading: '6. Data Retention',
        body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Program records and participant information are typically retained for 5 years for reporting and impact assessment purposes.',
      },
      {
        heading: '7. Your Rights',
        body: 'You have the right to:\n- **Access:** Request a copy of your personal information\n- **Correction:** Request correction of inaccurate information\n- **Deletion:** Request deletion of your information (subject to legal requirements)\n- **Opt-Out:** Unsubscribe from marketing communications\n- **Object:** Object to certain processing of your information\n- **Portability:** Request transfer of your information to another organization\n\nTo exercise these rights, please contact us at eyf.legacies@gmail.com',
      },
      {
        heading: "8. Children's Privacy",
        body: "Many of our programs serve minors. We obtain parental or guardian consent before collecting personal information from participants under 18 years of age. Parents have the right to review, modify, or delete their child's information at any time.",
      },
      {
        heading: '9. Cookies and Tracking Technologies',
        body: 'Our website uses cookies and similar tracking technologies to enhance user experience, analyze site traffic, and understand user preferences. You can control cookies through your browser settings, but disabling cookies may affect website functionality.',
      },
      {
        heading: '10. Third-Party Links',
        body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.',
      },
      {
        heading: '11. Changes to This Privacy Policy',
        body: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date.',
      },
      {
        heading: '12. Contact Us',
        body: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\n**Email:** eyf.legacies@gmail.com\n**Phone:** +256 755 992 026 / +256 788 268 464\n**Address:** AHA Towers, along Lourdel Road, P.O. Box 127928, Kampala, Uganda',
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'November 21, 2025',
    sections: [
      {
        heading: '1. Introduction',
        body: 'Welcome to the Ehyeh Youth Foundation (E.Y.F). By accessing our website and participating in our programs, you agree to comply with and be bound by the following terms and conditions. Please review them carefully. If you do not agree with these terms, you should not use our services or participate in our programs.',
      },
      {
        heading: '2. Use of Services',
        body: '**2.1 Eligibility:** Our programs are primarily designed for youth between the ages of 10-25 years. Participants under 18 years must have parental or guardian consent.\n\n**2.2 Registration:** You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account information.\n\n**2.3 Acceptable Use:** You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our services.',
      },
      {
        heading: '3. Program Participation',
        body: '**3.1 Commitment:** Participants are expected to attend all scheduled sessions and actively engage in program activities.\n\n**3.2 Code of Conduct:** All participants must respect mentors, fellow participants, and program staff. Disruptive behavior may result in removal from the program.\n\n**3.3 Photography & Media:** By participating in our programs, you consent to being photographed or recorded for promotional purposes unless you explicitly opt out in writing.',
      },
      {
        heading: '4. Intellectual Property',
        body: 'All content on this website, including text, graphics, logos, images, and software, is the property of Ehyeh Youth Foundation and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.',
      },
      {
        heading: '5. Donations & Financial Contributions',
        body: '**5.1 Tax Deductibility:** E.Y.F is a registered nonprofit organization. Donations may be tax-deductible to the extent permitted by law.\n\n**5.2 Refund Policy:** All donations are final and non-refundable unless otherwise agreed upon in writing.\n\n**5.3 Use of Funds:** We reserve the right to allocate donations to areas of greatest need within our mission and programs.',
      },
      {
        heading: '6. Liability & Disclaimer',
        body: '**6.1 No Warranty:** Our services and programs are provided "as is" without any warranty of any kind.\n\n**6.2 Limitation of Liability:** E.Y.F shall not be liable for any indirect, incidental, or consequential damages arising from participation in our programs or use of our services.\n\n**6.3 Medical Disclaimer:** While we provide mentorship and guidance, we are not medical or mental health professionals. Participants requiring professional assistance will be referred to appropriate services.',
      },
      {
        heading: '7. Privacy',
        body: 'Your privacy is important to us. Please review our [Privacy Policy](#/privacy-policy) to understand how we collect, use, and protect your personal information.',
      },
      {
        heading: '8. Modifications to Terms',
        body: 'E.Y.F reserves the right to modify these terms and conditions at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the modified terms.',
      },
      {
        heading: '9. Governing Law',
        body: 'These terms shall be governed by and construed in accordance with the laws of Uganda. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Uganda.',
      },
      {
        heading: '10. Contact Information',
        body: 'If you have any questions about these Terms & Conditions, please contact us:\n\n**Email:** eyf.legacies@gmail.com\n**Phone:** +256 755 992 026 / +256 788 268 464\n**Address:** AHA Towers, along Lourdel Road, P.O. Box 127928, Kampala, Uganda',
      },
    ],
  },
};

export type SiteContent = typeof DEFAULT_CONTENT;
export type SectionKey = keyof SiteContent;
export const SECTION_KEYS = Object.keys(DEFAULT_CONTENT) as SectionKey[];
