import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw } from 'lucide-react';
import { getAboutInfo, saveAboutInfo } from '../../utils/adminStorage';
import { toast } from 'sonner@2.0.3';

export function AboutManagement() {
  const [aboutInfo, setAboutInfo] = useState({
    mission: '',
    vision: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAboutInfo();
  }, []);

  const loadAboutInfo = () => {
    const data = getAboutInfo();
    if (data && (data.mission || data.vision)) {
      setAboutInfo(data);
    }
  };

  const handleSave = () => {
    setLoading(true);
    try {
      saveAboutInfo(aboutInfo);
      toast.success('About information updated successfully!');
    } catch (error) {
      toast.error('Failed to update about information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black">About Section Management</h1>
        <button
          onClick={loadAboutInfo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg space-y-6"
      >
        {/* Mission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mission Statement
          </label>
          <textarea
            value={aboutInfo.mission}
            onChange={(e) => setAboutInfo({ ...aboutInfo, mission: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors resize-none"
            placeholder="Enter your mission statement..."
          />
        </div>

        {/* Vision */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vision Statement
          </label>
          <textarea
            value={aboutInfo.vision}
            onChange={(e) => setAboutInfo({ ...aboutInfo, vision: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors resize-none"
            placeholder="Enter your vision statement..."
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </motion.div>

      {/* Preview Section */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
        <h2 className="text-xl text-black font-semibold">Preview</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission Preview */}
          <div className="bg-black text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-10 h-10 bg-[#C39223] rounded-lg flex items-center justify-center text-sm">M</span>
              Mission
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {aboutInfo.mission || 'Your mission statement will appear here...'}
            </p>
          </div>

          {/* Vision Preview */}
          <div className="bg-[#C39223] text-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-sm text-[#C39223]">V</span>
              Vision
            </h3>
            <p className="text-white/95 text-sm leading-relaxed">
              {aboutInfo.vision || 'Your vision statement will appear here...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
