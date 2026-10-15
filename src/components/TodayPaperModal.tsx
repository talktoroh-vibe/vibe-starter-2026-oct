import React from 'react';
import { Article } from '../types';

interface TodayPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TodayPaperModal: React.FC<TodayPaperModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  if (!isOpen) return null;

  const sections = [
    { title: 'The Front Page · Section A', items: articles.slice(0, 4) },
    { title: 'Business Report · Section B', items: articles.filter((a) => a.category === 'Business').slice(0, 3) },
    { title: 'Opinion & Editorial · Section O', items: articles.filter((a) => a.category === 'Opinion').slice(0, 3) },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="today-paper-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-4"
    >
      <div className="bg-white text-[#121212] w-full max-w-2xl rounded-md shadow-2xl border border-[#d6d6d6] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-[#121212] flex items-center justify-between bg-[#fcfcfc]">
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#a81c1c]">
              PRINT ARCHIVE & REPLICA
            </div>
            <h2 id="today-paper-modal-title" className="headline-font font-bold text-xl text-black">
              Today’s Paper — Wednesday, Oct. 14, 2026
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-black rounded cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1 mb-3">
                {sec.title}
              </h3>
              <div className="space-y-3">
                {sec.items.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 hover:bg-[#fafafa] rounded cursor-pointer group transition-colors"
                  >
                    <h4 className="headline-font font-bold text-sm text-black group-hover:text-[#326891] leading-snug">
                      {art.headline}
                    </h4>
                    <p className="summary-font text-xs text-[#555] line-clamp-2 mt-1">
                      {art.summary}
                    </p>
                    <div className="text-[10px] font-sans text-[#727272] mt-1">
                      {art.byline} · {art.readTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#fafafa] p-4 border-t border-[#e2e2e2] flex items-center justify-between text-xs font-sans">
          <span className="text-[#727272]">Vol. CLXXVI ... No. 60,312</span>
          <button
            onClick={onClose}
            className="bg-black text-white px-3 py-1.5 rounded cursor-pointer hover:bg-gray-800"
          >
            Close Print Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
