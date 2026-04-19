import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner@2.0.3';
import {
  getPrograms,
  saveProgram,
  deleteProgram
} from '../../utils/adminStorage';

export function ProgramsManagement() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    icon: '',
    image: ''
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const data = getPrograms();
    setPrograms(data);
  };

  const handleSave = () => {
    const program = {
      id: formData.id || Date.now().toString(),
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      icon: formData.icon,
      image: formData.image
    };

    saveProgram(program);
    loadPrograms();
    setEditingId(null);
    setFormData({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      icon: '',
      image: ''
    });
    toast.success('Program saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    deleteProgram(id);
    loadPrograms();
    toast.success('Program deleted successfully!');
  };

  const startEdit = (program?: any) => {
    if (program) {
      setEditingId(program.id);
      setFormData({
        id: program.id,
        title: program.title,
        subtitle: program.subtitle,
        description: program.description,
        icon: program.icon,
        image: program.image
      });
    } else {
      setEditingId(Date.now().toString());
      setFormData({
        id: '',
        title: '',
        subtitle: '',
        description: '',
        icon: '',
        image: ''
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, (dataUrl) => {
        setFormData({ ...formData, image: dataUrl });
      });
    }
  };

  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-black">Programs Management</h1>
        <button
          onClick={() => startEdit()}
          className="bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Program</span>
        </button>
      </div>

      {/* Info Alert */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm text-blue-900 mb-1">View All Hardcoded Program Details</h4>
            <p className="text-xs text-blue-700">
              Click the expand arrow (▼) on each program card to view all hardcoded details including full descriptions, modules, sub-programs, objectives, weekly modules, core pillars, outcomes, and promises.
            </p>
          </div>
        </div>
      </div>

      {/* Programs List */}
      {!editingId && (
        <div className="space-y-6">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Program Header */}
              <div className="bg-gradient-to-r from-[#C39223]/10 to-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-5xl">{program.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl text-black mb-1">{program.title}</h3>
                      <p className="text-[#C39223] text-sm">{program.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleExpand(program.id)}
                      className="p-2 hover:bg-white/70 rounded-lg transition-colors"
                      title={expandedId === program.id ? "Collapse details" : "Expand details"}
                    >
                      {expandedId === program.id ? (
                        <ChevronUp size={20} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => startEdit(program)}
                      className="p-2 hover:bg-white/70 rounded-lg transition-colors"
                      title="Edit basic info"
                    >
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete program"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{program.description}</p>
              </div>

              {/* Expanded Details */}
              {expandedId === program.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-6 space-y-6 bg-gray-50">
                    {/* Full Description */}
                    {program.fullDescription && (
                      <div>
                        <h4 className="text-sm uppercase text-[#C39223] mb-2">Full Description</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{program.fullDescription}</p>
                      </div>
                    )}

                    {/* Modules */}
                    {program.modules && program.modules.length > 0 && (
                      <div>
                        <h4 className="text-sm uppercase text-[#C39223] mb-3">Key Modules ({program.modules.length})</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {program.modules.map((module: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                              <span className="text-[#C39223] mt-1">•</span>
                              <span className="text-gray-700 text-sm">{module}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Target & Goal */}
                    {(program.target || program.goal) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {program.target && (
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="text-sm uppercase text-[#C39223] mb-2">Target Audience</h4>
                            <p className="text-gray-700 text-sm">{program.target}</p>
                          </div>
                        )}
                        {program.goal && (
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="text-sm uppercase text-[#C39223] mb-2">Program Goal</h4>
                            <p className="text-gray-700 text-sm">{program.goal}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* F.R.E.E.D Acronym */}
                    {program.acronym && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="text-sm uppercase text-[#C39223] mb-3">F.R.E.E.D Meaning</h4>
                        <div className="grid grid-cols-5 gap-2">
                          {Object.entries(program.acronym).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="w-12 h-12 bg-[#C39223] text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg">
                                {key === 'E2' ? 'E' : key}
                              </div>
                              <p className="text-xs text-gray-700">{value as string}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Promises */}
                    {program.promises && (
                      <div>
                        <h4 className="text-sm uppercase text-[#C39223] mb-3">Our Promises</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="text-black mb-2">To Parents</h5>
                            <p className="text-gray-700 text-sm">{program.promises.toParents}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="text-black mb-2">To Mentees</h5>
                            <p className="text-gray-700 text-sm">{program.promises.toMentees}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="text-black mb-2">To Community</h5>
                            <p className="text-gray-700 text-sm">{program.promises.toCommunity}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sub-Programs */}
                    {program.subPrograms && program.subPrograms.length > 0 && (
                      <div>
                        <h4 className="text-sm uppercase text-[#C39223] mb-4">Sub-Programs ({program.subPrograms.length})</h4>
                        <div className="space-y-4">
                          {program.subPrograms.map((sub: any, idx: number) => (
                            <div key={idx} className="bg-white p-5 rounded-xl border-l-4 border-[#C39223]">
                              <h5 className="text-black text-lg mb-2">{sub.name}</h5>
                              <p className="text-gray-600 text-sm mb-3">{sub.desc}</p>
                              
                              {/* Sub-program details table */}
                              <div className="grid md:grid-cols-2 gap-3 mb-4">
                                {sub.duration && (
                                  <div className="text-sm">
                                    <span className="text-gray-500">Duration:</span>
                                    <span className="text-gray-700 ml-2">{sub.duration}</span>
                                  </div>
                                )}
                                {sub.format && (
                                  <div className="text-sm">
                                    <span className="text-gray-500">Format:</span>
                                    <span className="text-gray-700 ml-2">{sub.format}</span>
                                  </div>
                                )}
                                {sub.groupSize && (
                                  <div className="text-sm">
                                    <span className="text-gray-500">Group Size:</span>
                                    <span className="text-gray-700 ml-2">{sub.groupSize}</span>
                                  </div>
                                )}
                                {sub.ageRange && (
                                  <div className="text-sm">
                                    <span className="text-gray-500">Age Range:</span>
                                    <span className="text-gray-700 ml-2">{sub.ageRange}</span>
                                  </div>
                                )}
                              </div>

                              {/* Objectives */}
                              {sub.objectives && sub.objectives.length > 0 && (
                                <div className="mb-3">
                                  <h6 className="text-gray-700 text-sm mb-2">Objectives:</h6>
                                  <ul className="space-y-1">
                                    {sub.objectives.map((obj: string, i: number) => (
                                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-[#C39223] mt-0.5">•</span>
                                        <span>{obj}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Weekly Modules */}
                              {sub.weeklyModules && sub.weeklyModules.length > 0 && (
                                <div className="mb-3">
                                  <h6 className="text-gray-700 text-sm mb-2">Weekly Modules:</h6>
                                  <div className="grid gap-1">
                                    {sub.weeklyModules.map((wm: string, i: number) => (
                                      <div key={i} className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                                        {wm}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Core Pillars (for STI) */}
                              {sub.corePillars && sub.corePillars.length > 0 && (
                                <div className="mb-3">
                                  <h6 className="text-gray-700 text-sm mb-2">Core Pillars:</h6>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    {sub.corePillars.map((pillar: any, i: number) => (
                                      <div key={i} className="bg-gray-50 p-3 rounded">
                                        <p className="text-black text-xs mb-2">{pillar.title}</p>
                                        <ul className="space-y-1">
                                          {pillar.elements.map((elem: string, j: number) => (
                                            <li key={j} className="text-xs text-gray-600 flex items-start gap-1">
                                              <span className="text-[#C39223]">•</span>
                                              <span>{elem}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Outcomes */}
                              {sub.outcomes && sub.outcomes.length > 0 && (
                                <div>
                                  <h6 className="text-gray-700 text-sm mb-2">Expected Outcomes:</h6>
                                  <ul className="space-y-1">
                                    {sub.outcomes.map((outcome: string, i: number) => (
                                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-[#C39223] mt-0.5">•</span>
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {editingId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-black">
              {editingId.length > 10 ? 'Edit Program' : 'Add New Program'}
            </h2>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({
                  id: '',
                  title: '',
                  subtitle: '',
                  description: '',
                  icon: '',
                  image: ''
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="📚"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Program Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#C39223] file:text-white hover:file:bg-[#b08520] file:cursor-pointer"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Upload an image (max 5MB). Supports JPG, PNG, WebP.</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="Program Title"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="Program Subtitle"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Short Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none resize-none"
                rows={3}
                placeholder="Brief description..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleSave()}
                className="flex-1 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                <span>Save Program</span>
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    id: '',
                    title: '',
                    subtitle: '',
                    description: '',
                    icon: '',
                    image: ''
                  });
                }}
                className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
