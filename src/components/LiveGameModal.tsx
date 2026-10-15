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
    const newPlay = {
      id: `sim-${Date.now()}`,
      time: 'Just now',
      inning: 'Top 8th',
      description:
        simulatedCount % 2 === 0
          ? 'Ohtani lines a 112 mph RBI double into the right-field gap! Freeman scores from second! Dodgers lead 6-4!'
          : 'Devin Williams gets a swinging strikeout with the changeup for the second out.',
      score: simulatedCount % 2 === 0 ? '6 - 4 LAD' : '5 - 4 LAD',
      highlight: true,
    };

    setGame((prev) => ({
      ...prev,
      awayTeam: {
        ...prev.awayTeam,
        score: simulatedCount % 2 === 0 ? prev.awayTeam.score + 1 : prev.awayTeam.score,
        hits: simulatedCount % 2 === 0 ? prev.awayTeam.hits + 1 : prev.awayTeam.hits,
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6"
    >
      <div className="bg-white text-[#121212] w-full max-w-3xl rounded-md shadow-2xl flex flex-col relative my-auto border border-[#d6d6d6] overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#121212] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse"></span>
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#e63946]">
              NYT Live Sports Reporting
            </span>
            <span className="text-gray-400">·</span>
            <span className="font-sans text-xs text-gray-300">{game.sport}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded cursor-pointer"
            aria-label="Close live game"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Headline & Location */}
        <div className="p-6 border-b border-[#e2e2e2]">
          <h2 id="live-game-modal-title" className="headline-font font-bold text-2xl text-black mb-1">
            MLB Playoffs: {game.title}
          </h2>
          <div className="text-xs text-[#727272] font-sans flex items-center justify-between">
            <span>{game.location}</span>
            <span className="font-semibold text-[#a81c1c]">{game.statusText}</span>
          </div>

          {/* Live Scoreboard */}
          <div className="mt-4 bg-[#f8f9fa] border border-[#e2e2e2] rounded-sm p-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              {/* Away */}
              <div className="flex items-center justify-between pr-4 border-r border-[#e2e2e2]">
                <div>
                  <div className="text-xs font-sans text-[#727272]">AWAY</div>
                  <div className="font-sans font-bold text-lg text-black">{game.awayTeam.name}</div>
                  <div className="text-xs text-[#555]">8 Hits · 1 Error</div>
                </div>
                <div className="font-serif font-bold text-4xl text-[#121212]">{game.awayTeam.score}</div>
              </div>

              {/* Home */}
              <div className="flex items-center justify-between pl-2">
                <div>
                  <div className="text-xs font-sans text-[#727272]">HOME</div>
                  <div className="font-sans font-bold text-lg text-black">{game.homeTeam.name}</div>
                  <div className="text-xs text-[#555]">7 Hits · 0 Errors</div>
                </div>
                <div className="font-serif font-bold text-4xl text-[#121212]">{game.homeTeam.score}</div>
              </div>
            </div>

            {/* Current At-Bat Bar */}
            <div className="mt-4 pt-3 border-t border-[#e2e2e2] flex flex-wrap items-center justify-between text-xs font-sans text-[#333] gap-2 bg-white px-3 py-2 rounded">
              <div>
                <span className="font-semibold text-black">At Bat:</span> {game.batter}
              </div>
              <div>
                <span className="font-semibold text-black">Pitching:</span> {game.pitcher}
              </div>
              <div>
                <span className="font-semibold text-black">Count:</span> {game.count}
              </div>
              <div>
                <span className="font-semibold text-black">Situation:</span> {game.runners} ({game.outs} Out)
              </div>
            </div>
          </div>

          {/* Interactive Simulation Button */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-green-700 font-sans flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span>Live pitch stream connected</span>
            </span>
            <button
              onClick={handleSimulatePlay}
              className="text-xs font-sans bg-[#326891] hover:bg-[#204a6e] text-white px-3 py-1.5 rounded cursor-pointer transition-colors"
            >
              Simulate Next Pitch / Play ⚡
            </button>
          </div>
        </div>

        {/* Live Play-by-play Stream */}
        <div className="p-6 max-h-[350px] overflow-y-auto space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#727272] mb-2">
            Inning-by-Inning Commentary & Key Plays
          </div>

          {game.plays.map((play) => (
            <div
              key={play.id}
              className={`p-3 rounded border text-sm ${
                play.highlight
                  ? 'bg-[#fffdf0] border-[#ecd98e]'
                  : 'bg-white border-[#f0f0f0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-sans text-[#727272] mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#121212]">{play.inning}</span>
                  <span>·</span>
                  <span>{play.time}</span>
                </div>
                <span className="font-mono font-semibold text-[#a81c1c]">{play.score}</span>
              </div>
              <p className="summary-font text-xs sm:text-sm text-[#222]">{play.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#fafafa] border-t border-[#e2e2e2] px-6 py-3 flex items-center justify-between text-xs font-sans">
          <span className="text-[#727272]">Coverage by Tyler Kepner and James Wagner</span>
          <button
            onClick={onClose}
            className="bg-black hover:bg-[#333] text-white px-4 py-1.5 rounded text-xs font-semibold cursor-pointer"
          >
            Close Live Coverage
          </button>
        </div>
      </div>
    </div>
  );
};
