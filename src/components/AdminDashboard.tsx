import { useCallback, useState } from 'react';
import { LogOut, Menu, X, UploadCloud, Info, ArrowLeft } from 'lucide-react';
import { findLegacyEdits, publishLegacyEdits, clearLegacyEdits } from '../utils/legacyImport';
import { toast } from 'sonner@2.0.3';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';
import { EDITOR_TABS, OVERVIEW_TAB } from '../admin/schema';
import { SectionEditor } from '../admin/SectionEditor';

interface AdminDashboardProps {
  onLogout: () => void;
}

const GROUPS = [
  { id: 'home', label: 'Home page' },
  { id: 'pages', label: 'Other pages' },
] as const;

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeId, setActiveId] = useState<string>(OVERVIEW_TAB.id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [legacyEdits, setLegacyEdits] = useState(() => findLegacyEdits());
  const [publishing, setPublishing] = useState(false);
  const legacySections = Object.keys(legacyEdits);
  const activeTab = EDITOR_TABS.find((t) => t.id === activeId);
  const onDirtyChange = useCallback((value: boolean) => setDirty(value), []);

  /** Ask before leaving a section with unsaved changes. */
  const confirmLeave = () =>
    !dirty || window.confirm('You have unsaved changes in this section. Leave without saving?');

  const goTo = (id: string) => {
    if (id === activeId) return setSidebarOpen(false);
    if (!confirmLeave()) return;
    setDirty(false);
    setActiveId(id);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const handlePublishLegacy = async () => {
    if (!window.confirm('This replaces the live content of these sections with the edits saved in this browser: ' + legacySections.join(', ') + '. Continue?')) return;
    setPublishing(true);
    const toastId = toast.loading('Publishing edits from this browser…');
    try {
      await publishLegacyEdits(legacyEdits);
      setLegacyEdits({});
      toast.success('Edits published. They are now live for every visitor.', { id: toastId });
    } catch (err: any) {
      toast.error(err?.message || 'Publishing failed. Try again.', { id: toastId });
    } finally {
      setPublishing(false);
    }
  };

  const handleDiscardLegacy = () => {
    if (!window.confirm('Discard the unpublished edits saved in this browser? This cannot be undone.')) return;
    clearLegacyEdits();
    setLegacyEdits({});
  };

  const navButton = (id: string, label: string, Icon: any) => {
    const isActive = activeId === id;
    return (
      <button
        key={id}
        onClick={() => goTo(id)}
        aria-current={isActive ? 'page' : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
          isActive ? 'bg-[#C39223] text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon size={18} className="flex-shrink-0" />
        <span className="text-sm">{label}</span>
      </button>
    );
  };

  const overview = (
    <div className="max-w-5xl">
      <h1 className="text-3xl text-black mb-2">Edit the website</h1>
      <p className="text-gray-600 mb-8">
        Everything on the website can be changed here. Pick a section, make your changes, then click
        <strong className="font-medium text-black"> Save changes</strong>. They go live for every visitor straight away.
      </p>

      {legacySections.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#C39223] rounded-xl flex items-center justify-center flex-shrink-0">
              <Info size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-black mb-2">Unpublished edits found in this browser</h3>
              <p className="text-gray-700 mb-4">
                Earlier versions of this admin panel saved changes only on the computer they were made on,
                so visitors never saw them. This browser has saved edits for: {legacySections.join(', ')}.
                Publish them to make them live, or discard them.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePublishLegacy}
                  disabled={publishing}
                  className="flex items-center gap-2 px-6 py-3 bg-[#C39223] text-white rounded-full hover:bg-[#b08520] transition-colors disabled:opacity-50"
                >
                  <UploadCloud size={18} />
                  {publishing ? 'Publishing…' : 'Publish these edits'}
                </button>
                <button
                  onClick={handleDiscardLegacy}
                  disabled={publishing}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {GROUPS.map((group) => (
        <div key={group.id} className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-3">{group.label}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EDITOR_TABS.filter((t) => t.group === group.id).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => goTo(tab.id)}
                  className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#C39223] hover:shadow-md transition-all text-left flex flex-col items-start justify-start h-full"
                >
                  <div className="w-10 h-10 bg-[#C39223]/10 text-[#8a6614] rounded-lg flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg text-black">{tab.label}</h3>
                  <p className="text-gray-600 text-sm mt-1">{tab.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <img src={logo} alt="Ehyeh Youth Foundation" className="h-12 w-auto" />
              <p className="text-xs text-gray-500 mt-1">Admin</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-600 hover:text-black" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-3 overflow-y-auto" aria-label="Sections">
            {navButton(OVERVIEW_TAB.id, OVERVIEW_TAB.label, OVERVIEW_TAB.icon)}
            {GROUPS.map((group) => (
              <div key={group.id} className="mt-5">
                <p className="px-3 mb-1 text-xs font-medium text-gray-400">{group.label}</p>
                <div className="space-y-0.5">
                  {EDITOR_TABS.filter((t) => t.group === group.id).map((t) => navButton(t.id, t.label, t.icon))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => confirmLeave() && onLogout()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-700 hover:bg-red-50"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen lg:ml-64">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-black" aria-label="Open menu">
            <Menu size={24} />
          </button>
          <button
            onClick={() => {
              if (confirmLeave()) window.location.hash = '/';
            }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#8a6614] ml-auto"
          >
            <ArrowLeft size={16} />
            Back to website
          </button>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          {activeTab ? <SectionEditor key={activeTab.id} tab={activeTab} onDirtyChange={onDirtyChange} /> : overview}
        </div>
      </main>
    </div>
  );
}
