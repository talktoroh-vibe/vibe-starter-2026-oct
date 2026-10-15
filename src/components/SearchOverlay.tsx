import React, { useState, useMemo } from 'react';
import { Article } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  const quickPills = [
    'Trump Administration',
    'Federal Reserve',
    'Kimberly Guilfoyle',
    'Georgia Governor',
    'MLB Dodgers',
    'Arctic Alliances',
    'Espresso Machines',
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.headline.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.byline && a.byline.toLowerCase().includes(q))
    );
  }, [query, articles]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-8 sm:pt-16 px-4"
    >
      <div className="bg-white text-[#121212] w-full max-w-2xl rounded-md shadow-2xl border border-[#d6d6d6] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Input Bar */}
        <div className="p-4 border-b border-[#e2e2e2] flex items-center space-x-3 bg-white">
          <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <input
            id="search-modal-title"
            type="text"
            placeholder="SEARCH THE NEW YORK TIMES..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base sm:text-lg font-sans outline-none uppercase placeholder:text-gray-400 placeholder:normal-case font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-black font-sans px-2 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-black rounded cursor-pointer"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-[#f8f9fa] border-b border-[#e2e2e2] flex items-center space-x-2 overflow-x-auto text-xs font-sans">
          <span className="text-[#727272] shrink-0 font-medium">Trending searches:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="bg-white hover:bg-[#eaeaea] text-[#333] px-2.5 py-1 rounded-full border border-[#ddd] shrink-0 transition-colors cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-[#f0f0f0]">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-gray-500 text-sm font-sans">
              Type keywords above to search news, opinion, investigations, and archival pieces.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm font-sans">
              No articles found matching &ldquo;<span className="text-black font-semibold">{query}</span>&rdquo;.
            </div>
          ) : (
            searchResults.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="py-3 hover:bg-[#fafafa] p-2 rounded cursor-pointer transition-colors group"
              >
                <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#a81c1c] mb-1">
                  {art.category} {art.kicker ? `· ${art.kicker}` : ''}
                </div>
                <h3 className="headline-font font-bold text-base text-black group-hover:text-[#326891] leading-snug">
                  {art.headline}
                </h3>
                <p className="summary-font text-xs text-[#555] line-clamp-2 mt-1">
                  {art.summary}
                </p>
                <div className="flex items-center space-x-2 text-[10px] font-sans text-[#727272] mt-1.5">
                  <span>{art.byline}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
