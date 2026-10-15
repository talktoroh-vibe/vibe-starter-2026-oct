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
    <div className="max-w-[1280px] mx-auto px-4 pt-2 pb-1 border-b border-[#f0f0f0]" data-purpose="utility-header">
      <div className="flex items-center justify-between text-[11px] font-sans text-[#5a5a5a]">
        {/* Left zone: Menu, Search, Date, Weather & Today's Paper */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMenu}
            aria-label="Open sections menu"
            className="p-1 hover:text-black cursor-pointer transition-colors flex items-center space-x-1"
            title="Sections"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden xl:inline uppercase tracking-wider text-[10px] font-bold text-black ml-0.5">
              Sections
            </span>
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-black cursor-pointer transition-colors flex items-center space-x-1"
            title="Search (Press /)"
          >
            <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
            <span className="hidden xl:inline uppercase tracking-wider text-[10px] font-bold text-black ml-0.5">
              Search
            </span>
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
            <span className="text-[#cccccc] hidden lg:inline">|</span>
            <span className="hidden lg:inline text-[#555]">New York 68°F</span>
          </div>
        </div>

        {/* Center zone: Edition switcher */}
        <div className="hidden md:flex items-center space-x-3 font-semibold text-[10px] tracking-wider uppercase text-[#333333]">
          {editions.map((edition, idx) => (
            <React.Fragment key={edition}>
              <button
                onClick={() => onSelectEdition(edition)}
                className={`transition-colors cursor-pointer ${
                  currentEdition === edition ? 'text-black font-bold' : 'text-[#727272] hover:text-black'
                }`}
              >
                {edition}
              </button>
              {idx < editions.length - 1 && <span className="text-[#bbb]">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Right zone: Market index snippet, Saved, Subscriptions & Auth */}
        <div className="flex items-center space-x-2.5">
          <div className="hidden xl:flex items-center space-x-2 text-[10.5px] font-mono text-[#555] pr-2 border-r border-[#e2e2e2]">
            <span>S&P 500</span>
            <span className="text-green-700 font-semibold">+0.42%</span>
          </div>

          {savedCount > 0 && (
            <button
              onClick={onOpenSaved}
              className="flex items-center space-x-1 text-[11px] font-semibold text-[#121212] hover:text-[#326891] px-1.5 py-1 cursor-pointer transition-colors"
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
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-xs transition-colors duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Subscribe for $1/week
          </button>

          <button
            onClick={onOpenLogin}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10.5px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-xs transition-colors duration-150 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
