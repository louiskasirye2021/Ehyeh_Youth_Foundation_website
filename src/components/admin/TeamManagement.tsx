import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  getTeamMembers,
  saveTeamMember,
  deleteTeamMember
} from '../../utils/adminStorage';
import { handleFileUpload } from '../../utils/imageUpload';

export function TeamManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    image: ''
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    const data = getTeamMembers();
    setMembers(data);
  };

  const handleSave = () => {
    const member = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      role: formData.role,
      image: formData.image
    };

    saveTeamMember(member);
    loadMembers();
    setEditingId(null);
    resetForm();
    toast.success('Team member saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    deleteTeamMember(id);
    loadMembers();
    toast.success('Team member deleted successfully!');
  };

  const startEdit = (member?: any) => {
    if (member) {
      setFormData({
        id: member.id,
        name: member.name,
        role: member.role,
        image: member.image
      });
      setEditingId(member.id);
    } else {
      resetForm();
      setEditingId(Date.now().toString());
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      role: '',
      image: ''
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-black">Team Management</h1>
        <button
          onClick={() => startEdit()}
          className="bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Team Members List */}
      {!editingId && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="aspect-square bg-gray-200 relative">
                <img
                  src={member.image || 'https://via.placeholder.com/400'}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => startEdit(member)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit size={18} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl text-black mb-1">{member.name}</h3>
                <p className="text-[#C39223] text-sm mb-3">{member.role}</p>
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
              {editingId.length > 10 ? 'Edit Team Member' : 'Add New Team Member'}
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
            <div>
              <label className="block text-sm text-gray-700 mb-2">Photo *</label>
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
                    className="w-64 h-64 object-cover rounded-xl border border-gray-200 mx-auto"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Upload a photo (max 5MB). Supports JPG, PNG, WebP.</p>
            </div>

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
              <label className="block text-sm text-gray-700 mb-2">Role/Position *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                placeholder="e.g., Executive Director"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleSave()}
                className="flex-1 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                <span>Save Member</span>
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