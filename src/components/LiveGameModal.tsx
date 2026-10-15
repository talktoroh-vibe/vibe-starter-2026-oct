import React, { useState } from 'react';
import { MLB_LIVE_GAME } from '../data/newsData';

interface LiveGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveGameModal: React.FC<LiveGameModalProps> = ({ isOpen, onClose }) => {
  const [game, setGame] = useState(MLB_LIVE_GAME);
  const [simulatedCount, setSimulatedCount] = useState(0);

  if (!isOpen) return null;

  const handleSimulatePlay = () => {
    const playDescriptions = [
      'Shohei Ohtani lines a 112-mph RBI double into the right-field corner! Freeman scores from second base!',
      'Devin Williams gets a swinging strikeout with the high changeup for the second out.',
      'Mookie Betts steals third base on a pitch in the dirt; throws skips into the outfield!',
      'Max Muncy draws a full-count walk to load the bases.',
    ];

    const currentDescription = playDescriptions[simulatedCount % playDescriptions.length];
    const isRunScored = simulatedCount % 2 === 0;

    const newPlay = {
      id: `sim-${Date.now()}`,
      time: 'Just now',
      inning: 'Top 8th',
      description: currentDescription,
      score: isRunScored ? `${game.awayTeam.score + 1} - ${game.homeTeam.score} LAD` : `${game.awayTeam.score} - ${game.homeTeam.score} LAD`,
      highlight: true,
    };

    setGame((prev) => ({
      ...prev,
      awayTeam: {
        ...prev.awayTeam,
        score: isRunScored ? prev.awayTeam.score + 1 : prev.awayTeam.score,
        hits: isRunScored ? prev.awayTeam.hits + 1 : prev.awayTeam.hits,
      },
      plays: [newPlay, ...prev.plays],
    }));
    setSimulatedCount((c) => c + 1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-game-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center p-3 sm:p-6"
    >
      <div className="bg-white text-[#121212] w-full max-w-3xl rounded-xs shadow-2xl flex flex-col relative my-auto border border-[#d6d6d6] overflow-hidden max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-[#121212] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse"></span>
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#e63946]">
              NYT Live Sports Reporting
            </span>
            <span className="text-gray-500">·</span>
            <span className="font-sans text-xs text-gray-300">{game.sport}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-xs cursor-pointer"
            aria-label="Close live game"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stadium Photography Header */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black">
          <img
            src={game.imageUrl}
            alt="MLB Playoff Stadium"
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#ecd98e] mb-1">
              National League Championship Series · Game 4
            </span>
            <h2 id="live-game-modal-title" className="headline-font font-bold text-2xl sm:text-3xl leading-tight">
              {game.title}
            </h2>
            <div className="text-xs text-gray-300 font-sans flex items-center justify-between mt-1">
              <span>{game.location}</span>
              <span className="font-semibold text-[#f87171]">{game.statusText}</span>
            </div>
          </div>
        </div>

        {/* Live Scoreboard & Situation Box */}
        <div className="p-5 border-b border-[#e2e2e2] bg-[#fafafa]">
          <div className="grid grid-cols-2 gap-4 items-center bg-white p-4 border border-[#e2e2e2] rounded-xs shadow-2xs">
            {/* Away */}
            <div className="flex items-center justify-between pr-4 border-r border-[#e2e2e2]">
              <div>
                <div className="text-[10px] font-sans uppercase font-bold text-[#727272]">AWAY</div>
                <div className="font-sans font-bold text-lg text-black">{game.awayTeam.name}</div>
                <div className="text-xs text-[#555] font-mono tabular-nums">{game.awayTeam.hits} Hits · {game.awayTeam.errors} Errors</div>
              </div>
              <div className="font-serif font-bold text-4xl text-[#121212] font-mono tabular-nums">{game.awayTeam.score}</div>
            </div>

            {/* Home */}
            <div className="flex items-center justify-between pl-2">
              <div>
                <div className="text-[10px] font-sans uppercase font-bold text-[#727272]">HOME</div>
                <div className="font-sans font-bold text-lg text-black">{game.homeTeam.name}</div>
                <div className="text-xs text-[#555] font-mono tabular-nums">{game.homeTeam.hits} Hits · {game.homeTeam.errors} Errors</div>
              </div>
              <div className="font-serif font-bold text-4xl text-[#121212] font-mono tabular-nums">{game.homeTeam.score}</div>
            </div>
          </div>

          {/* Situation & Diamond Graphic */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-sans text-[#333] gap-3 bg-white p-3 border border-[#e2e2e2] rounded-xs">
            <div className="flex items-center space-x-3">
              {/* Baseball Diamond SVG */}
              <svg className="w-8 h-8 text-gray-300" viewBox="0 0 40 40">
                <rect x="18" y="2" width="6" height="6" transform="rotate(45 20 4)" className="fill-gray-300 stroke-gray-500" />
                {/* 2nd base occupied */}
                <rect x="18" y="2" width="6" height="6" transform="rotate(45 20 4)" className="fill-[#a81c1c] stroke-[#a81c1c]" />
                {/* 3rd base */}
                <rect x="4" y="16" width="6" height="6" transform="rotate(45 6 18)" className="fill-gray-300 stroke-gray-500" />
                {/* 1st base occupied */}
                <rect x="32" y="16" width="6" height="6" transform="rotate(45 34 18)" className="fill-[#a81c1c] stroke-[#a81c1c]" />
                {/* Home */}
                <polygon points="20,36 24,32 24,30 16,30 16,32" className="fill-gray-600" />
              </svg>
              <div>
                <span className="font-bold text-black">{game.inning}</span> · {game.outs} Out
                <span className="text-[#555] block text-[11px]">{game.runners}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <span className="text-[#727272] block text-[10px] uppercase font-bold">At Bat</span>
                <span className="font-semibold text-black">{game.batter}</span>
              </div>
              <div>
                <span className="text-[#727272] block text-[10px] uppercase font-bold">Pitching</span>
                <span className="font-semibold text-black">{game.pitcher}</span>
              </div>
              <div>
                <span className="text-[#727272] block text-[10px] uppercase font-bold">Count</span>
                <span className="font-mono font-bold text-black">{game.count}</span>
              </div>
            </div>

            <button
              onClick={handleSimulatePlay}
              className="bg-[#121212] hover:bg-[#333] text-white text-xs font-sans font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs transition-colors cursor-pointer"
            >
              Simulate Next Pitch ⚡
            </button>
          </div>
        </div>

        {/* Live Play-by-play Stream */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#727272] mb-1">
            Inning-by-Inning Commentary
          </div>

          {game.plays.map((play) => (
            <div
              key={play.id}
              className={`p-3 rounded-xs border text-sm ${
                play.highlight ? 'bg-[#fffdf0] border-[#ecd98e]' : 'bg-white border-[#f0f0f0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-sans text-[#727272] mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#121212]">{play.inning}</span>
                  <span>·</span>
                  <span>{play.time}</span>
                </div>
                <span className="font-mono font-bold text-[#a81c1c] tabular-nums">{play.score}</span>
              </div>
              <p className="summary-font text-xs sm:text-sm text-[#222]">{play.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#fafafa] border-t border-[#e2e2e2] px-5 py-3 flex items-center justify-between text-xs font-sans">
          <span className="text-[#727272]">Dispatches by Tyler Kepner and James Wagner</span>
          <button
            onClick={onClose}
            className="border border-[#bbb] hover:border-black text-black px-3 py-1 rounded-xs cursor-pointer font-medium"
          >
            Close Live Coverage
          </button>
        </div>
      </div>
    </div>
  );
};
