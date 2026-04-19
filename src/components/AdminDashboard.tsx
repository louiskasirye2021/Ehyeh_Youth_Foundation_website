import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  BookOpen, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  RefreshCw,
  Info
} from 'lucide-react';
import { ProgramsManagement } from './admin/ProgramsManagement';
import { GalleryManagement } from './admin/GalleryManagement';
import { TeamManagement } from './admin/TeamManagement';
import { BlogManagement } from './admin/BlogManagement';
import { TestimonialsManagement } from './admin/TestimonialsManagement';
import { AboutManagement } from './admin/AboutManagement';
import { forceReInitializeAdminData } from '../utils/adminStorage';
import { toast } from 'sonner@2.0.3';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Section = 'overview' | 'programs' | 'gallery' | 'team' | 'blog' | 'testimonials' | 'about';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'about' as Section, label: 'About Section', icon: FileText },
    { id: 'programs' as Section, label: 'Programs', icon: BookOpen },
    { id: 'gallery' as Section, label: 'Gallery', icon: ImageIcon },
    { id: 'team' as Section, label: 'Team', icon: Users },
    { id: 'blog' as Section, label: 'News & Stories', icon: BookOpen },
    { id: 'testimonials' as Section, label: 'Testimonials', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <h1 className="text-3xl text-black mb-6">Dashboard Overview</h1>
            
            {/* Fix Images Alert Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-2">Image Management</h3>
                  <p className="text-gray-700 mb-4">
                    If you're experiencing issues with images not loading correctly (blank images, broken links, or corrupted uploads), 
                    click the button below to restore all original authentic EYF images across the entire website.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('This will restore all original images across Programs, Gallery, Blog, Testimonials, and Team sections. Any custom uploaded images will be replaced. Continue?')) {
                        console.log('🔧 Manual image fix triggered...');
                        sessionStorage.removeItem('eyf_data_validated');
                        forceReInitializeAdminData();
                        toast.success('All images restored! Reloading page...');
                        setTimeout(() => {
                          window.location.reload();
                        }, 800);
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw size={18} />
                    Fix All Images Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.slice(1).map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-left"
                  >
                    <div className="w-12 h-12 bg-[#C39223] rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl text-black mb-2">{item.label}</h3>
                    <p className="text-gray-600 text-sm">Manage {item.label.toLowerCase()}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      case 'programs':
        return <ProgramsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'team':
        return <TeamManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'testimonials':
        return <TestimonialsManagement />;
      case 'about':
        return <AboutManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <img src={logo} alt="EYF" className="h-12 w-auto" />
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Admin Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all
                    ${isActive 
                      ? 'bg-[#C39223] text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-black"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.hash = '/'}
                className="text-sm text-gray-600 hover:text-[#C39223] transition-colors"
              >
                ← Back to Website
              </button>
              <button
                onClick={() => {
                  if (window.confirm('This will reload the original website data and fix any broken image links. Are you sure?')) {
                    // Clear session validation flag to force re-validation
                    sessionStorage.removeItem('eyf_data_validated');
                    forceReInitializeAdminData();
                    toast.success('Data reset successfully! Reloading page...');
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <RefreshCw size={16} />
                Reset to Original Data
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}