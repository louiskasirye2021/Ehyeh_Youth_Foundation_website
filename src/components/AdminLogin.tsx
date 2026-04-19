import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For demo purposes, using a simple PIN authentication
      // In production, this should use proper authentication
      if (pin === 'EYF@2026') {
        // Generate a simple token
        const token = btoa(`admin:${Date.now()}`);
        localStorage.setItem('eyf_admin_token', token);
        onLogin(token);
      } else {
        setError('Invalid PIN. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#C39223] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="Ehyeh Youth Foundation" 
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl text-black mb-2">Admin Portal</h1>
          <p className="text-gray-600">Ehyeh Youth Foundation</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pin" className="block text-sm text-gray-700 mb-2">
              Administrator PIN
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPin ? 'text' : 'password'}
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:border-[#C39223] focus:outline-none transition-colors"
                placeholder="Enter your PIN"
                required
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C39223] text-white py-3 rounded-full hover:bg-[#b08520] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Login</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        {/* Back to Website */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.hash = '/'}
            className="text-sm text-gray-600 hover:text-[#C39223] transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}