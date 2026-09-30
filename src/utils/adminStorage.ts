import { supabase } from '../lib/supabase';
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


// Initial data with all original hardcoded content
const INITIAL_DATA = {
  programs: [
    {
      id: '1',
      title: 'Legacy Mentorship Program (LMP)',
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
      promises: {
        toParents: 'Assurance of a safe, supportive environment for their children\'s growth and development by instilling values, fostering 21st Century skills, and preparing them for a bright future.',
        toMentees: 'An unwavering support in unlocking their potential, offering guidance to navigate challenges and creating a platform for growth and success.',
        toCommunity: 'A pledge to cultivate responsible and engaged citizens, contributing positively to society, and creating a ripple effect of empowerment and progress.'
      }
    },
    {
      id: '2',
      title: 'E1T1 Education Fund',
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
      acronym: {
        F: 'Fearless',
        R: 'Resilient',
        E: 'Empowered',
        E2: 'Exceptional',
        D: 'Determined'
      }
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
      readTime: '3 min read'
    },
    {
      id: '2',
      title: 'A Heartfelt Thank You: Reflecting on Our Easter Outreach',
      excerpt: 'Thanks to your incredible generosity, we were able to deliver essential food supplies and share moments of genuine Easter love and kindness with the community at The Naguru Remond Home.',
      content: 'Thanks to your incredible generosity, we were able to deliver essential food supplies including rice, cooking oil, and soda and share moments of genuine Easter love and kindness with the community.\n\nThe smiles, laughter, and genuine connections made during this outreach will have a lasting impact on everyone who participated.',
      image: easterOutreachNaguru,
      date: '2024-03-29',
      category: 'Community Outreach',
      readTime: '4 min read'
    },
    {
      id: '3',
      title: 'Changing Their Tomorrow Today',
      excerpt: 'The Legacy Mentorship Program successfully embodied its mission with an impactful full-day session led by the esteemed Mr. Isingoma George at Lourdel Towers.',
      content: 'The event, which ran from 9:00 AM to 8:00 PM EAT at Lourdel Towers, featured an impactful session led by the esteemed Mr. Isingoma George.\n\nThrough practical workshops, group discussions, and one-on-one mentoring sessions, participants gained tools and strategies to overcome challenges.',
      image: mrIsingomaSession,
      date: '2024-03-11',
      category: 'Impact Stories',
      readTime: '5 min read'
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
  about: {
    mission: 'To inspire and empower young minds, fostering personal growth, leadership skills, and a sense of community, while providing opportunities for education, mentorship, and positive impact thereby shaping a resilient and forward-thinking generation.',
    vision: 'We envision a world where every young person is equipped with the knowledge, skills, and confidence to lead transformative change—creating a future defined by innovation, compassion, and shared prosperity across communities globally.'
  }
};


// ---------------------------------------------------------------------------
// Shared content storage (Supabase)
//
// All site content lives in the `site_content` table: one row per section,
// with the section's data stored as JSON. Everyone who visits the site reads
// the same rows, so an edit made in the admin panel shows up for every visitor
// on their next page load. No rebuild or redeploy is needed.
//
// If a section has never been saved, or Supabase can't be reached, the
// original content above (INITIAL_DATA) is shown instead.
// ---------------------------------------------------------------------------


export type SectionKey = keyof typeof INITIAL_DATA;

const TABLE = 'site_content';

// Images bundled with the site get new hashed URLs whenever Vite rebuilds
// them, so they're saved to the database as stable tokens ("asset:lucyImage")
// and turned back into real URLs when read.
const BUNDLED_IMAGES: Record<string, string> = {
  lucyImage, latifahImage, nabasaImage, louisImage,
  lmpImage, e1t1Image, skillsHubImage,
  victorImage, elizabethImage, rashidImage,
  drSabrinaSession, mrIsingomaSession, easterOutreachNaguru,
  outreachImage, easterImage, menteesImage, easterOutreach2,
  stBalikudembeStudents, stBalikudembeSession,
};
const ASSET_PREFIX = 'asset:';
const urlToAssetKey = new Map(
  Object.entries(BUNDLED_IMAGES).map(([key, url]) => [url, key])
);

function encodeAssets(value: any): any {
  if (typeof value === 'string') {
    const key = urlToAssetKey.get(value);
    return key ? `${ASSET_PREFIX}${key}` : value;
  }
  if (Array.isArray(value)) return value.map(encodeAssets);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encodeAssets(v)]));
  }
  return value;
}

function decodeAssets(value: any): any {
  if (typeof value === 'string') {
    if (value.startsWith(ASSET_PREFIX)) {
      return BUNDLED_IMAGES[value.slice(ASSET_PREFIX.length)] ?? '';
    }
    return value;
  }
  if (Array.isArray(value)) return value.map(decodeAssets);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, decodeAssets(v)]));
  }
  return value;
}

function defaultsFor(section: SectionKey) {
  return structuredClone(INITIAL_DATA[section]);
}

function describeError(error: { message?: string; code?: string }) {
  const message = error.message || '';
  if (error.code === '42501' || /row-level security|permission denied/i.test(message)) {
    return 'Your account is not allowed to edit the website. Sign out, sign in again, and check that your email is listed in the admin_users table.';
  }
  if (/JWT|token/i.test(message)) {
    return 'Your session has expired. Sign out and sign in again.';
  }
  if (/Failed to fetch|NetworkError/i.test(message)) {
    return 'Could not reach the server. Check your internet connection and try again.';
  }
  return message || 'Something went wrong while saving.';
}

// One request per section per page load, shared by every component that asks.
const cache = new Map<SectionKey, Promise<any>>();

async function fetchSection(section: SectionKey) {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('data')
      .eq('section', section)
      .maybeSingle();

    if (error) {
      console.error(`Could not load "${section}" content:`, error.message);
      return defaultsFor(section);
    }
    if (!data || data.data === null || data.data === undefined) {
      return defaultsFor(section);
    }
    return decodeAssets(data.data);
  } catch (err) {
    console.error(`Could not load "${section}" content:`, err);
    return defaultsFor(section);
  }
}

/** Read a section. Pass fresh=true to skip the in-page cache (the admin panel does). */
export function loadSection(section: SectionKey, fresh = false): Promise<any> {
  if (fresh || !cache.has(section)) {
    cache.set(section, fetchSection(section));
  }
  return cache.get(section)!;
}

/** Replace a whole section. Throws an Error with a readable message on failure. */
export async function saveSection(section: SectionKey, value: any) {
  const { error } = await supabase.from(TABLE).upsert(
    {
      section,
      data: encodeAssets(value),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'section' }
  );
  if (error) {
    throw new Error(describeError(error));
  }
  cache.set(section, Promise.resolve(value));
}

/** Put the original launch content back for one section. */
export async function restoreSectionDefaults(section: SectionKey) {
  await saveSection(section, defaultsFor(section));
}

async function upsertItem(section: SectionKey, item: any) {
  const items: any[] = await loadSection(section, true);
  const index = items.findIndex((existing) => existing.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  await saveSection(section, items);
}

async function removeItem(section: SectionKey, id: string) {
  const items: any[] = await loadSection(section, true);
  await saveSection(section, items.filter((item) => item.id !== id));
}

// Read
export const getPrograms = (fresh = false) => loadSection('programs', fresh);
export const getTestimonials = (fresh = false) => loadSection('testimonials', fresh);
export const getBlogPosts = (fresh = false) => loadSection('blog', fresh);
export const getGalleryImages = (fresh = false) => loadSection('gallery', fresh);
export const getTeamMembers = (fresh = false) => loadSection('team', fresh);
export const getAboutInfo = (fresh = false) => loadSection('about', fresh);

// Replace whole sections
export const savePrograms = (programs: any[]) => saveSection('programs', programs);
export const saveTestimonials = (testimonials: any[]) => saveSection('testimonials', testimonials);
export const saveBlogPosts = (posts: any[]) => saveSection('blog', posts);
export const saveGalleryImages = (images: any[]) => saveSection('gallery', images);
export const saveTeamMembers = (team: any[]) => saveSection('team', team);
export const saveAboutInfo = (about: any) => saveSection('about', about);

// Add or update one item
export const saveProgram = (program: any) => upsertItem('programs', program);
export const saveTestimonial = (testimonial: any) => upsertItem('testimonials', testimonial);
export const saveBlogPost = (post: any) => upsertItem('blog', post);
export const saveGalleryImage = (image: any) => upsertItem('gallery', image);
export const saveTeamMember = (member: any) => upsertItem('team', member);

// Delete one item
export const deleteProgram = (id: string) => removeItem('programs', id);
export const deleteTestimonial = (id: string) => removeItem('testimonials', id);
export const deleteBlogPost = (id: string) => removeItem('blog', id);
export const deleteGalleryImage = (id: string) => removeItem('gallery', id);
export const deleteTeamMember = (id: string) => removeItem('team', id);

