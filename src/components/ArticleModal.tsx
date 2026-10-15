import React, { useState, useEffect } from 'react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenComments: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenComments,
  isSaved,
  onToggleSave,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, playbackSpeed]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[20px] leading-[1.8]';
      case 'xlarge':
        return 'text-[22px] leading-[1.9]';
      default:
        return 'text-[17.5px] leading-[1.75]';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-headline"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6"
    >
      <div className="bg-white text-[#121212] w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-md shadow-2xl flex flex-col relative my-auto border border-[#d6d6d6]">
        {/* Sticky Utility Header inside Reader */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#e2e2e2] px-4 sm:px-6 py-2.5 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#727272]">
              {article.kicker || article.category}
            </span>
            <span className="text-[#cccccc]">|</span>
            <span className="masthead-font text-lg text-black hidden sm:inline">The New York Times</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-sans">
            {/* Audio Listen Button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border text-xs font-medium cursor-pointer transition-colors ${
                isPlayingAudio
                  ? 'bg-[#121212] text-white border-black'
                  : 'bg-[#f7f7f7] text-[#121212] border-[#e2e2e2] hover:bg-[#ebebeb]'
              }`}
              title="Listen to narrated article"
            >
              <span>{isPlayingAudio ? '❚❚' : '▶'}</span>
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'Pause' : 'Listen'} ({article.readTime || '5 MIN'})
              </span>
            </button>

            {/* Font size toggles */}
            <div className="hidden sm:flex items-center space-x-1 bg-[#f5f5f5] p-0.5 rounded border border-[#e2e2e2]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-xs font-serif cursor-pointer ${
                  fontSize === 'normal' ? 'bg-white shadow-xs font-bold' : 'text-[#666]'
                }`}
                title="Normal font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-sm font-serif cursor-pointer ${
                  fontSize === 'large' ? 'bg-white shadow-xs font-bold' : 'text-[#666]'
                }`}
                title="Large font size"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article)}
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                isSaved ? 'text-[#326891] bg-blue-50' : 'text-[#555] hover:text-black hover:bg-gray-100'
              }`}
              title={isSaved ? 'Saved to reading list' : 'Save article'}
            >
              <svg className={`w-4 h-4 ${isSaved ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 text-[#555] hover:text-black hover:bg-gray-100 rounded cursor-pointer transition-colors relative"
              title="Share article"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {copiedToast && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-[11px] py-1 px-2 rounded whitespace-nowrap shadow-lg">
                  Link copied!
                </span>
              )}
            </button>

            {/* Comments button */}
            <button
              onClick={() => onOpenComments(article)}
              className="flex items-center space-x-1 text-xs text-[#555] hover:text-black hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
              title="View comments"
            >
              <span>💬</span>
              <span className="font-sans font-medium">{article.commentCount || 412}</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-1 text-[#666] hover:text-black hover:bg-gray-100 rounded cursor-pointer ml-1"
              aria-label="Close article"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Audio Player Bar if playing */}
        {isPlayingAudio && (
          <div className="bg-[#121212] text-white px-6 py-2.5 flex items-center justify-between text-xs font-sans border-b border-[#333]">
            <div className="flex items-center space-x-3 w-1/3 truncate">
              <span className="text-[#326891] animate-pulse">● AUDIO EDITION</span>
              <span className="truncate text-gray-300">{article.headline}</span>
            </div>

            <div className="flex items-center space-x-3 w-1/3">
              <div className="w-full bg-[#333] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#567b95] h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 font-mono min-w-8">
                {Math.floor((audioProgress * 4.2) / 60)}:
                {String(Math.floor((audioProgress * 4.2) % 60)).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
                className="text-[11px] bg-[#222] hover:bg-[#333] px-2 py-0.5 rounded cursor-pointer border border-[#444]"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>
        )}

        {/* Article Reader Body */}
        <div className="p-6 sm:p-10 md:p-12 max-w-3xl mx-auto w-full">
          {/* Kicker if present */}
          {article.kicker && (
            <div className="kicker-font text-xs uppercase tracking-wider mb-2 font-bold text-[#a81c1c]">
              {article.kicker}
            </div>
          )}

          {/* Headline */}
          <h1
            id="article-modal-headline"
            className="headline-font font-bold text-2xl sm:text-3xl md:text-4xl text-black leading-[1.18] mb-3"
          >
            {article.headline}
          </h1>

          {/* Subhead / Summary */}
          <p className="summary-font text-lg sm:text-xl text-[#333333] leading-relaxed mb-6 font-normal">
            {article.summary}
          </p>

          {/* Byline and metadata */}
          <div className="border-t border-b border-[#e2e2e2] py-3 my-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-[#727272] gap-2">
            <div>
              <span className="font-bold text-[#121212] uppercase tracking-wide">
                {article.byline || 'By THE NEW YORK TIMES'}
              </span>
              {article.authorBio && <span className="block text-[#555] mt-0.5">{article.authorBio}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <span>{article.date || 'October 14, 2026'}</span>
              <span>·</span>
              <span>{article.readTime || '5 MIN READ'}</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="my-6">
              <div className="border border-[#e8e8e8] overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>
              <div className="mt-2 text-xs text-[#727272] font-sans flex items-center justify-between">
                <span>{article.imageCaption || 'News report photograph.'}</span>
                <span className="font-medium text-[#555]">{article.imageCredit || 'The New York Times'}</span>
              </div>
            </div>
          )}

          {/* Article paragraphs */}
          <div className={`space-y-5 text-[#222222] ${getFontSizeClass()} font-serif`}>
            {article.fullContent && article.fullContent.length > 0 ? (
              article.fullContent.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none' : ''}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">
                {article.summary} Additional investigative reporting and archival details continue below for registered subscribers.
              </p>
            )}

            {/* Editorial quote callout */}
            <blockquote className="my-8 pl-5 border-l-2 border-[#121212] italic text-lg sm:text-xl text-[#121212] font-serif py-1">
              “Our core responsibility is to bring verifiable truth to public debate, holding institutions accountable to the highest standard of public integrity.”
            </blockquote>
          </div>

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#e2e2e2]">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#727272] block mb-2">
                Filed Under
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-sans bg-[#f5f5f5] text-[#333] hover:bg-[#ebebeb] px-2.5 py-1 rounded cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-black flex items-center justify-between">
            <button
              onClick={() => onOpenComments(article)}
              className="bg-[#121212] text-white hover:bg-[#333] text-xs font-sans font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm cursor-pointer transition-colors"
            >
              View Comments ({article.commentCount || 412})
            </button>
            <button
              onClick={onClose}
              className="text-xs font-sans text-[#727272] hover:text-black cursor-pointer hover:underline"
            >
              Return to Front Page ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
