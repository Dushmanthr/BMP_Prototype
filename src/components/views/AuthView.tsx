import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ArrowLeft, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { login, setCurrentView } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Form states
  const [name, setName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, mode === 'signup' ? name : 'Eleanor Vance');
    setCurrentView('creator-dashboard');
  };

  const handleGoogleAuth = () => {
    login('eleanor.vance@gmail.com', 'Eleanor Vance (Google)');
    setCurrentView('creator-dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAFAFB]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 relative">
        <button
          onClick={() => setCurrentView('landing')}
          className="absolute top-6 left-6 text-gray-400 hover:text-[#243B53] transition-colors p-1"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243B53]">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            {mode === 'signup'
              ? 'Start creating private memory spaces for your loved ones'
              : 'Sign in to manage your celebrations and memories'}
          </p>
        </div>

        {/* Google Continue */}
        <button
          onClick={handleGoogleAuth}
          id="auth-google-btn"
          type="button"
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white text-[#243B53] font-semibold text-sm flex items-center justify-center gap-3 transition-colors cursor-pointer mb-5 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
            Or with email
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#243B53] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#243B53]">
                Password
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to ' + email)}
                  className="text-xs text-[#FF6B6B] hover:underline font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-3.5 px-4 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md transition-all transform active:scale-98 cursor-pointer mt-2"
          >
            {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          {mode === 'signup' ? (
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-[#FF6B6B] font-bold hover:underline cursor-pointer ml-1"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-600">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#FF6B6B] font-bold hover:underline cursor-pointer ml-1"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
