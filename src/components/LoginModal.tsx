import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, ShieldAlert, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Rate Limiting State
  const [failedCount, setFailedCount] = useState<number>(0);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  // Check stored rate limit status on mount and when modal opens
  useEffect(() => {
    const storedBlock = localStorage.getItem('devtasoft_ip_blocked_until');
    if (storedBlock) {
      const blockTime = parseInt(storedBlock, 10);
      if (Date.now() < blockTime) {
        setBlockedUntil(blockTime);
      } else {
        localStorage.removeItem('devtasoft_ip_blocked_until');
        localStorage.removeItem('devtasoft_failed_attempts');
        setBlockedUntil(null);
        setFailedCount(0);
      }
    } else {
      const storedAttempts = localStorage.getItem('devtasoft_failed_attempts');
      if (storedAttempts) {
        setFailedCount(parseInt(storedAttempts, 10));
      }
    }
  }, [isOpen]);

  // Live 24-hour countdown timer interval
  useEffect(() => {
    if (!blockedUntil) return;

    const updateTimer = () => {
      const remainingMs = blockedUntil - Date.now();
      if (remainingMs <= 0) {
        localStorage.removeItem('devtasoft_ip_blocked_until');
        localStorage.removeItem('devtasoft_failed_attempts');
        setBlockedUntil(null);
        setFailedCount(0);
        setTimeLeftStr('');
      } else {
        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        
        const hStr = String(hours).padStart(2, '0');
        const mStr = String(minutes).padStart(2, '0');
        const sStr = String(seconds).padStart(2, '0');

        setTimeLeftStr(`${hStr}h : ${mStr}m : ${sStr}s`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [blockedUntil]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // If currently blocked, prevent submission
    if (blockedUntil && Date.now() < blockedUntil) {
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      // Simulate credential check (Valid demo account: admin@devtasoft.com / admin123)
      const isValid = email.trim().toLowerCase() === 'admin@devtasoft.com' && password === 'admin123';

      if (isValid) {
        // Success: Reset failed count
        localStorage.removeItem('devtasoft_failed_attempts');
        setFailedCount(0);
        setStatus('success');
      } else {
        // Failed attempt: Increment failed count
        const newCount = failedCount + 1;
        setFailedCount(newCount);
        localStorage.setItem('devtasoft_failed_attempts', newCount.toString());
        setStatus('idle');

        if (newCount >= MAX_ATTEMPTS) {
          // Block IP for 24 hours
          const blockEndTime = Date.now() + BLOCK_DURATION_MS;
          localStorage.setItem('devtasoft_ip_blocked_until', blockEndTime.toString());
          setBlockedUntil(blockEndTime);
        } else {
          setErrorMessage('Invalid email or password.');
        }
      }
    }, 1000);
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage(null);
    setEmail('');
    setPassword('');
    setRememberMe(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Card Frame matching Reference Image */}
      <div className="relative w-full max-w-[480px] sm:max-w-[520px] bg-white rounded-[32px] shadow-2xl border border-slate-100 p-7 sm:p-10 overflow-hidden">
        
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close Login Dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* VIEW 1: 24-Hour IP Blocked Lockout Screen */}
        {blockedUntil ? (
          <div className="text-center py-6 flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 border border-red-200 text-red-600 rounded-full flex items-center justify-center mb-1 shadow-md shadow-red-500/10">
              <ShieldAlert className="w-9 h-9 stroke-[2.2]" />
            </div>
            
            <div>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-extrabold rounded-full uppercase tracking-wider mb-2">
                Server Security Lock
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#0D152A]">
                Access Blocked
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xs leading-relaxed mt-1">
                Your IP address has been temporarily blocked for <strong>24 hours</strong>.
              </p>
            </div>

            {/* Live 24-Hour Countdown Box */}
            <div className="w-full bg-slate-900 text-white rounded-2xl p-4 my-2 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold mb-1 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Time Remaining Until Unlock</span>
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00C2CC] tracking-wider py-1">
                {timeLeftStr || '23h : 59m : 59s'}
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed px-2">
              Security Notice: Incident logged under IP firewall rule. If you require emergency access, contact your administrator.
            </div>

            <button
              onClick={handleClose}
              className="mt-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer"
            >
              Close Dialog
            </button>
          </div>
        ) : status === 'success' ? (
          /* VIEW 2: Login Success View */
          <div className="text-center py-10 flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#00C2CC]/15 text-[#00C2CC] rounded-full flex items-center justify-center mb-1">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#0D152A]">
              Welcome back!
            </h3>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              You have successfully authenticated. Accessing your secure dashboard...
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-[#FF6B00] hover:bg-[#E05B00] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#FF6B00]/25 transition-all cursor-pointer"
            >
              Continue to Portal
            </button>
          </div>
        ) : (
          /* VIEW 3: Standard Login Form View */
          <div>
            
            {/* Top FOR ADMIN USE ONLY Badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D152A] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-sm">
                <Lock className="w-3.5 h-3.5 text-[#00C2CC]" />
                <span>FOR ADMIN USE ONLY</span>
              </span>
            </div>

            {/* Logo Centered at Top */}
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

            {/* Header Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D152A] flex items-center justify-center gap-2">
                <span>Welcome back</span>
                <span className="text-2xl sm:text-3xl">👋</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1.5 font-medium">
                Login to your account to continue
              </p>
              
              {/* Colored Gradient Accent Line */}
              <div className="flex justify-center items-center gap-1 mt-3">
                <div className="w-8 h-1 rounded-full bg-[#FF6B00]" />
                <div className="w-2 h-1 rounded-full bg-[#00C2CC]" />
              </div>
            </div>

            {/* Generic Error Warning Banner (Without Exposing Attempts) */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center gap-2 text-xs sm:text-sm text-red-600 font-semibold animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Address Field */}
              <div>
                <label className="block text-sm font-bold text-[#0D152A] mb-2">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-15 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-[#00C2CC] focus:ring-4 focus:ring-[#00C2CC]/15 text-sm text-[#0D152A] placeholder-slate-400 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-[#0D152A] mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-15 pr-12 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-[#00C2CC] focus:ring-4 focus:ring-[#00C2CC]/15 text-sm text-[#0D152A] placeholder-slate-400 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <Eye className="w-4.5 h-4.5" /> : <EyeOff className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                      rememberMe
                        ? 'bg-[#FF6B00] text-white shadow-sm'
                        : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {rememberMe && (
                      <svg className="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered email.')}
                  className="text-sm font-bold text-[#FF6B00] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Orange-to-Cyan Gradient Login CTA Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FA7706] to-[#00C2CC] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/20 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer mt-3"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Section matching Reference Image */}
            <div className="mt-7 pt-4 border-t border-slate-100/80 text-center">
              {/* Divider Badge with Shield Icon */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Secure login</span>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Your data is protected with{' '}
                <span className="text-[#00C2CC] font-semibold">enterprise grade security</span>.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
