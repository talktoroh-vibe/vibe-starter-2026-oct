import React from 'react';
import { Article } from '../types';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSaved: (articleId: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-articles-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-4"
    >
      <div className="bg-white text-[#121212] w-full max-w-xl rounded-md shadow-2xl border border-[#d6d6d6] overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-[#e2e2e2] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <h2 id="saved-articles-modal-title" className="headline-font font-bold text-xl text-black">
              Your Saved Reading List ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black rounded cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 divide-y divide-[#f0f0f0]">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-[#727272] text-sm font-sans">
              <p className="font-semibold text-black mb-1">You have no saved stories yet.</p>
              <p>Click the bookmark icon on any article to save it for later offline reading.</p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div key={art.id} className="py-3.5 flex items-start justify-between gap-4">
                <div
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer group flex-1"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#a81c1c] block mb-1">
                    {art.category}
                  </span>
                  <h3 className="headline-font font-bold text-base text-black group-hover:text-[#326891] leading-snug">
                    {art.headline}
                  </h3>
                  <p className="summary-font text-xs text-[#555] line-clamp-2 mt-1">
                    {art.summary}
                  </p>
                  <div className="text-[10px] font-sans text-[#727272] mt-1">
                    {art.readTime}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveSaved(art.id)}
                  className="text-xs text-[#999] hover:text-red-700 p-1 cursor-pointer shrink-0"
                  title="Remove from saved"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-[#fafafa] p-3 px-5 border-t border-[#e2e2e2] flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-sans font-semibold text-black hover:underline cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
