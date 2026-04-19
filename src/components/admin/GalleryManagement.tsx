import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner@2.0.3';
import {
  getGalleryImages,
  saveGalleryImage,
  deleteGalleryImage
} from '../../utils/adminStorage';
import { handleFileUpload } from '../../utils/imageUpload';

export function GalleryManagement() {
  const [images, setImages] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    caption: '',
    category: ''
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const data = getGalleryImages();
    setImages(data);
  };

  const handleSave = () => {
    if (!formData.url) {
      toast.error('Please upload an image');
      return;
    }

    const image = {
      id: Date.now().toString(),
      url: formData.url,
      caption: formData.caption,
      category: formData.category
    };

    saveGalleryImage(image);
    loadImages();
    setShowAddForm(false);
    resetForm();
    toast.success('Image added successfully!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    deleteGalleryImage(id);
    loadImages();
    toast.success('Image deleted successfully!');
  };

  const resetForm = () => {
    setFormData({
      url: '',
      caption: '',
      category: ''
    });
  };

  if (images.length === 0 && !showAddForm) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl text-black mb-6">Gallery Management</h1>

      {/* Add Image Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-xl text-black mb-4">Add New Image</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Upload Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file, (dataUrl) => {
                      setFormData({ ...formData, url: dataUrl });
                    });
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#C39223] file:text-white hover:file:bg-[#b08520] file:cursor-pointer"
              />
              {formData.url && (
                <div className="mt-3">
                  <img
                    src={formData.url}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Upload an image (max 5MB). Supports JPG, PNG, WebP.</p>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Caption</label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="Image caption"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
              >
                <option value="">Select category</option>
                <option value="LMP">LMP</option>
                <option value="Outreach Programs">Outreach Programs</option>
                <option value="Community Events">Community Events</option>
                <option value="Team">Team</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span>Add Image</span>
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                resetForm();
              }}
              className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Image Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </button>
      )}

      {/* Images Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg group"
          >
            <div className="relative aspect-video bg-gray-200">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-800">{image.caption || 'No caption'}</p>
              {image.category && (
                <span className="inline-block mt-2 px-3 py-1 bg-[#C39223]/10 text-[#C39223] text-xs rounded-full">
                  {image.category}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && !showAddForm && (
        <div className="text-center py-12 text-gray-500">
          <Upload size={48} className="mx-auto mb-4 opacity-50" />
          <p>No images yet. Add your first image above.</p>
        </div>
      )}
    </div>
  );
}
