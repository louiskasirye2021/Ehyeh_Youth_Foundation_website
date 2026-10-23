import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Home,
  FileText,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  Newspaper,
  Users,
  Phone,
  HelpCircle,
  Shield,
  Scale,
  FileText as ReportIcon,
} from 'lucide-react';
import { newId, sortPhotosNewestFirst, sortStoriesNewestFirst, type SectionKey } from '../content/store';

// Describes every editable field on the website. The admin editor is built
// from these descriptions, so adding a field here adds it to the admin panel.

interface BaseField {
  key: string;
  label: string;
  help?: string;
  required?: boolean;
}

export type Field =
  | (BaseField & { kind: 'text'; placeholder?: string; suggestions?: string[] })
  | (BaseField & { kind: 'textarea'; rows?: number; formatted?: boolean; placeholder?: string })
  | (BaseField & { kind: 'image' })
  | (BaseField & { kind: 'icon' })
  | (BaseField & { kind: 'document' })
  | (BaseField & { kind: 'toggle'; onLabel?: string })
  | (BaseField & { kind: 'date' })
  | (BaseField & { kind: 'link'; placeholder?: string })
  | (BaseField & { kind: 'strings'; itemLabel: string })
  | ListField;

export interface ListField extends BaseField {
  kind: 'list';
  /** Singular name shown on buttons, e.g. "sub-program". */
  itemLabel: string;
  /** Which field to show as each item's title when collapsed. */
  titleKey: string;
  /** Optional second line when collapsed. */
  subtitle?: (item: any) => string;
  imageKey?: string;
  fields: Field[];
  newItem: () => any;
  /** New items go at the top (e.g. stories) instead of the bottom. */
  addAtStart?: boolean;
  /** Order is decided automatically (e.g. stories by date), so hide move buttons. */
  autoOrdered?: boolean;
}

export interface EditorPart {
  key: SectionKey;
  title: string;
  description?: string;
  /** For sections that are a single set of fields. */
  fields?: Field[];
  /** For sections that are a list of items (programs, stories, team…). */
  list?: Omit<ListField, 'kind' | 'key' | 'label'>;
  /** Re-order a list when it's loaded (e.g. newest stories first). */
  prepare?: (value: any) => any;
}

export interface EditorTab {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  /** Where to see this content on the website. */
  sitePath: string;
  parts: EditorPart[];
  group: 'home' | 'pages';
}

const today = () => new Date().toISOString().slice(0, 10);

const statsField = (help: string): Field => ({
  kind: 'list',
  key: 'stats',
  label: 'Stats (numbers)',
  help,
  itemLabel: 'stat',
  titleKey: 'value',
  subtitle: (x) => x.label,
  fields: [
    { kind: 'text', key: 'value', label: 'Number', required: true, placeholder: 'e.g. 1,500+' },
    { kind: 'text', key: 'label', label: 'What it counts', placeholder: 'e.g. Young People Reached' },
    { kind: 'text', key: 'text', label: 'Small text underneath' },
    { kind: 'icon', key: 'icon', label: 'Icon' },
  ],
  newItem: () => ({ id: newId('stat'), icon: 'people', value: '', label: '', text: '' }),
});

const pointsField = (help: string): Field => ({
  kind: 'list',
  key: 'points',
  label: 'Key points (bottom row)',
  help,
  itemLabel: 'key point',
  titleKey: 'title',
  subtitle: (x) => x.text,
  fields: [
    { kind: 'text', key: 'title', label: 'Title', required: true, placeholder: 'e.g. Target Audience' },
    { kind: 'textarea', key: 'text', label: 'Text', rows: 2 },
    { kind: 'icon', key: 'icon', label: 'Icon' },
  ],
  newItem: () => ({ id: newId('point'), icon: 'star', title: '', text: '' }),
});

const FORMAT_HELP = 'Leave a blank line between paragraphs. Start a line with "- " for a bullet point. Put **double stars** around words to make them bold.';

const headingFields = (opts: { intro?: boolean; label?: boolean } = {}): Field[] => [
  ...(opts.label === false
    ? []
    : [{ kind: 'text', key: 'label', label: 'Small heading above the title', help: 'The gold line above the main title.' } as Field]),
  { kind: 'text', key: 'title', label: 'Section title' },
  ...(opts.intro ? [{ kind: 'textarea', key: 'intro', label: 'Introduction', rows: 2 } as Field] : []),
];

// ----- Programs ---------------------------------------------------------------

const subProgramFields: Field[] = [
  { kind: 'text', key: 'name', label: 'Name', required: true },
  { kind: 'textarea', key: 'desc', label: 'Description', rows: 4, formatted: true },
  { kind: 'text', key: 'duration', label: 'Duration' },
  { kind: 'text', key: 'format', label: 'Format' },
  { kind: 'text', key: 'groupSize', label: 'Group size' },
  { kind: 'text', key: 'ageRange', label: 'Age range' },
  { kind: 'strings', key: 'objectives', label: 'Program objectives', itemLabel: 'objective' },
  { kind: 'strings', key: 'weeklyModules', label: 'Weekly mentorship modules', itemLabel: 'module' },
  {
    kind: 'list',
    key: 'corePillars',
    label: 'Core pillars',
    itemLabel: 'pillar',
    titleKey: 'title',
    fields: [
      { kind: 'text', key: 'title', label: 'Pillar title', required: true },
      { kind: 'strings', key: 'elements', label: 'Points', itemLabel: 'point' },
    ],
    newItem: () => ({ id: newId('pillar'), title: '', elements: [] }),
  },
  { kind: 'strings', key: 'outcomes', label: 'Expected outcomes', itemLabel: 'outcome' },
];

const programFields: Field[] = [
  { kind: 'text', key: 'tabLabel', label: 'Tab name', required: true, help: 'The short name on this program\'s tab, e.g. "Mentorship".' },
  { kind: 'text', key: 'title', label: 'Program name', required: true },
  { kind: 'text', key: 'subtitle', label: 'Tagline', help: 'The gold line under the name.' },
  { kind: 'text', key: 'icon', label: 'Icon (emoji)', help: 'One emoji, e.g. 👥. Leave empty to use a default icon.' },
  { kind: 'image', key: 'image', label: 'Program photo', help: 'Shown on the right of the tab with a curved edge. The tagline appears over it in gold.' },
  { kind: 'textarea', key: 'description', label: 'Short description', rows: 4, help: 'The paragraph under the program name at the top of the tab.' },
  statsField('Optional. Leave empty and the tab simply shows no numbers.'),
  pointsField('Up to 3 work best. Shown along the bottom of the top panel.'),
  { kind: 'strings', key: 'modules', label: 'Key modules & focus areas', itemLabel: 'module' },
  { kind: 'textarea', key: 'fullDescription', label: 'More about this program', rows: 6, formatted: true },
  { kind: 'textarea', key: 'goal', label: 'Our goal', rows: 2, help: 'Shown as a gold box. Leave empty to hide it.' },
  { kind: 'textarea', key: 'target', label: 'Target audience', rows: 3, help: 'Leave empty to hide it.' },
  { kind: 'text', key: 'acronymTitle', label: 'Acronym heading', help: 'e.g. "What F.R.E.E.D Stands For".' },
  {
    kind: 'list',
    key: 'acronym',
    label: 'Acronym letters',
    itemLabel: 'letter',
    titleKey: 'word',
    subtitle: (a) => a.letter,
    fields: [
      { kind: 'text', key: 'letter', label: 'Letter' },
      { kind: 'text', key: 'word', label: 'Word', required: true },
    ],
    newItem: () => ({ id: newId('acr'), letter: '', word: '' }),
  },
  {
    kind: 'list',
    key: 'subPrograms',
    label: 'Sub-programs',
    itemLabel: 'sub-program',
    titleKey: 'name',
    subtitle: (s) => [s.ageRange, s.duration].filter(Boolean).join(', '),
    fields: subProgramFields,
    newItem: () => ({
      id: newId('sub'),
      name: '',
      desc: '',
      duration: '',
      format: '',
      groupSize: '',
      ageRange: '',
      objectives: [],
      weeklyModules: [],
      corePillars: [],
      outcomes: [],
    }),
  },
  { kind: 'text', key: 'promisesTitle', label: 'Promises heading', help: 'e.g. "Our Promises".' },
  {
    kind: 'list',
    key: 'promises',
    label: 'Promises',
    itemLabel: 'promise',
    titleKey: 'title',
    fields: [
      { kind: 'text', key: 'title', label: 'To whom', required: true, placeholder: 'To Parents' },
      { kind: 'textarea', key: 'text', label: 'Promise', rows: 3 },
    ],
    newItem: () => ({ id: newId('promise'), title: '', text: '' }),
  },
];

// ----- Tabs -------------------------------------------------------------------

export const EDITOR_TABS: EditorTab[] = [
  {
    id: 'hero',
    group: 'home',
    label: 'Home banner',
    icon: Home,
    description: 'The large banner at the top of the home page.',
    sitePath: '#/',
    parts: [
      {
        key: 'hero',
        title: 'Banner',
        fields: [
          { kind: 'text', key: 'headingLine1', label: 'Heading, first line' },
          { kind: 'text', key: 'headingLine2', label: 'Heading, second line', help: 'Shown in gold.' },
          { kind: 'textarea', key: 'intro', label: 'Text under the heading', rows: 4 },
          { kind: 'text', key: 'buttonText', label: 'Button text', help: 'The button scrolls to the contact form.' },
          { kind: 'image', key: 'image', label: 'Background photo', help: 'A wide photo works best. It is darkened so the text stays readable.' },
        ],
      },
    ],
  },
  {
    id: 'about',
    group: 'home',
    label: 'About',
    icon: FileText,
    description: 'Background, mission and vision.',
    sitePath: '#/',
    parts: [
      {
        key: 'about',
        title: 'About section',
        fields: [
          ...headingFields(),
          { kind: 'text', key: 'backgroundTitle', label: 'Background heading' },
          { kind: 'textarea', key: 'background', label: 'Background', rows: 8, formatted: true },
          { kind: 'text', key: 'missionTitle', label: 'Mission heading' },
          { kind: 'textarea', key: 'mission', label: 'Mission', rows: 4, formatted: true },
          { kind: 'text', key: 'visionTitle', label: 'Vision heading' },
          { kind: 'textarea', key: 'vision', label: 'Vision', rows: 4, formatted: true },
        ],
      },
    ],
  },
  {
    id: 'programs',
    group: 'home',
    label: 'Programs',
    icon: BookOpen,
    description: 'The Overview tab, and one tab per program with all its sub-programs.',
    sitePath: '#/',
    parts: [
      {
        key: 'programs',
        title: 'Programs',
        description: 'Each program is one tab on the website, in this order. Click a program to edit everything in its tab, including its sub-programs.',
        list: {
          itemLabel: 'program',
          titleKey: 'title',
          subtitle: (p) => [p.tabLabel && `Tab: ${p.tabLabel}`, p.subtitle].filter(Boolean).join(', '),
          imageKey: 'image',
          fields: programFields,
          newItem: () => ({
            id: newId('program'),
            tabLabel: '',
            title: '',
            subtitle: '',
            icon: '',
            image: '',
            description: '',
            fullDescription: '',
            modules: [],
            goal: '',
            target: '',
            acronymTitle: '',
            acronym: [],
            subPrograms: [],
            promisesTitle: '',
            promises: [],
            stats: [],
            points: [],
          }),
        },
      },
      {
        key: 'programsSection',
        title: 'Section heading and Overview tab',
        description: 'The heading above the tabs, and everything in the Overview tab.',
        fields: [
          ...headingFields(),
          { kind: 'text', key: 'overviewTabLabel', label: 'Overview tab name', required: true },
          { kind: 'text', key: 'overviewTitle', label: 'Overview heading' },
          { kind: 'textarea', key: 'overviewIntro', label: 'Overview text', rows: 5, formatted: true },
          { kind: 'image', key: 'overviewImage', label: 'Overview photo', help: 'Shown on the right with a curved edge.' },
          { kind: 'text', key: 'overviewQuote', label: 'Quote over the photo', help: 'Leave empty to hide the gold quote.' },
          { ...statsField('Optional impact numbers, e.g. "1,500+ Young People Reached". Only add figures you can stand behind.'), key: 'overviewStats' } as Field,
          { ...pointsField('Up to 3 work best, e.g. Target Audience, Beneficiaries, Our Focus.'), key: 'overviewPoints' } as Field,
        ],
      },
    ],
  },
  {
    id: 'testimonials',
    group: 'home',
    label: 'Testimonials',
    icon: MessageSquare,
    description: 'Quotes from participants.',
    sitePath: '#/',
    parts: [
      {
        key: 'testimonials',
        title: 'Testimonials',
        list: {
          itemLabel: 'testimonial',
          titleKey: 'name',
          subtitle: (t) => t.role,
          imageKey: 'image',
          fields: [
            { kind: 'text', key: 'name', label: 'Name', required: true },
            { kind: 'text', key: 'role', label: 'School or role' },
            { kind: 'image', key: 'image', label: 'Photo', help: 'A portrait (taller than wide) photo of the person works best.' },
            { kind: 'textarea', key: 'quote', label: 'Quote', rows: 4, required: true, help: 'Two to four sentences read best on the card.' },
          ],
          newItem: () => ({ id: newId('testimonial'), name: '', role: '', image: '', quote: '', message: '', highlight: '' }),
        },
      },
      { key: 'testimonialsSection', title: 'Section heading', fields: headingFields({ intro: true }) },
    ],
  },
  {
    id: 'gallery',
    group: 'home',
    label: 'Gallery',
    icon: ImageIcon,
    description: 'Polaroid photos. The 10 newest show on the home page; all of them are on the gallery page.',
    sitePath: '#/gallery',
    parts: [
      {
        key: 'gallery',
        title: 'Photos',
        description: 'Newest photos show first. The 10 newest appear on the home page (6 on phones); the rest are on the "View all photos" page.',
        prepare: (photos) => sortPhotosNewestFirst(photos),
        list: {
          itemLabel: 'photo',
          titleKey: 'caption',
          subtitle: (g) => g.category,
          imageKey: 'url',
          addAtStart: true,
          autoOrdered: true,
          fields: [
            { kind: 'image', key: 'url', label: 'Photo', required: true },
            { kind: 'text', key: 'caption', label: 'Caption', help: 'Written in handwriting under the photo. Short is best, e.g. "Community in action."' },
            { kind: 'text', key: 'category', label: 'Category', help: 'Used for the filter buttons on the gallery page.' },
          ],
          newItem: () => ({ id: newId('photo'), url: '', caption: '', category: '', createdAt: Date.now() }),
        },
      },
      { key: 'gallerySection', title: 'Section heading', fields: headingFields({ intro: true }) },
    ],
  },
  {
    id: 'stories',
    group: 'home',
    label: 'News & stories',
    icon: Newspaper,
    description: 'The 4 newest show on the home page. All of them are on the Stories page.',
    sitePath: '#/stories',
    parts: [
      {
        key: 'blog',
        title: 'Stories',
        description: 'Stories are shown newest first, by their date. The 4 newest appear on the home page; the rest are on the "View more stories" page.',
        prepare: (posts) => sortStoriesNewestFirst(posts),
        list: {
          itemLabel: 'story',
          titleKey: 'title',
          subtitle: (s) => [s.date, s.category].filter(Boolean).join(', '),
          imageKey: 'image',
          addAtStart: true,
          autoOrdered: true,
          fields: [
            { kind: 'text', key: 'title', label: 'Title', required: true },
            { kind: 'date', key: 'date', label: 'Date', help: 'Stories are ordered by this date, newest first.' },
            { kind: 'text', key: 'category', label: 'Category', placeholder: 'e.g. Programs' },
            { kind: 'text', key: 'readTime', label: 'Reading time', placeholder: 'e.g. 3 min read' },
            { kind: 'text', key: 'author', label: 'Author' },
            { kind: 'image', key: 'image', label: 'Photo' },
            { kind: 'textarea', key: 'excerpt', label: 'Short summary', rows: 3, help: 'Shown on the story card.' },
            { kind: 'textarea', key: 'content', label: 'Full story', rows: 12, formatted: true },
          ],
          newItem: () => ({
            id: newId('story'),
            title: '',
            date: today(),
            createdAt: Date.now(),
            category: '',
            readTime: '',
            author: 'EYF Team',
            image: '',
            excerpt: '',
            content: '',
          }),
        },
      },
      { key: 'blogSection', title: 'Section heading', fields: headingFields({ intro: true }) },
    ],
  },
  {
    id: 'reports',
    group: 'pages',
    label: 'Reports',
    icon: ReportIcon,
    description: 'Upload annual, financial and program reports (PDF or Word) for the Reports page.',
    sitePath: '#/reports',
    parts: [
      {
        key: 'reports',
        title: 'Reports',
        description: 'Reports are listed newest first, by their publication date. Visitors can search, filter, preview and download them.',
        prepare: (reports) => sortStoriesNewestFirst(reports),
        list: {
          itemLabel: 'report',
          titleKey: 'title',
          subtitle: (r) => [r.date, r.category, r.file?.name].filter(Boolean).join(', '),
          imageKey: 'cover',
          addAtStart: true,
          autoOrdered: true,
          fields: [
            { kind: 'document', key: 'file', label: 'Report file (PDF or Word)', required: true },
            { kind: 'text', key: 'title', label: 'Title', required: true, placeholder: 'e.g. Annual Report 2025' },
            { kind: 'date', key: 'date', label: 'Publication date', help: 'Used for sorting and the year filter.' },
            {
              kind: 'text',
              key: 'category',
              label: 'Category',
              suggestions: ['Annual Report', 'Financial Report', 'Program Report', 'Impact Report', 'Newsletter', 'Policy'],
              help: 'Pick a suggestion or type your own. Categories become filter buttons on the Reports page.',
            },
            { kind: 'textarea', key: 'summary', label: 'Short summary', rows: 3, help: 'One or two sentences about what the report covers.' },
            { kind: 'image', key: 'cover', label: 'Cover image (optional)', help: 'e.g. the report\'s front page. Without one, a styled document cover is shown.' },
            { kind: 'toggle', key: 'featured', label: 'Feature this report', onLabel: 'Show it large at the top of the Reports page' },
          ],
          newItem: () => ({
            id: newId('report'),
            title: '',
            summary: '',
            category: '',
            date: today(),
            featured: false,
            cover: '',
            file: null,
            createdAt: Date.now(),
          }),
        },
      },
      { key: 'reportsSection', title: 'Page heading', fields: headingFields({ intro: true }) },
    ],
  },
  {
    id: 'team',
    group: 'home',
    label: 'Team',
    icon: Users,
    description: 'Team members and their photos.',
    sitePath: '#/',
    parts: [
      {
        key: 'team',
        title: 'Team members',
        list: {
          itemLabel: 'team member',
          titleKey: 'name',
          subtitle: (m) => m.role,
          imageKey: 'image',
          fields: [
            { kind: 'text', key: 'name', label: 'Name', required: true },
            { kind: 'text', key: 'role', label: 'Role' },
            { kind: 'image', key: 'image', label: 'Photo', help: 'A tall (portrait) photo works best.' },
          ],
          newItem: () => ({ id: newId('member'), name: '', role: '', image: '' }),
        },
      },
      { key: 'teamSection', title: 'Section heading', fields: headingFields({ label: false }) },
    ],
  },
  {
    id: 'contact',
    group: 'home',
    label: 'Contact & footer',
    icon: Phone,
    description: 'Phone numbers, email, address, map and social links.',
    sitePath: '#/',
    parts: [
      {
        key: 'contact',
        title: 'Contact details',
        description: 'Used in the contact section, the footer, and as the address contact-form messages are sent to.',
        fields: [
          ...headingFields({ intro: true }),
          { kind: 'text', key: 'connectTitle', label: 'Heading beside the form' },
          { kind: 'textarea', key: 'connectText', label: 'Text beside the form', rows: 3 },
          { kind: 'strings', key: 'phones', label: 'Phone numbers', itemLabel: 'phone number' },
          { kind: 'text', key: 'email', label: 'Email address', required: true },
          { kind: 'text', key: 'addressLine', label: 'Address' },
          { kind: 'text', key: 'addressDetail', label: 'Address, second line', placeholder: 'P.O. Box …' },
          { kind: 'link', key: 'mapLink', label: 'Google Maps link', help: 'Opens when someone clicks the address.' },
          {
            kind: 'textarea',
            key: 'mapEmbed',
            label: 'Map on the page',
            rows: 3,
            help: 'In Google Maps: Share, then "Embed a map", then "Copy HTML". Paste it here. Leave empty to hide the map.',
          },
        ],
      },
      {
        key: 'footer',
        title: 'Footer',
        fields: [
          { kind: 'textarea', key: 'tagline', label: 'Text under the logo', rows: 2 },
          { kind: 'link', key: 'youtube', label: 'YouTube link', help: 'Leave a link empty to hide that icon.' },
          { kind: 'link', key: 'instagram', label: 'Instagram link' },
          { kind: 'link', key: 'x', label: 'X (Twitter) link' },
          { kind: 'link', key: 'linkedin', label: 'LinkedIn link' },
          { kind: 'link', key: 'tiktok', label: 'TikTok link' },
          { kind: 'text', key: 'madeWith', label: 'Bottom line', help: 'Shown after "Made with ♥".' },
        ],
      },
    ],
  },
  {
    id: 'faq',
    group: 'pages',
    label: 'FAQ',
    icon: HelpCircle,
    description: 'Questions and answers on the FAQ page.',
    sitePath: '#/faq',
    parts: [
      {
        key: 'faq',
        title: 'FAQ page',
        fields: [
          { kind: 'text', key: 'title', label: 'Page title' },
          { kind: 'text', key: 'intro', label: 'Text under the title' },
          {
            kind: 'list',
            key: 'categories',
            label: 'Question groups',
            itemLabel: 'group',
            titleKey: 'name',
            subtitle: (c) => `${(c.questions || []).length} questions`,
            fields: [
              { kind: 'text', key: 'name', label: 'Group name', required: true },
              {
                kind: 'list',
                key: 'questions',
                label: 'Questions',
                itemLabel: 'question',
                titleKey: 'question',
                fields: [
                  { kind: 'text', key: 'question', label: 'Question', required: true },
                  { kind: 'textarea', key: 'answer', label: 'Answer', rows: 4, formatted: true },
                ],
                newItem: () => ({ id: newId('faq'), question: '', answer: '' }),
              },
            ],
            newItem: () => ({ id: newId('faq-cat'), name: '', questions: [] }),
          },
          { kind: 'text', key: 'ctaTitle', label: 'Bottom box heading' },
          { kind: 'textarea', key: 'ctaText', label: 'Bottom box text', rows: 2 },
        ],
      },
    ],
  },
  legalTab('privacy', 'Privacy policy', Shield, '#/privacy-policy'),
  legalTab('terms', 'Terms & conditions', Scale, '#/terms-conditions'),
];

function legalTab(key: 'privacy' | 'terms', label: string, icon: LucideIcon, sitePath: string): EditorTab {
  return {
    id: key,
    group: 'pages',
    label,
    icon,
    description: `The ${label.toLowerCase()} page.`,
    sitePath,
    parts: [
      {
        key,
        title: label,
        fields: [
          { kind: 'text', key: 'title', label: 'Page title' },
          { kind: 'text', key: 'lastUpdated', label: 'Last updated', help: 'Update this whenever you change the text.' },
          {
            kind: 'list',
            key: 'sections',
            label: 'Sections',
            itemLabel: 'section',
            titleKey: 'heading',
            fields: [
              { kind: 'text', key: 'heading', label: 'Heading', required: true },
              { kind: 'textarea', key: 'body', label: 'Text', rows: 8, formatted: true },
            ],
            newItem: () => ({ id: newId('legal'), heading: '', body: '' }),
          },
        ],
      },
    ],
  };
}

export const OVERVIEW_TAB = { id: 'overview', label: 'Overview', icon: LayoutDashboard };
export { FORMAT_HELP };
