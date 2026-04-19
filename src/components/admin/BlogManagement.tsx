import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  getBlogPosts,
  saveBlogPost,
  deleteBlogPost
} from '../../utils/adminStorage';
import { handleFileUpload } from '../../utils/imageUpload';

export function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: '',
    category: '',
    readTime: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const data = getBlogPosts();
    setPosts(data);
  };

  const handleSave = () => {
    const post = {
      id: formData.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      date: formData.date || new Date().toISOString().split('T')[0],
      category: formData.category,
      readTime: formData.readTime
    };

    saveBlogPost(post);
    loadPosts();
    setEditingId(null);
    resetForm();
    toast.success('Blog post saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    deleteBlogPost(id);
    loadPosts();
    toast.success('Blog post deleted successfully!');
  };

  const startEdit = (post?: any) => {
    if (post) {
      setFormData(post);
      setEditingId(post.id);
    } else {
      setFormData({
        id: '',
        title: '',
        excerpt: '',
        content: '',
        image: '',
        date: '',
        category: '',
        readTime: ''
      });
      setEditingId(Date.now().toString());
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      image: '',
      date: '',
      category: '',
      readTime: ''
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-black">News & Stories</h1>
        <button
          onClick={() => startEdit()}
          className="bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Post</span>
        </button>
      </div>

      {/* Blog Posts List */}
      {!editingId && (
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-r from-[#C39223]/10 to-white">
                <div className="w-full md:w-64 h-48 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={post.image || 'https://via.placeholder.com/400x300'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl text-black mb-2">{post.title}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        {post.category && (
                          <span className="px-3 py-1 bg-[#C39223]/20 text-[#C39223] text-xs rounded-full">
                            {post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="text-xs text-gray-500">
                            {post.readTime}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(post)}
                        className="p-2 hover:bg-white/70 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg mb-3">
                    <h4 className="text-sm uppercase text-[#C39223] mb-2">Excerpt</h4>
                    <p className="text-gray-700 text-sm">{post.excerpt}</p>
                  </div>

                  {post.content && (
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="text-sm uppercase text-[#C39223] mb-2">Full Content</h4>
                      <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-4">{post.content}</p>
                    </div>
                  )}
                </div>
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
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-black">
              {editingId.length > 10 ? 'Edit Post' : 'Create New Post'}
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
                <label className="block text-sm text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                  placeholder="Post Title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Events">Events</option>
                  <option value="Programs">Programs</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Impact Stories">Impact Stories</option>
                  <option value="News">News</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none"
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Featured Image</label>
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
                    className="w-full h-64 object-cover rounded-xl border border-gray-200"
                  />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Upload a featured image (max 5MB). Supports JPG, PNG, WebP.</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Excerpt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none resize-none"
                rows={3}
                placeholder="Short description for the blog card..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Full Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none resize-none"
                rows={10}
                placeholder="Full blog post content..."
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleSave()}
                className="flex-1 bg-[#C39223] text-white px-6 py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} />
                <span>Save Post</span>
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