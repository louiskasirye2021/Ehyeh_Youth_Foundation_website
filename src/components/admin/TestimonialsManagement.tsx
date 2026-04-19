import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner@2.0.3';
import {
  getTestimonials,
  saveTestimonial,
  deleteTestimonial
} from '../../utils/adminStorage';
import { handleFileUpload } from '../../utils/imageUpload';

export function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    quote: '',
    highlight: '',
    message: '',
    image: ''
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    const data = getTestimonials();
    setTestimonials(data);
  };

  const handleSave = () => {
    const testimonial = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      role: formData.role,
      quote: formData.quote,
      highlight: formData.highlight,
      message: formData.message,
      image: formData.image
    };

    saveTestimonial(testimonial);
    loadTestimonials();
    setEditingId(null);
    resetForm();
    toast.success('Testimonial saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    deleteTestimonial(id);
    loadTestimonials();
    toast.success('Testimonial deleted successfully!');
  };

  const startEdit = (testimonial?: any) => {
    if (testimonial) {
      setFormData(testimonial);
      setEditingId(testimonial.id);
    } else {
      setFormData({
        id: '',
        name: '',
        role: '',
        quote: '',
        highlight: '',
        message: '',
        image: ''
      });
      setEditingId(Date.now().toString());
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      role: '',
      quote: '',
      highlight: '',
      message: '',
      image: ''
    });
  };

  if (testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-black">Testimonials Management</h1>
        <button
          onClick={() => startEdit()}
          className="bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      {!editingId && (
        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#C39223]/10 to-white p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                    <img
                      src={testimonial.image || 'https://via.placeholder.com/100'}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl text-black mb-1">{testimonial.name}</h3>
                    <p className="text-[#C39223] text-sm">{testimonial.role}</p>
                    {testimonial.highlight && (
                      <span className="inline-block bg-[#C39223]/20 text-[#C39223] px-3 py-1 rounded-full text-xs mt-2">
                        ✨ {testimonial.highlight}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(testimonial)}
                      className="p-2 hover:bg-white/70 rounded-lg transition-colors"
                      title="Edit testimonial"
                    >
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete testimonial"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <h4 className="text-sm uppercase text-[#C39223] mb-2">Main Quote</h4>
                  <p className="text-gray-700 text-sm italic">"{testimonial.quote}"</p>
                </div>

                {testimonial.message && (
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-sm uppercase text-[#C39223] mb-2">Additional Message</h4>
                    <p className="text-gray-700 text-sm">{testimonial.message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {editingId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-black">
              {editingId.length > 10 ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button
              onClick={() => {
                setEditingId(null);
                resetForm();
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Role/School *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                  placeholder="e.g., Makerere College School"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file, (dataUrl) => {
                      setFormData({ ...formData, image: dataUrl });
                    });
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#C39223] file:text-white hover:file:bg-[#b08520] file:cursor-pointer"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Upload a photo (max 5MB). Supports JPG, PNG, WebP.</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Main Quote *</label>
              <textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none resize-none"
                rows={4}
                placeholder="Main testimonial quote..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Highlight (Short phrase)</label>
              <input
                type="text"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="e.g., Making good decisions"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Additional Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none resize-none"
                rows={3}
                placeholder="Additional message or call to action..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                <span>Save Testimonial</span>
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  resetForm();
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
