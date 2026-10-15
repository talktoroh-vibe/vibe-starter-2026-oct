import React from 'react';

interface TopUtilityBarProps {
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenTodayPaper: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  currentEdition,
  onSelectEdition,
  onOpenMenu,
  onOpenSearch,
  onOpenSubscribe,
  onOpenLogin,
  onOpenTodayPaper,
  savedCount,
  onOpenSaved,
}) => {
  const editions = ['U.S.', 'International', 'Canada', 'Español', '中文'];

  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-2 pb-1" data-purpose="utility-header">
      <div className="flex items-center justify-between text-[11px] font-sans text-[#5a5a5a] border-b border-transparent">
        {/* Left side: Menu, Search, Date & Today's Paper */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="p-1 hover:text-black cursor-pointer transition-colors"
            title="Sections"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-black cursor-pointer transition-colors"
            title="Search"
          >
            <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </button>

          <div className="hidden sm:flex items-center space-x-2 font-medium">
            <span className="text-black font-semibold">Wednesday, October 14, 2026</span>
            <span className="text-[#cccccc]">|</span>
            <button
              onClick={onOpenTodayPaper}
              className="hover:underline cursor-pointer text-[#5a5a5a] hover:text-black"
            >
              Today’s Paper
            </button>
          </div>
        </div>

        {/* Center: Edition switcher */}
        <div className="hidden md:flex items-center space-x-3 font-semibold text-[10px] tracking-wider uppercase text-[#333333]">
          {editions.map((edition, idx) => (
            <React.Fragment key={edition}>
              <button
                onClick={() => onSelectEdition(edition)}
                className={`transition-colors cursor-pointer ${
                  currentEdition === edition ? 'text-black font-bold' : 'text-[#5a5a5a] hover:text-black'
                }`}
              >
                {edition}
              </button>
              {idx < editions.length - 1 && <span className="text-[#999]">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Saved, Subscriptions & Auth */}
        <div className="flex items-center space-x-2">
          {savedCount > 0 && (
            <button
              onClick={onOpenSaved}
              className="hidden sm:flex items-center space-x-1 text-[11px] font-semibold text-[#121212] hover:text-[#326891] px-2 py-1 rounded cursor-pointer mr-1"
              title="Saved Articles"
            >
              <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>Saved ({savedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Subscribe for $1/week
          </button>

          <button
            onClick={onOpenLogin}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-sm transition-colors duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
