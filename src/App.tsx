/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Masthead } from './components/Masthead';
import { ArticleModal } from './components/ArticleModal';
import { LiveGameModal } from './components/LiveGameModal';
import { CommentsDrawer } from './components/CommentsDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { MenuDrawer } from './components/MenuDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { LoginModal } from './components/LoginModal';
import { TodayPaperModal } from './components/TodayPaperModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';

import {
  MAIN_HERO_ARTICLE,
  LEFT_COLUMN_ARTICLES,
  TRENDING_ARTICLES,
  CENTER_SUB_ARTICLES,
  RIGHT_COLUMN_ARTICLES,
  OPINION_PIECES,
  IN_CASE_YOU_MISSED_IT,
  MORNING_BRIEFING,
} from './data/newsData';
import { Article } from './types';

export default function App() {
  // Editions state
  const [currentEdition, setCurrentEdition] = useState('U.S.');
  const [activeSection, setActiveSection] = useState('U.S.');

  // Modal and drawer states
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [activeCommentsArticle, setActiveCommentsArticle] = useState<Article | null>(null);
  const [isLiveGameOpen, setIsLiveGameOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTodayPaperOpen, setIsTodayPaperOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);

  // User state
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [heroImageSource, setHeroImageSource] = useState<'placeholder' | 'editorial'>('placeholder');

  // Aggregated list of all articles for searching and saving
  const allArticles: Article[] = useMemo(() => {
    return [
      MAIN_HERO_ARTICLE,
      ...LEFT_COLUMN_ARTICLES,
      ...TRENDING_ARTICLES,
      ...CENTER_SUB_ARTICLES,
      MORNING_BRIEFING,
      ...RIGHT_COLUMN_ARTICLES,
      ...OPINION_PIECES,
      ...IN_CASE_YOU_MISSED_IT,
    ];
  }, []);

  const savedArticles = useMemo(() => {
    return allArticles.filter((a) => savedArticleIds.includes(a.id));
  }, [allArticles, savedArticleIds]);

  const handleToggleSave = (article: Article) => {
    setSavedArticleIds((prev) =>
      prev.includes(article.id)
        ? prev.filter((id) => id !== article.id)
        : [...prev, article.id]
    );
  };

  const handleOpenCommentsForArticle = (article: Article, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveCommentsArticle(article);
    setIsCommentsOpen(true);
  };

  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    // Smooth scroll down to main or appropriate section if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#121212] antialiased selection:bg-[#fff2a8] selection:text-black font-serif">
      {/* Subscriber Badge if signed in */}
      {subscriberEmail && (
        <div className="bg-[#121212] text-white text-[11px] font-sans py-1 px-4 flex items-center justify-between">
          <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <span className="text-[#ecd98e]">★</span>
              <span>All Access Subscriber: <strong className="text-white">{subscriberEmail}</strong></span>
            </span>
            <button
              onClick={() => setSubscriberEmail(null)}
              className="text-gray-300 hover:text-white underline cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* BEGIN: TopUtilityBar */}
      <TopUtilityBar
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenTodayPaper={() => setIsTodayPaperOpen(true)}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
      />
      {/* END: TopUtilityBar */}

      {/* BEGIN: MainHeader */}
      <Masthead
        onResetToFrontPage={() => {
          setActiveSection('U.S.');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />
      {/* END: MainHeader */}

      {/* Filter notice if section is filtered */}
      {activeSection !== 'U.S.' && (
        <div className="max-w-[1280px] mx-auto px-4 mb-3">
          <div className="bg-[#f8f9fa] border border-[#e2e2e2] px-4 py-2 flex items-center justify-between text-xs font-sans">
            <div>
              <span className="font-bold uppercase tracking-wider text-black">Section: {activeSection}</span>
              <span className="text-[#666] ml-2">Viewing articles and coverage curated for {activeSection}.</span>
            </div>
            <button
              onClick={() => setActiveSection('U.S.')}
              className="text-[#326891] hover:underline font-semibold cursor-pointer"
            >
              Back to U.S. Front Page ✕
            </button>
          </div>
        </div>
      )}

      {/* BEGIN: MainEditorialContent */}
      <main className="max-w-[1280px] mx-auto px-4 pb-12">
        {/* Sub-header bar: Reader advisory notice */}
        <div className="text-center pb-3 text-xs text-[#555555] font-sans border-b border-[#e2e2e2] mb-4">
          <span className="font-normal italic">These top stories are</span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-[#121212]"> free to read.</span>
        </div>

        {/* Broadsheet 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* LEFT COLUMN: Lead analysis & Secondary dispatches */}
          <div
            className="md:col-span-3 pr-0 md:pr-5 md:border-r border-[#e2e2e2] flex flex-col justify-between"
            data-purpose="left-lead-column"
          >
            <div>
              {/* Article 1 */}
              <article className="mb-5 pb-5 border-b border-[#e2e2e2] group">
                <h2
                  onClick={() => setSelectedArticle(LEFT_COLUMN_ARTICLES[0])}
                  className="headline-font font-bold text-[19px] leading-[1.25] text-black hover:text-[#555] cursor-pointer mb-2 transition-colors"
                >
                  {LEFT_COLUMN_ARTICLES[0].headline}
                </h2>
                <p className="summary-font text-[13px] text-[#333333] mb-2 leading-relaxed">
                  {LEFT_COLUMN_ARTICLES[0].summary}
                </p>
                <div className="flex items-center text-[10px] text-[#727272] font-sans font-medium space-x-1">
                  <span>{LEFT_COLUMN_ARTICLES[0].readTime}</span>
                  <span>·</span>
                  <button
                    onClick={(e) => handleOpenCommentsForArticle(LEFT_COLUMN_ARTICLES[0], e)}
                    className="hover:text-black cursor-pointer"
                    title="View comments"
                  >
                    💬 {LEFT_COLUMN_ARTICLES[0].commentCount}
                  </button>
                </div>
              </article>

              {/* Article 2 */}
              <article className="mb-5 pb-5 border-b border-[#e2e2e2] group">
                <h2
                  onClick={() => setSelectedArticle(LEFT_COLUMN_ARTICLES[1])}
                  className="headline-font font-bold text-[18px] leading-[1.25] text-black hover:text-[#555] cursor-pointer mb-2 transition-colors"
                >
                  {LEFT_COLUMN_ARTICLES[1].headline}
                </h2>
                <p className="summary-font text-[13px] text-[#333333] mb-2 leading-relaxed">
                  {LEFT_COLUMN_ARTICLES[1].summary}
                </p>
                <div className="flex items-center text-[10px] text-[#727272] font-sans font-medium space-x-1">
                  <span>{LEFT_COLUMN_ARTICLES[1].readTime}</span>
                  <span>·</span>
                  <button
                    onClick={(e) => handleOpenCommentsForArticle(LEFT_COLUMN_ARTICLES[1], e)}
                    className="hover:text-black cursor-pointer"
                    title="View comments"
                  >
                    💬 {LEFT_COLUMN_ARTICLES[1].commentCount}
                  </button>
                </div>
              </article>

              {/* Article 3 */}
              <article className="mb-4 group">
                <h3
                  onClick={() => setSelectedArticle(LEFT_COLUMN_ARTICLES[2])}
                  className="headline-font font-bold text-[16px] leading-[1.25] text-black hover:text-[#555] cursor-pointer mb-1.5 transition-colors"
                >
                  {LEFT_COLUMN_ARTICLES[2].headline}
                </h3>
                <p className="summary-font text-[12.5px] text-[#4b4b4b] mb-1.5 leading-snug">
                  {LEFT_COLUMN_ARTICLES[2].summary}
                </p>
                <span className="text-[10px] text-[#727272] font-sans">{LEFT_COLUMN_ARTICLES[2].readTime}</span>
              </article>
            </div>

            {/* Column Bottom Quicklinks */}
            <div className="pt-4 border-t border-[#e2e2e2] text-xs font-sans text-[#444] mt-6 md:mt-0">
              <span className="font-bold uppercase tracking-wider text-[10px] text-[#121212] block mb-2">
                Trending
              </span>
              <ul className="space-y-1.5 text-[12px] text-[#121212]">
                {TRENDING_ARTICLES.map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="hover:underline flex items-baseline text-left cursor-pointer group"
                    >
                      <span className="text-xs text-[#a81c1c] font-bold mr-1.5">{art.trendingRank}</span>
                      <span className="group-hover:text-[#326891]">{art.headline}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CENTER COLUMN: Primary Featured Cover Story with Image */}
          <div
            className="md:col-span-6 px-0 md:px-6 md:border-r border-[#e2e2e2] py-4 md:py-0"
            data-purpose="center-main-feature"
          >
            <article>
              {/* Main Hero Image */}
              <div
                onClick={() => setSelectedArticle(MAIN_HERO_ARTICLE)}
                className="mb-3 overflow-hidden bg-gray-100 border border-[#e8e8e8] cursor-pointer group relative"
              >
                <img
                  alt="Official portrait or featured news photograph"
                  className="w-full object-cover max-h-[380px] hover:opacity-95 transition-opacity"
                  src={
                    heroImageSource === 'placeholder'
                      ? MAIN_HERO_ARTICLE.imageUrl
                      : 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'
                  }
                />
                {/* Subtle photo toggle button for convenience */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHeroImageSource(heroImageSource === 'placeholder' ? 'editorial' : 'placeholder');
                  }}
                  className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-[10px] font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Toggle placeholder SVG or editorial photo"
                >
                  {heroImageSource === 'placeholder' ? 'View Photo' : 'View Placeholder'}
                </button>
              </div>

              <div className="text-[11px] text-[#727272] font-sans mb-3 text-right">
                {MAIN_HERO_ARTICLE.imageCredit}
              </div>

              {/* Feature Headline */}
              <h2
                onClick={() => setSelectedArticle(MAIN_HERO_ARTICLE)}
                className="headline-font font-bold text-2xl sm:text-[32px] leading-[1.18] text-black hover:text-[#444] cursor-pointer mb-3 transition-colors"
              >
                {MAIN_HERO_ARTICLE.headline}
              </h2>

              {/* Feature Description */}
              <p
                onClick={() => setSelectedArticle(MAIN_HERO_ARTICLE)}
                className="summary-font text-[15px] sm:text-[16px] text-[#222222] leading-relaxed mb-4 cursor-pointer"
              >
                {MAIN_HERO_ARTICLE.summary}
              </p>

              <div className="flex items-center justify-between text-xs font-sans text-[#727272] border-t border-[#e2e2e2] pt-3 pb-6">
                <span className="font-bold text-[#121212]">{MAIN_HERO_ARTICLE.byline}</span>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span>{MAIN_HERO_ARTICLE.readTime}</span>
                  <span>·</span>
                  <button
                    onClick={(e) => handleOpenCommentsForArticle(MAIN_HERO_ARTICLE, e)}
                    className="hover:text-black cursor-pointer font-medium"
                    title="View comments"
                  >
                    💬 {MAIN_HERO_ARTICLE.commentCount?.toLocaleString()}
                  </button>
                </div>
              </div>
            </article>

            {/* Sub-features 2-column grid under center article */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e2e2e2]">
              {/* Investigation sub-feature */}
              <div className="pr-2">
                <span className="kicker-font text-[10px] text-[#a81c1c] uppercase block mb-1">
                  {CENTER_SUB_ARTICLES[0].kicker}
                </span>
                <h4
                  onClick={() => setSelectedArticle(CENTER_SUB_ARTICLES[0])}
                  className="headline-font font-bold text-[15px] leading-tight mb-1 cursor-pointer hover:underline"
                >
                  {CENTER_SUB_ARTICLES[0].headline}
                </h4>
                <p className="summary-font text-xs text-[#555]">
                  {CENTER_SUB_ARTICLES[0].summary}
                </p>
              </div>

              {/* Analysis sub-feature */}
              <div className="pl-0 sm:pl-2 sm:border-l border-[#e2e2e2]">
                <span className="kicker-font text-[10px] text-[#326891] uppercase block mb-1">
                  {CENTER_SUB_ARTICLES[1].kicker}
                </span>
                <h4
                  onClick={() => setSelectedArticle(CENTER_SUB_ARTICLES[1])}
                  className="headline-font font-bold text-[15px] leading-tight mb-1 cursor-pointer hover:underline"
                >
                  {CENTER_SUB_ARTICLES[1].headline}
                </h4>
                <p className="summary-font text-xs text-[#555]">
                  {CENTER_SUB_ARTICLES[1].summary}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Digest, Live briefings, and Opinion */}
          <div
            className="md:col-span-3 pl-0 md:pl-5 pt-4 md:pt-0"
            data-purpose="right-sidebar-briefing"
          >
            {/* Live Alert Box */}
            <div
              onClick={() => setIsLiveGameOpen(true)}
              className="bg-[#fafafa] border border-[#e2e2e2] p-3 mb-5 cursor-pointer hover:border-gray-400 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center space-x-1.5 text-xs text-[#a81c1c] font-bold tracking-wider uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-[#a81c1c] animate-pulse"></span>
                <span>Live Updates</span>
              </div>
              <h3 className="headline-font font-bold text-sm leading-snug mb-1 group-hover:underline">
                MLB Playoffs: Dodgers Take on Brewers in Crucial Game 4
              </h3>
              <p className="summary-font text-xs text-[#666] mb-2">
                Follow our live coverage for inning-by-inning analysis, expert commentary, and video highlights.
              </p>
              <span className="text-[10px] text-[#326891] font-semibold group-hover:underline inline-flex items-center">
                Read live reporting →
              </span>
            </div>

            {/* Digest Items */}
            <div className="space-y-4">
              {/* Morning Briefing */}
              <div className="border-b border-[#e2e2e2] pb-3.5">
                <span className="text-[10px] uppercase font-bold text-[#727272] tracking-wider block mb-1">
                  {MORNING_BRIEFING.kicker}
                </span>
                <h4
                  onClick={() => setSelectedArticle(MORNING_BRIEFING)}
                  className="headline-font font-bold text-[14.5px] leading-snug cursor-pointer hover:underline"
                >
                  {MORNING_BRIEFING.headline}
                </h4>
                <span className="text-[10px] text-[#727272] mt-1 block">{MORNING_BRIEFING.readTime}</span>
              </div>

              {/* French Premier */}
              <div className="border-b border-[#e2e2e2] pb-3.5">
                <h4
                  onClick={() => setSelectedArticle(RIGHT_COLUMN_ARTICLES[0])}
                  className="headline-font font-bold text-[14.5px] leading-snug cursor-pointer hover:underline"
                >
                  {RIGHT_COLUMN_ARTICLES[0].headline}
                </h4>
                <p className="summary-font text-xs text-[#555] mt-1">
                  {RIGHT_COLUMN_ARTICLES[0].summary}
                </p>
                <span className="text-[10px] text-[#727272] mt-1 block">{RIGHT_COLUMN_ARTICLES[0].readTime}</span>
              </div>

              {/* Tech Giants Water Usage */}
              <div className="border-b border-[#e2e2e2] pb-3.5">
                <h4
                  onClick={() => setSelectedArticle(RIGHT_COLUMN_ARTICLES[1])}
                  className="headline-font font-bold text-[14.5px] leading-snug cursor-pointer hover:underline"
                >
                  {RIGHT_COLUMN_ARTICLES[1].headline}
                </h4>
                <span className="text-[10px] text-[#727272] mt-1 block">{RIGHT_COLUMN_ARTICLES[1].readTime}</span>
              </div>

              {/* OPINION Section */}
              <div>
                <div className="flex items-center justify-between border-t border-[#121212] pt-2 mb-2">
                  <span className="font-sans font-bold text-xs uppercase tracking-wider text-black">
                    Opinion
                  </span>
                  <button
                    onClick={() => setActiveSection('Opinion')}
                    className="text-[11px] text-[#326891] hover:underline cursor-pointer"
                  >
                    More Opinion →
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Friedman */}
                  <div>
                    <p className="text-[11px] font-sans font-semibold text-[#555]">
                      {OPINION_PIECES[0].authorTitle}
                    </p>
                    <h5
                      onClick={() => setSelectedArticle(OPINION_PIECES[0])}
                      className="headline-font font-bold text-xs leading-snug cursor-pointer hover:underline"
                    >
                      {OPINION_PIECES[0].headline}
                    </h5>
                  </div>

                  {/* Dowd */}
                  <div className="pt-2 border-t border-[#e2e2e2]">
                    <p className="text-[11px] font-sans font-semibold text-[#555]">
                      {OPINION_PIECES[1].authorTitle}
                    </p>
                    <h5
                      onClick={() => setSelectedArticle(OPINION_PIECES[1])}
                      className="headline-font font-bold text-xs leading-snug cursor-pointer hover:underline"
                    >
                      {OPINION_PIECES[1].headline}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* END: MainEditorialContent */}

      {/* BEGIN: SectionCarouselDivider */}
      <section
        className="max-w-[1280px] mx-auto px-4 py-6 border-t-2 border-black"
        data-purpose="editorial-highlights-section"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-extrabold uppercase tracking-wider text-xs text-black">
            In Case You Missed It
          </h2>
          <span className="text-xs font-sans text-[#727272]">Curated journalism from our global bureau</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {IN_CASE_YOU_MISSED_IT.map((item, index) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className={`space-y-1.5 cursor-pointer group ${
                index < IN_CASE_YOU_MISSED_IT.length - 1 ? 'border-b sm:border-b-0 pb-4 sm:pb-0' : ''
              }`}
            >
              <span
                className={`text-[10px] font-bold tracking-wider uppercase font-sans ${
                  item.kickerColor === 'red' ? 'text-[#a81c1c]' : 'text-[#121212]'
                }`}
              >
                {item.kicker}
              </span>
              <h3 className="headline-font font-semibold text-[15px] leading-snug group-hover:underline">
                {item.headline}
              </h3>
              <p className="summary-font text-xs text-[#555]">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
      {/* END: SectionCarouselDivider */}

      {/* BEGIN: SiteFooter */}
      <footer className="max-w-[1280px] mx-auto px-4 mt-8 pt-6 border-t border-[#121212] text-xs font-sans text-[#727272] pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-[#e2e2e2] gap-4">
          <button
            onClick={() => {
              setActiveSection('U.S.');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="masthead-font text-2xl text-black hover:opacity-80 cursor-pointer"
          >
            The New York Times
          </button>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-medium text-black">
            {['NEWS', 'OPINION', 'ARTS', 'LIVING', 'LISTINGS & MORE', 'COOKING', 'WIRE CUTTER', 'GAMES'].map(
              (sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    const mapped = sec === 'WIRE CUTTER' ? 'Wirecutter' : sec.charAt(0) + sec.slice(1).toLowerCase();
                    handleSelectSection(mapped);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {sec}
                </button>
              )
            )}
          </div>
        </div>

        {/* Legal and copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[10.5px] text-[#727272] space-y-2 md:space-y-0">
          <p>© 2026 The New York Times Company</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {[
              'NYTCo',
              'Contact Us',
              'Accessibility',
              'Work with us',
              'Advertise',
              'T Brand Studio',
              'Your Ad Choices',
              'Privacy Policy',
              'Terms of Service',
              'Terms of Sale',
              'Site Map',
              'Help',
              'Subscriptions',
            ].map((link) => (
              <button
                key={link}
                onClick={() => {
                  if (link === 'Subscriptions') setIsSubscribeOpen(true);
                  else if (link === 'Contact Us' || link === 'Help') alert(`${link} - The New York Times customer support.`);
                }}
                className="hover:underline cursor-pointer"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
      {/* END: SiteFooter */}

      {/* MODALS AND DRAWERS */}

      {/* Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenComments={(art) => {
          setActiveCommentsArticle(art);
          setIsCommentsOpen(true);
        }}
        isSaved={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Comments Drawer */}
      <CommentsDrawer
        isOpen={isCommentsOpen}
        article={activeCommentsArticle}
        onClose={() => setIsCommentsOpen(false)}
      />

      {/* Live Game Updates Modal */}
      <LiveGameModal
        isOpen={isLiveGameOpen}
        onClose={() => setIsLiveGameOpen(false)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={allArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Hamburger Navigation Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSection={(sec) => handleSelectSection(sec)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenTodayPaper={() => setIsTodayPaperOpen(true)}
      />

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => {
          setSubscriberEmail('subscriber@nytimes.com');
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => setSubscriberEmail(email)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Today's Paper Print Explorer */}
      <TodayPaperModal
        isOpen={isTodayPaperOpen}
        onClose={() => setIsTodayPaperOpen(false)}
        articles={allArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
      />

      {/* Saved Bookmarks Modal */}
      <SavedArticlesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveSaved={(id) => setSavedArticleIds((prev) => prev.filter((aId) => aId !== id))}
      />
    </div>
  );
}
