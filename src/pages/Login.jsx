import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
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
      let msg = err.message || '';
      if (msg.toLowerCase().includes('firebase') || msg.includes('auth/')) {
        msg = 'Error (Invalid Credentials)';
      } else {
        msg = 'Login failed. Please check credentials.';
      }
      setError(msg);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#001b16] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Brand Light Leaks */}
      <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full bg-surface/10 blur-[150px] pointer-events-none" />
      <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="relative w-full max-w-md bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl p-8 backdrop-blur-md z-10 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <Logo className="w-32 h-32 md:w-40 md:h-40" />
          <div className="text-center space-y-1">
            <h2 className="font-headline text-2xl text-white font-bold">TBK Control Center</h2>
            <p className="text-xs text-on-surface-variant font-light">Secure administrative portals</p>
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
