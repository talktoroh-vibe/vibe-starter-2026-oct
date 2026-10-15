import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  onOpenSubscribe: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLoginSuccess(email);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-4"
    >
      <div className="bg-white text-[#121212] w-full max-w-md rounded-md shadow-2xl border border-[#d6d6d6] overflow-hidden relative p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="masthead-font text-3xl mb-2 text-black">The New York Times</div>
          <h2 id="login-modal-title" className="headline-font font-bold text-xl text-black">Log in to your account</h2>
          <p className="summary-font text-xs text-[#555] mt-1">
            Access your saved articles, customized newsletters, and reading preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-medium text-[#333] mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-[#ccc] rounded text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-[#333]">Password</label>
              <button type="button" className="text-[#326891] hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-[#ccc] rounded text-sm focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#121212] hover:bg-[#333] text-white text-xs uppercase font-bold tracking-wider py-2.5 rounded-sm transition-colors cursor-pointer"
          >
            Log In
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e2e2]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-[#727272]">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onLoginSuccess('subscriber@nytimes.com');
              onClose();
            }}
            className="w-full border border-[#ccc] hover:bg-gray-50 text-[#333] py-2 rounded flex items-center justify-center space-x-2 cursor-pointer font-semibold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="text-center pt-2 text-[#727272]">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSubscribe();
              }}
              className="text-[#326891] hover:underline font-semibold cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
