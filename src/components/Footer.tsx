import { Heart, Youtube, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';

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

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering the youth, transforming tomorrow. Together, we shape a generation that leads with purpose.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="https://www.youtube.com/channel/UCew3S6TrCXtD8iSZewX-ejQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors">
                <Youtube size={18} />
              </a>
              <a href="https://www.instagram.com/ehyeh_youth_foundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://x.com/EyfLegacies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/ehyeh-youth-foundation-aa4771404" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://www.tiktok.com/@ehyehyouthfoundation?lang=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#C39223] transition-colors">
                <TikTokIcon size={18} />
              </a>
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
                <button onClick={() => scrollToSection('gallery')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  News & Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg mb-6 text-[#C39223]">Get Involved</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('registration')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Volunteer Signup
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#C39223] transition-colors">
                  Donate Now
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('registration')} className="text-gray-400 hover:text-[#C39223] transition-colors">
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
                  <p>+256 755 992 026</p>
                  <p>+256 788 268 464</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#C39223] mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>eyf.legacies@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 flex-shrink-0 mt-1">
                  <svg className="text-[#C39223]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-gray-400">
                  <p>Lourdel Towers, Kampala</p>
                  <p className="text-sm">P.O. Box 127928</p>
                  <p className="text-sm">Kampala, Uganda</p>
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
          Made with <Heart size={16} className="fill-current" /> for Uganda's Youth
        </p>
      </div>
    </footer>
  );
}