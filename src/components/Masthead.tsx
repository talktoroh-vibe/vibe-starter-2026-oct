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
      {/* Editorial Motto & Date Stamp */}
      <div className="hidden md:flex items-center justify-between text-[9.5px] font-sans uppercase tracking-widest text-[#727272] pt-1">
        <span>“All the News That’s Fit to Print”</span>
        <span>VOL. CLXXVI ... No. 60,312</span>
        <span>Late Edition</span>
      </div>

      {/* Iconic NYT Masthead */}
      <div className="text-center py-2 relative">
        <button
          onClick={onResetToFrontPage}
          className="group inline-block focus:outline-none cursor-pointer"
          aria-label="The New York Times Homepage"
        >
          <h1 className="masthead-font text-5xl sm:text-6xl md:text-7xl lg:text-[78px] tracking-[-0.02em] leading-none text-black select-none group-hover:opacity-90 transition-opacity drop-shadow-xs">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Navigation Section Bar with Classic Double Hairline Borders */}
      <div className="border-t border-b border-[#121212] py-1.5 mt-1">
        <nav className="flex items-center justify-between text-[11px] font-sans font-medium text-[#121212] tracking-normal overflow-x-auto whitespace-nowrap scrollbar-none px-1">
          {sections.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => onSelectSection(section)}
                className={`px-2 py-0.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'font-bold underline text-black decoration-1 underline-offset-4'
                    : 'hover:underline text-[#121212] hover:text-[#555]'
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
