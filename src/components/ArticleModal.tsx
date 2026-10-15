import React, { useState, useEffect, useRef } from 'react';
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
  const [theme, setTheme] = useState<'day' | 'sepia' | 'night'>('day');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [copiedToast, setCopiedToast] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Track scroll depth
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

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

  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-[#fbf9f5] text-[#292524] border-[#e8e4db]';
      case 'night':
        return 'bg-[#121212] text-[#e0e0e0] border-[#2a2a2a]';
      default:
        return 'bg-white text-[#121212] border-[#d6d6d6]';
    }
  };

  const getHeaderThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-[#fbf9f5]/95 border-[#e8e4db] text-[#292524]';
      case 'night':
        return 'bg-[#121212]/95 border-[#2a2a2a] text-[#e0e0e0]';
      default:
        return 'bg-white/95 border-[#e2e2e2] text-[#121212]';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-headline"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6"
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`${getThemeClasses()} w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-xs shadow-2xl flex flex-col relative my-auto border overflow-y-auto max-h-[96vh] transition-colors duration-200`}
      >
        {/* Subtle Reading Depth Progress Line */}
        <div className="sticky top-0 left-0 right-0 h-0.5 bg-transparent z-30 w-full">
          <div
            className="h-full bg-[#121212] dark:bg-white transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Utility Header inside Reader */}
        <div
          className={`sticky top-0 ${getHeaderThemeClasses()} backdrop-blur-md border-b px-4 sm:px-6 py-2.5 flex items-center justify-between z-20 transition-colors duration-200`}
        >
          <div className="flex items-center space-x-3">
            <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#727272]">
              {article.kicker || article.category}
            </span>
            <span className="text-[#cccccc]">|</span>
            <span className="masthead-font text-lg hidden sm:inline">The New York Times</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-sans">
            {/* Audio Narrator Button */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xs border text-xs font-medium cursor-pointer transition-colors ${
                isPlayingAudio
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                  : 'bg-transparent text-inherit border-current/20 hover:bg-black/5'
              }`}
              title="Listen to narrated article"
            >
              <span>{isPlayingAudio ? '❚❚' : '▶'}</span>
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'Pause' : 'Listen'} ({article.readTime || '5 MIN'})
              </span>
            </button>

            {/* Reading theme toggles: Day, Sepia, Night */}
            <div className="hidden md:flex items-center space-x-1 border border-current/20 p-0.5 rounded-xs text-[11px]">
              <button
                onClick={() => setTheme('day')}
                className={`px-1.5 py-0.5 cursor-pointer ${theme === 'day' ? 'bg-black text-white font-bold' : 'text-gray-500'}`}
                title="Default Day White"
              >
                Day
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-1.5 py-0.5 cursor-pointer ${theme === 'sepia' ? 'bg-[#292524] text-[#fbf9f5] font-bold' : 'text-gray-500'}`}
                title="Warm Newsprint Sepia"
              >
                Paper
              </button>
              <button
                onClick={() => setTheme('night')}
                className={`px-1.5 py-0.5 cursor-pointer ${theme === 'night' ? 'bg-white text-black font-bold' : 'text-gray-500'}`}
                title="Night Mode"
              >
                Night
              </button>
            </div>

            {/* Font size toggles */}
            <div className="hidden sm:flex items-center space-x-1 border border-current/20 p-0.5 rounded-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-xs font-serif cursor-pointer ${
                  fontSize === 'normal' ? 'bg-black/10 font-bold' : 'text-gray-500'
                }`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-sm font-serif cursor-pointer ${
                  fontSize === 'large' ? 'bg-black/10 font-bold' : 'text-gray-500'
                }`}
                title="Larger font size"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article)}
              className={`p-1.5 rounded-xs cursor-pointer transition-colors ${
                isSaved ? 'text-[#326891] bg-blue-50/50' : 'text-gray-500 hover:text-black hover:bg-black/5'
              }`}
              title={isSaved ? 'Saved to reading list' : 'Save article'}
            >
              <svg className={`w-4 h-4 ${isSaved ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="hidden lg:block p-1.5 text-gray-500 hover:text-black hover:bg-black/5 rounded-xs cursor-pointer transition-colors"
              title="Print article"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-black/5 rounded-xs cursor-pointer transition-colors relative"
              title="Share article"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {copiedToast && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-[11px] py-1 px-2 rounded-xs whitespace-nowrap shadow-lg">
                  Link copied!
                </span>
              )}
            </button>

            {/* Comments button */}
            <button
              onClick={() => onOpenComments(article)}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-black hover:bg-black/5 px-2 py-1 rounded-xs cursor-pointer"
              title="View comments"
            >
              <span>💬</span>
              <span className="font-sans font-medium">{article.commentCount || 412}</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-black hover:bg-black/5 rounded-xs cursor-pointer ml-1"
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
              <span className="text-[#326891] font-bold">● AUDIO EDITION</span>
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
        <div className="p-6 sm:p-10 md:p-14 max-w-3xl mx-auto w-full">
          {/* Kicker if present */}
          {article.kicker && (
            <div className="kicker-font text-xs uppercase tracking-wider mb-2.5 font-bold text-[#a81c1c]">
              {article.kicker}
            </div>
          )}

          {/* Headline */}
          <h1
            id="article-modal-headline"
            className="headline-font font-bold text-2xl sm:text-3xl md:text-4xl text-inherit leading-[1.18] mb-3.5 text-balance"
          >
            {article.headline}
          </h1>

          {/* Subhead / Summary */}
          <p className="summary-font text-lg sm:text-xl text-inherit/85 leading-relaxed mb-6 font-normal">
            {article.summary}
          </p>

          {/* Byline and metadata */}
          <div className="border-t border-b border-current/15 py-3.5 my-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-inherit/70 gap-2">
            <div>
              <span className="font-bold text-inherit uppercase tracking-wide">
                {article.byline || 'By THE NEW YORK TIMES'}
              </span>
              {article.authorBio && <span className="block text-inherit/75 mt-0.5">{article.authorBio}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <span>{article.date || 'October 14, 2026'}</span>
              <span>·</span>
              <span>{article.readTime || '5 MIN READ'}</span>
            </div>
          </div>

          {/* Featured Image with Professional Framing */}
          {article.imageUrl && (
            <div className="my-8">
              <div className="border border-current/10 overflow-hidden bg-black/5">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  className="w-full max-h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2.5 text-xs text-inherit/70 font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="italic">{article.imageCaption || 'Photograph documenting the developing reporting.'}</span>
                <span className="font-medium shrink-0">{article.imageCredit || 'The New York Times'}</span>
              </div>
            </div>
          )}

          {/* Article paragraphs */}
          <div className={`space-y-6 ${getFontSizeClass()} font-serif text-inherit/90`}>
            {article.fullContent && article.fullContent.length > 0 ? (
              article.fullContent.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                      : ''
                  }
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="leading-relaxed">
                {article.summary} Additional investigative reporting and archival details continue below for registered subscribers.
              </p>
            )}

            {/* Editorial pull quote with clean top/bottom hairline borders (No thick left border) */}
            <div className="my-10 py-6 border-t border-b border-current/20 text-center">
              <p className="text-xl sm:text-2xl font-serif italic text-inherit font-normal max-w-xl mx-auto leading-relaxed">
                “Our core responsibility is to bring verifiable truth to public debate, holding institutions accountable to the highest standard of public integrity.”
              </p>
              <span className="block text-xs font-sans uppercase tracking-widest text-inherit/60 mt-3">
                The New York Times Standards & Practices
              </span>
            </div>
          </div>

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-current/15">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-inherit/60 block mb-2">
                Filed Under
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-current/20 hover:border-current/40 px-2.5 py-1 rounded-xs cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-10 pt-6 border-t border-current flex items-center justify-between">
            <button
              onClick={() => onOpenComments(article)}
              className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-sans font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs cursor-pointer transition-colors"
            >
              View Comments ({article.commentCount || 412})
            </button>
            <button
              onClick={onClose}
              className="text-xs font-sans text-inherit/70 hover:text-inherit cursor-pointer hover:underline"
            >
              Return to Front Page ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
