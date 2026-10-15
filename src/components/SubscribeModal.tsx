import React, { useState } from 'react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribed,
}) => {
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState<'basic' | 'all-access'>('all-access');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onSubscribed();
      onClose();
      setSuccess(false);
    }, 1600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-4"
    >
      <div className="bg-white text-[#121212] w-full max-w-lg rounded-md shadow-2xl border border-[#d6d6d6] overflow-hidden relative p-6 sm:p-8">
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
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#a81c1c] block mb-1">
            LIMITED TIME PROMOTION
          </span>
          <h2 id="subscribe-modal-title" className="headline-font font-bold text-2xl text-black">
            Independent journalism worth supporting.
          </h2>
          <p className="summary-font text-sm text-[#555] mt-1">
            Subscribe for just <span className="font-bold text-black">$1/week</span> for your first year.
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              ✓
            </div>
            <h3 className="headline-font font-bold text-xl text-black">Welcome to The New York Times</h3>
            <p className="summary-font text-xs text-[#555] mt-1">
              Your All Access digital subscription is now active!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tier Selectors */}
            <div className="grid grid-cols-2 gap-3 font-sans">
              <div
                onClick={() => setTier('all-access')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  tier === 'all-access'
                    ? 'border-black bg-[#fafafa] ring-1 ring-black'
                    : 'border-[#ddd] hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase text-[#a81c1c]">Best Value</span>
                  <input
                    type="radio"
                    checked={tier === 'all-access'}
                    onChange={() => setTier('all-access')}
                    className="accent-black"
                  />
                </div>
                <div className="font-bold text-sm text-black">All Access</div>
                <div className="text-xs text-[#555] mt-0.5">$1 / week for 1 year</div>
                <div className="text-[11px] text-[#727272] mt-2">
                  News + Cooking + Wirecutter + Games + The Athletic
                </div>
              </div>

              <div
                onClick={() => setTier('basic')}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  tier === 'basic'
                    ? 'border-black bg-[#fafafa] ring-1 ring-black'
                    : 'border-[#ddd] hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs uppercase text-gray-500">Standard</span>
                  <input
                    type="radio"
                    checked={tier === 'basic'}
                    onChange={() => setTier('basic')}
                    className="accent-black"
                  />
                </div>
                <div className="font-bold text-sm text-black">News Only</div>
                <div className="text-xs text-[#555] mt-0.5">$1 / week for 6 months</div>
                <div className="text-[11px] text-[#727272] mt-2">
                  Complete global newsroom reporting and investigations
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-[#333] mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-[#ccc] rounded text-sm font-sans focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#567b95] hover:bg-[#326891] text-white text-xs uppercase font-bold tracking-wider py-3 rounded-sm transition-colors cursor-pointer shadow-sm"
            >
              Start Subscription for $1/Week
            </button>

            <p className="text-[10px] text-center text-[#727272] font-sans">
              Cancel or pause anytime online. Terms of Sale and Privacy Policy apply.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
