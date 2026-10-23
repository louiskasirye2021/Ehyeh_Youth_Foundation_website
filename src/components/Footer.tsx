import { Heart, Youtube, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';
import { useSiteContent } from '../content/store';
import { safeHref } from './RichText';

// TikTok SVG Icon Component
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

const socialLinks = [
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'x', label: 'X (Twitter)', Icon: Twitter },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
];

export function Footer() {
  const { footer, contact } = useSiteContent().content;
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // On another page (e.g. Stories): go home first, then scroll.
    window.location.hash = '/';
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const navigateToPage = (page: string) => {
    window.location.hash = page;
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <AbstractShapes />
      
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 right-10 w-64 h-64 border-2 border-[#C39223] rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-48 h-48 border-2 border-[#C39223] transform rotate-45"></div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src={logo} 
                alt="Ehyeh Youth Foundation" 
                className="h-20 w-auto md:h-24"
              />
            </div>
            {footer.tagline && (
              <p className="text-gray-400 leading-relaxed mb-6">{footer.tagline}</p>
            )}
            {/* Social Media */}
            <div className="flex gap-3">
              {socialLinks.map(({ key, label, Icon }) => {
                const href = safeHref((footer as any)[key]);
                if (!href) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-6 text-[#C39223]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Our Programs
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('/gallery')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('/stories')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  News & Stories
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('/reports')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg mb-6 text-[#C39223]">Get Involved</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Volunteer Signup
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Donate Now
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Partner With Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('/faq')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-6 text-[#C39223]">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#C39223] mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  {contact.phones.map((phone, i) => (
                    <p key={i}>{phone}</p>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#C39223] mt-1 flex-shrink-0" />
                <div className="text-gray-400 break-all">
                  <p>{contact.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex-shrink-0 mt-1">
                  <svg className="text-[#C39223]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-gray-400">
                  <p>{contact.addressLine}</p>
                  {contact.addressDetail && <p className="text-sm">{contact.addressDetail}</p>}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} Ehyeh Youth Foundation. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <button onClick={() => navigateToPage('/privacy-policy')} className="text-gray-400 hover:text-[#C39223] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateToPage('/terms-conditions')} className="text-gray-400 hover:text-[#C39223] transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => navigateToPage('/admin')} className="text-gray-400 hover:text-[#C39223] transition-colors">
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Gold Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C39223] to-transparent"></div>

      {/* Made with Love */}
      <div className="bg-gradient-to-r from-[#C39223] to-[#b08520] py-3">
        <p className="text-center text-white text-sm flex items-center justify-center gap-2">
          Made with <Heart size={16} className="fill-current" /> {footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
