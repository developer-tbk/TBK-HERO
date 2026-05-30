import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Key, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const Login = ({ onCancel }) => {
  const { login, isFirebaseConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
      setLoading(false);
    }
  };

  // Helper shortcut to fill login quickly
  const fillCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@bagarakitchen.com');
      setPassword('admin123');
    } else {
      setEmail('manager@bagarakitchen.com');
      setPassword('manager123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#001b16] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Brand Light Leaks */}
      <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full bg-surface/10 blur-[150px] pointer-events-none" />
      <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="relative w-full max-w-md bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md z-10 space-y-8">
        
        {/* Header Block */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Logo className="w-16 h-16" />
          <div className="space-y-1 flex flex-col items-center">
            <h2 className="font-headline text-2xl text-white font-bold">TBK Control Center</h2>
            <p className="text-xs text-on-surface-variant font-light">Secure administrative portals</p>
            {isFirebaseConfigured ? (
              <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Firebase Auth Active
              </span>
            ) : (
              <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Dev Local Fallback
              </span>
            )}
          </div>
        </div>

        {/* Error Banners */}
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-400 rounded-xl text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@bagarakitchen.com"
              disabled={loading}
              className="w-full bg-background border border-outline-variant/60 rounded-xl py-3 px-4 text-sm text-white placeholder-on-surface-variant/30 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Security Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-background border border-outline-variant/60 rounded-xl py-3 pl-4 pr-11 text-sm text-white focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3.5 top-3 text-on-surface-variant hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-[#b08d4b] disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating Credentials...
              </>
            ) : (
              <>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Credentials Shortcuts helper */}
        <div className="pt-4 border-t border-outline-variant/20 space-y-3">
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <Key size={10} /> Fast Credential Toggles
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => fillCredentials('admin')}
              disabled={loading}
              className="py-2.5 px-3 bg-surface-low border border-outline-variant/40 hover:border-primary/45 rounded-lg text-on-surface-variant hover:text-white text-center font-medium transition-colors"
            >
              Fill Admin
            </button>
            <button
              onClick={() => fillCredentials('manager')}
              disabled={loading}
              className="py-2.5 px-3 bg-surface-low border border-outline-variant/40 hover:border-primary/45 rounded-lg text-on-surface-variant hover:text-white text-center font-medium transition-colors"
            >
              Fill Manager
            </button>
          </div>
        </div>

        {/* Back Link */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 text-xs text-on-surface-variant hover:text-white font-semibold transition-colors py-2"
        >
          <ArrowLeft size={12} /> Return to Public Website
        </button>

      </div>
    </div>
  );
};

export default Login;
