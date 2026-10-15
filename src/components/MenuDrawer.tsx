import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: string) => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenTodayPaper: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenSubscribe,
  onOpenLogin,
  onOpenTodayPaper,
}) => {
  if (!isOpen) return null;

  const sectionGroups = [
    {
      title: 'NEWS',
      items: ['U.S.', 'World', 'Business', 'Arts', 'Lifestyle', 'Opinion'],
    },
    {
      title: 'OPINION',
      items: ['Columnists', 'Editorials', 'Guest Essays', 'Letters', 'Sunday Opinion'],
    },
    {
      title: 'ARTS & CULTURE',
      items: ['Books', 'Movies', 'Music', 'Television', 'Theater', 'Visual Arts'],
    },
    {
      title: 'LIVING & LIFESTYLE',
      items: ['Style', 'Food', 'Travel', 'Love', 'Real Estate', 'Well'],
    },
    {
      title: 'MORE PRODUCTS',
      items: ['Cooking', 'Wirecutter', 'Games', 'The Athletic', 'Audio & Podcasts'],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-drawer-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start"
    >
      <div className="bg-white text-[#121212] w-full max-w-sm h-full shadow-2xl flex flex-col relative animate-in slide-in-from-left duration-200">
        {/* Top Header */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span id="menu-drawer-title" className="masthead-font text-2xl text-black">The New York Times</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Auth / Subscribe banner in menu */}
        <div className="p-4 bg-[#f8f9fa] border-b border-[#e2e2e2] flex flex-col gap-2">
          <button
            onClick={() => {
              onOpenSubscribe();
              onClose();
            }}
            className="w-full bg-[#567b95] hover:bg-[#326891] text-white text-xs uppercase font-bold tracking-wider py-2 rounded-sm cursor-pointer transition-colors"
          >
            Subscribe for $1/week
          </button>
          <div className="flex items-center justify-between text-xs font-sans">
            <button
              onClick={() => {
                onOpenLogin();
                onClose();
              }}
              className="text-[#326891] hover:underline cursor-pointer font-semibold"
            >
              Already a subscriber? Log In
            </button>
            <button
              onClick={() => {
                onOpenTodayPaper();
                onClose();
              }}
              className="text-[#555] hover:underline cursor-pointer"
            >
              Today’s Paper
            </button>
          </div>
        </div>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sectionGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-sans font-bold tracking-widest text-[#727272] uppercase mb-2">
                {group.title}
              </div>
              <ul className="space-y-2 text-sm font-sans font-medium text-[#121212]">
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        onSelectSection(item);
                        onClose();
                      }}
                      className="hover:underline text-left w-full py-0.5 cursor-pointer hover:text-[#326891]"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#e2e2e2] text-[11px] font-sans text-[#727272] bg-[#fafafa]">
          © 2026 The New York Times Company
        </div>
      </div>
    </div>
  );
};
