import React from 'react';

interface MastheadProps {
  onResetToFrontPage: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  onResetToFrontPage,
  activeSection,
  onSelectSection,
}) => {
  const sections = [
    'U.S.',
    'World',
    'Business',
    'Arts',
    'Lifestyle',
    'Opinion',
    'Video',
    'Shows',
    'Games',
    'Cooking',
    'Wirecutter',
    'The Athletic',
  ];

  return (
    <header className="max-w-[1280px] mx-auto px-4 pt-1 pb-2">
      {/* Iconic NYT Masthead */}
      <div className="text-center py-2 relative">
        <button
          onClick={onResetToFrontPage}
          className="group inline-block focus:outline-none cursor-pointer"
          aria-label="The New York Times Homepage"
        >
          <h1 className="masthead-font text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-none text-black select-none group-hover:opacity-90 transition-opacity">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Navigation Section Bar */}
      <div className="border-t border-b border-[#121212] py-1.5 mt-2">
        <nav className="flex items-center justify-between text-[11px] font-sans font-medium text-[#121212] tracking-normal overflow-x-auto whitespace-nowrap scrollbar-none px-1">
          {sections.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => onSelectSection(section)}
                className={`px-2 py-0.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'font-bold underline text-black'
                    : 'hover:underline text-[#121212]'
                }`}
              >
                {section}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Secondary hairline delimiter */}
      <div className="border-b border-[#e2e2e2] pt-[1px] mb-3"></div>
    </header>
  );
};
