import { Article, Comment } from '../types';

export const MAIN_HERO_ARTICLE: Article = {
  id: 'trump-press-secretary-credentials',
  headline: "Trump’s New Press Secretary: Not-Quite Attorney at Law",
  summary: "Karoline Leavitt told The New York Times that the confusion over her legal credentials is the result of a spring misunderstanding during her tenure with the transition committee.",
  byline: "By MICHAEL S. SCHMIDT and MAGGIE HABERMAN",
  readTime: "7 MIN READ",
  commentCount: 1128,
  category: "U.S.",
  date: "Oct. 14, 2026",
  imageUrl: "/src/assets/images/hero_white_house_press_1792031952592.jpg",
  imageCaption: "Microphones set before the podium in the James S. Brady Press Briefing Room at the White House.",
  imageCredit: "Doug Mills/The New York Times",
  tags: ["Donald Trump", "White House Press Office", "Transition Committee", "Washington"],
  authorTitle: "Senior Investigative Correspondents",
  authorBio: "Michael S. Schmidt and Maggie Haberman report on presidential transitions and federal ethics investigations.",
  fullContent: [
    "WASHINGTON — Karoline Leavitt, recently designated as the White House press secretary for the incoming administration, clarified on Wednesday that her public reference to completing legal credentials had been the result of an administrative misunderstanding stemming from her transition paperwork.",
    "Speaking in an interview with The New York Times, Ms. Leavitt explained that several campaign biographies published earlier in the year mistakenly described her as having finished an executive juris doctorate program.",
    "“There was an unfortunate miscommunication between our communications staff and the legal committee vetting team,” Ms. Leavitt said. “I have always been transparent about the coursework I undertook and my focus on public advocacy and constitutional jurisprudence.”",
    "The clarification comes as scrutiny intensifies around key personnel choices for the president’s communications apparatus. Senior Republican advisers on Capitol Hill expressed confidence that the matter would have little bearing on her ability to helm the daily briefing room podium.",
    "“Karoline has proven herself to be one of the most agile and formidable communicators of our party,” said a senior strategist close to the transition leadership. “She commands the room, understands the president’s agenda down to the comma, and won’t be rattled by bureaucratic clerical noise.”",
    "Still, ethics watchdogs in Washington argued that the discrepancy highlighted recurring questions regarding vetting procedures within the transition council, which has operated with unprecedented speed to staff federal agencies ahead of January."
  ]
};

export const LEFT_COLUMN_ARTICLES: Article[] = [
  {
    id: 'women-leaving-trump-admin',
    headline: "High-Ranking Women Are Leaving the Trump Administration",
    summary: "As the presidential term winds down, those heading for the exits are female officials.",
    readTime: "3 MIN READ",
    commentCount: 412,
    category: "U.S.",
    date: "Oct. 14, 2026",
    byline: "By KATIE ROGERS",
    tags: ["White House", "Cabinet", "U.S. Politics"],
    fullContent: [
      "WASHINGTON — A wave of resignations among top-tier female officials in recent weeks has altered the composition of the West Wing’s senior echelon.",
      "From deputy national security advisers to policy directors across the Domestic Policy Council, several prominent women have submitted their departures ahead of the scheduled transition period.",
      "Interviews with current and former aides indicate that exhausting campaign schedules, differing strategic visions, and private sector offers in finance and defense consulting have prompted the departures.",
      "“Serving at this level demands sacrifice, but many felt their counsel was increasingly sidelined in favor of an insular inner circle,” remarked one outgoing senior policy aide."
    ]
  },
  {
    id: 'steep-rise-sudden-fall-guilfoyle',
    headline: "The Steep Rise and Sudden Fall of Kimberly Guilfoyle",
    summary: "Inside the Trump fundraising machinery, lavish spending and turbulent relationships paved the way for internal friction.",
    readTime: "5 MIN READ",
    commentCount: 854,
    category: "U.S.",
    date: "Oct. 14, 2026",
    byline: "By KENNETH P. VOGEL and REBECCA DAVIS O’BRIEN",
    tags: ["Campaign Finance", "GOP", "Fundraising"],
    fullContent: [
      "PALM BEACH, Fla. — For nearly five years, Kimberly Guilfoyle served as one of the most electrifying and lucrative rainmakers in conservative politics, commanding six-figure speaking fees and orchestrating gala dinners for the party’s elite benefactors.",
      "Yet internal records, financial disclosures, and conversations with two dozen committee insiders paint a portrait of mounting friction over luxury expense reimbursements, vendor contracts, and private jet travel that triggered a quiet sidelining by transition gatekeepers.",
      "Her swift ascent through cable news, state prosecutorial ranks, and political leadership made her an indispensable champion of the populist base. But when audit reviews questioned hundreds of thousands of dollars in promotional overhead, tensions boiled over behind the palm trees of Mar-a-Lago."
    ]
  },
  {
    id: 'fed-holds-rates-steady',
    headline: "Fed Holds Rates Steady Amid Murky Signals on Job Market",
    summary: "Officials left interest rates unchanged while pointing to unexpected resilience in economic consumer outlays.",
    readTime: "4 MIN READ",
    category: "Business",
    date: "Oct. 14, 2026",
    byline: "By JEANNA SMIALEK",
    tags: ["Federal Reserve", "Interest Rates", "Inflation", "Economy"],
    fullContent: [
      "WASHINGTON — Federal Reserve policymakers voted unanimously on Wednesday to maintain their benchmark lending rate, choosing a wait-and-see stance as economic signals continue to diverge.",
      "While hiring cooled across manufacturing and corporate technology sectors over the third quarter, consumer spending has proven unexpectedly robust, buoyed by solid wage retention and travel demand.",
      "“We are navigating in fog, but the ship remains structurally sound,” Federal Reserve Chair Jerome H. Powell stated during his post-meeting news conference, dampening speculation of an imminent rate cut before December."
    ]
  }
];

export const TRENDING_ARTICLES: Article[] = [
  {
    id: 'trending-supreme-court-privacy',
    headline: "Supreme Court Takes Up Key Digital Privacy Dispute",
    summary: "Justices will decide whether warrantless searches of encrypted messaging metadata violate the Fourth Amendment.",
    readTime: "4 MIN READ",
    category: "U.S.",
    trendingRank: 1,
    byline: "By ADAM LIPTAK",
    date: "Oct. 14, 2026",
    fullContent: [
      "WASHINGTON — The Supreme Court agreed on Wednesday to hear a landmark challenge concerning federal access to encrypted communication logs without a warrant.",
      "The case, United States v. Apex Global, centers on whether telecommunications metadata can be subpoenaed directly from cloud storage providers under existing wiretap jurisprudence dating to the 1970s.",
      "Civil liberties advocates hailed the court's review as the most crucial privacy showdown since the Carpenter cellphone location ruling of 2018."
    ]
  },
  {
    id: 'trending-auto-insurance-prices',
    headline: "Why Auto Insurance Prices Are Climbing Out of Reach",
    summary: "Higher repair costs for sensor-laden electric vehicles and extreme weather claims are battering family household budgets.",
    readTime: "5 MIN READ",
    category: "Business",
    trendingRank: 2,
    byline: "By JORDAIN CARNEY",
    date: "Oct. 14, 2026",
    fullContent: [
      "Across the United States, drivers renewing their annual automotive policies are encountering sticker shock of an unprecedented magnitude.",
      "Premiums have surged more than 26 percent on average over the past 18 months, driven by the astronomical cost of replacing digital camera sensors in bumpers and an influx of hurricane and hailstorm claims.",
      "Actuaries warn that the era of modest two-digit monthly insurance coverage may have permanently ended for middle-class car owners."
    ]
  }
];

export const CENTER_SUB_ARTICLES: Article[] = [
  {
    id: 'secret-bank-accounts-georgia',
    headline: "Secret Bank Accounts and Unreported Loans in Georgia Governor Race",
    summary: "State watchdog agents discovered over $2.4 million transferred between shell accounts.",
    kicker: "Investigation",
    kickerColor: "red",
    category: "U.S.",
    readTime: "6 MIN READ",
    byline: "By DANNY HAKIM",
    date: "Oct. 14, 2026",
    imageUrl: "/src/assets/images/georgia_capitol_investigation_1792031952527.jpg",
    imageCaption: "The Georgia State Capitol in Atlanta, where state ethics regulators opened the formal investigation.",
    imageCredit: "Audra Melton for The New York Times",
    fullContent: [
      "ATLANTA — An inquiry initiated by Georgia's Government Transparency and Campaign Finance Commission has uncovered an intricate labyrinth of non-profit entities funneled into gubernatorial super PACs.",
      "Banking records obtained by state investigators show wire transfers originating from offshore LLCs and registered agent fronts in Delaware, earmarked for negative television advertising buys during the contentious primary.",
      "Both campaigns have denied direct knowledge of the transfer conduits, but subpoenas issued to three financial institutions indicate the probe has entered an aggressive grand jury phase."
    ]
  },
  {
    id: 'arctic-battle-defense-alliances',
    headline: "How the Battle Over the Arctic Is Shaping New Defense Alliances",
    summary: "Melting sea ice has accelerated mineral claims and submarine naval deployments.",
    kicker: "Analysis",
    kickerColor: "blue",
    category: "World",
    readTime: "6 MIN READ",
    byline: "By STEVEN ERLANGER and HELENE COOPER",
    date: "Oct. 14, 2026",
    imageUrl: "/src/assets/images/arctic_naval_patrol_1792031952296.jpg",
    imageCaption: "A polar patrol vessel navigating shipping lanes near the Svalbard archipelago.",
    imageCredit: "Sergey Ponomarev for The New York Times",
    fullContent: [
      "TROMSØ, Norway — Above the Arctic Circle, the thinning of perennial polar ice sheets has unlocked strategic passages once blocked for nine months out of the year.",
      "In response, NATO allies and Nordic partners are constructing deep-water listening arrays and staging high-altitude fighter patrols along the Barents Sea rim, where Russian icebreakers have dramatically increased their escort operations for commercial rare-earth convoys.",
      "Military planners describe the Northern Sea Route not merely as a commercial shortcut, but as the 21st century's most contested frontier of sovereign sovereignty."
    ]
  }
];

export const RIGHT_COLUMN_ARTICLES: Article[] = [
  {
    id: 'french-premier-no-confidence',
    headline: "French Premier Confronts No-Confidence Ballot in Stormy Session",
    summary: "Lawmakers in Paris debate the newly submitted emergency pension reform legislation.",
    readTime: "3 MIN READ",
    category: "World",
    byline: "By AURELIEN BREEDEN",
    date: "Oct. 14, 2026",
    fullContent: [
      "PARIS — Shouts and desk-thumping echoed across the Palais Bourbon on Wednesday as France's Prime Minister stood at the rostrum to defend an emergency deficit mitigation package against a combined left-right opposition motion.",
      "If the no-confidence vote succeeds, the government will fall, triggering fresh legislative elections and plunging the European Union’s second-largest economy into protracted political deadlock."
    ]
  },
  {
    id: 'tech-giants-water-usage-data-centers',
    headline: "Tech Giants Agree to New Water Usage Standards in Data Center Corridors",
    summary: "New cooling frameworks aim to mitigate severe regional aquifer depletion caused by generative AI clusters.",
    readTime: "4 MIN READ",
    category: "Business",
    byline: "By KADE METZ and KAREN WEISE",
    date: "Oct. 14, 2026",
    fullContent: [
      "PHOENIX — Four of the world's largest cloud computing providers signed a landmark accord with Southwestern municipal water boards on Wednesday, pledging to retrofit high-density AI server farms with closed-loop dry cooling infrastructure.",
      "The agreement follows years of acrimony from drought-stricken agricultural communities who watched billions of gallons of culinary water diverted into hyper-scale cooling towers."
    ]
  }
];

export const OPINION_PIECES: Article[] = [
  {
    id: 'friedman-geopolitical-earthquake',
    headline: "The Geopolitical Earthquake No One Is Preparing For",
    summary: "Why the quiet decoupling of supply lines in the Indo-Pacific will fundamentally reshape American grocery shelves and factory floors before the decade is out.",
    authorTitle: "THOMAS L. FRIEDMAN",
    authorBio: "Foreign Affairs Opinion Columnist, Three-Time Pulitzer Winner",
    category: "Opinion",
    date: "Oct. 14, 2026",
    readTime: "5 MIN READ",
    byline: "By THOMAS L. FRIEDMAN",
    fullContent: [
      "If you spend a week talking to semiconductor foundry chiefs in Hsinchu and logistics captains in Singapore, you quickly realize that the conversation taking place in Washington is about three years behind the curve.",
      "The global economy isn't simply diversifying; it is bifurcating into two mutually exclusive operating systems with distinct firmware, proprietary shipping corridors, and non-negotiable security protocols.",
      "We are entering an epoch where economic efficiency is entirely subordinate to sovereign redundancy. Get ready for a world that is slower, more expensive, and far more prone to strategic tremors."
    ]
  },
  {
    id: 'dowd-pennsylvania-avenue-drama',
    headline: "Drama on Pennsylvania Avenue Has Reached Its Final Act",
    summary: "Behind the marble columns, the grand tragicomedy of political survival plays out with familiar theatrics and fading applause.",
    authorTitle: "MAUREEN DOWD",
    authorBio: "Opinion Columnist and Author of 'Are Men Necessary?'",
    category: "Opinion",
    date: "Oct. 14, 2026",
    readTime: "4 MIN READ",
    byline: "By MAUREEN DOWD",
    fullContent: [
      "In the capital of illusions, every sunset is treated like a Shakespearean curtain call, and every staff memo is leaked as though it were the Rosetta Stone of palace intrigue.",
      "As staffers discreetly box up their framed newspaper clippings and commemorative pens, the mood resembles the final days of an over-budget Broadway musical where the cast is tired, the reviews were mixed, but nobody wants to leave the theater just yet."
    ]
  }
];

export const IN_CASE_YOU_MISSED_IT: Article[] = [
  {
    id: 'century-of-jazz-wax-recordings',
    headline: "A Century of Jazz: The Record Store Preserving Rare Wax Recordings",
    summary: "How Greenwich Village became the heartbeat of archival jazz preservationists.",
    kicker: "Arts & Leisure",
    kickerColor: "red",
    category: "Arts",
    readTime: "5 MIN READ",
    byline: "By GIOVANNI RUSSONELLO",
    date: "Oct. 14, 2026",
    fullContent: [
      "Down a narrow flight of stone steps off Bleecker Street, inside a subterranean room smelling of shellac and lemon polish, Peter Drummond gently places a sapphire needle onto a 1927 acetate disc.",
      "Out of the speaker crackles the unmistakable, honeyed cornet vibrato of Bix Beiderbecke playing in an East 44th Street studio nearly a century ago.",
      "In an era of disposable algorithmic streaming, Drummond's shop represents one of the final independent sanctuaries holding physical audio masters from jazz's golden century."
    ]
  },
  {
    id: '21-easy-weeknight-dinners-pantry',
    headline: "21 Easy Weeknight Dinners That Rely on Your Pantry Staples",
    summary: "Crispy chickpeas, garlicky tomato pastas, and 15-minute white-bean stews.",
    kicker: "Cooking",
    category: "Cooking",
    readTime: "4 MIN READ",
    byline: "By ALI SLAGLE",
    date: "Oct. 14, 2026",
    fullContent: [
      "When the refrigerator looks bare after a long workday, the secret isn't ordering expensive takeout — it's looking into the back row of your kitchen cabinets.",
      "With a tin of chickpeas, a jar of sun-dried tomatoes, coarse sea salt, and good olive oil, a restaurant-caliber dinner can be on the table in less than twenty minutes.",
      "Here are 21 foolproof, forgiving recipes developed in the NYT Cooking test kitchen that transform canned legumes and dry grains into weeknight culinary triumphs."
    ]
  },
  {
    id: 'autonomous-drones-rural-healthcare',
    headline: "Can Autonomous Drones Revolutionize Modern Rural Healthcare?",
    summary: "Delivering critical blood supplies across mountain passes in minutes.",
    kicker: "Technology",
    category: "Lifestyle",
    readTime: "6 MIN READ",
    byline: "By EMILY FLITTER",
    date: "Oct. 14, 2026",
    fullContent: [
      "In the rugged highlands of southern Appalachia, where winding roads can turn a 15-mile hospital transfer into a treacherous two-hour drive, autonomous electric drones are rewriting emergency medical logistics.",
      "Equipped with insulated thermal pods, the fixed-wing flyers take off vertically from regional hubs, cruising at 80 miles per hour to deliver rare antivenoms, O-negative blood packs, and cardiac pharmaceuticals directly to rural clinics.",
      "State health authorities report a 40 percent drop in delivery times during emergency trauma situations."
    ]
  },
  {
    id: 'best-espresso-machines-wirecutter',
    headline: "The Best Espressomachines for Kitchen Countertop Connoisseurs",
    summary: "We pulled 1,200 shots over three months to find these top selections.",
    kicker: "Wirecutter",
    category: "Wirecutter",
    readTime: "8 MIN READ",
    byline: "By MARGUERITE PRESTON",
    date: "Oct. 14, 2026",
    fullContent: [
      "After three months of continuous espresso extraction, measuring brew boiler temperature stability to within 0.1 degrees Celsius and testing over 40 pounds of single-origin beans, our team identified the definitive home espresso champions.",
      "Whether you desire one-touch dual boiler perfection or the tactical craftsmanship of a manual lever machine, our comprehensive tests uncover which models justify their premium footprint on your kitchen counter."
    ]
  }
];

export const MORNING_BRIEFING: Article = {
  id: 'morning-briefing-oct-14',
  headline: "Catch Up on Today’s Biggest Stories Around the Globe",
  summary: "Here is what you need to know to start your Wednesday: diplomatic summits in Geneva, key earnings season benchmarks, and autumn storm patterns.",
  kicker: "The Morning Briefing",
  category: "World",
  readTime: "5 MIN READ",
  byline: "By MATTHEW SCHNEIER",
  date: "Oct. 14, 2026",
  fullContent: [
    "Good morning. Today we are tracking diplomatic maneuvers in Geneva, high-stakes technology earnings on Wall Street, and severe weather warnings across the upper Midwest.",
    "1. Diplomatic talks in Switzerland: European and Pacific diplomats convened for closed-door discussions on security protocols.",
    "2. Tech earnings preview: The S&P 500 hovered near record territory as investors await forward guidance from AI infrastructure suppliers.",
    "3. Climate and weather: A strong polar jet stream displacement is bringing premature snowfall to the northern plains.",
    "What else we are following: New archival audio exhibits in New York, and the best books of the autumn season."
  ]
};

export const MLB_LIVE_GAME = {
  id: 'dodgers-brewers-game-4',
  title: "Dodgers Take on Brewers in Crucial Game 4",
  sport: "MLB NLCS",
  location: "American Family Field, Milwaukee, WI",
  imageUrl: "/src/assets/images/mlb_dodgers_playoffs_1792031953654.jpg",
  homeTeam: { name: "Milwaukee Brewers", score: 4, hits: 7, errors: 0, code: "MIL" },
  awayTeam: { name: "Los Angeles Dodgers", score: 5, hits: 8, errors: 1, code: "LAD" },
  inning: "Top 8th",
  outs: 1,
  runners: "Runners on 1st & 2nd",
  pitcher: "Devin Williams (MIL)",
  batter: "Shohei Ohtani (LAD)",
  count: "2-2",
  statusText: "LIVE · Game 4 (LAD leads series 2-1)",
  plays: [
    { id: 'p1', time: '9:42 PM', inning: 'Top 8th', description: 'Ohtani fouls off a 96 mph cutter into the third base stands.', score: '5 - 4 LAD', highlight: false },
    { id: 'p2', time: '9:39 PM', inning: 'Top 8th', description: 'Mookie Betts draws a 5-pitch walk; Freeman advances to second base.', score: '5 - 4 LAD', highlight: false },
    { id: 'p3', time: '9:34 PM', inning: 'Top 8th', description: 'Freddie Freeman singles sharply up the middle off Devin Williams.', score: '5 - 4 LAD', highlight: true },
    { id: 'p4', time: '9:25 PM', inning: 'Bottom 7th', description: 'William Contreras strikes out swinging to strand two Brewers runners!', score: '5 - 4 LAD', highlight: true },
    { id: 'p5', time: '9:12 PM', inning: 'Top 7th', description: 'Teoscar Hernández homers 412 ft to deep left field! Dodgers take the lead!', score: '5 - 4 LAD', highlight: true },
    { id: 'p6', time: '8:48 PM', inning: 'Bottom 5th', description: 'Christian Yelich hits a two-run double into the right-field corner.', score: '4 - 4 TIE', highlight: true }
  ]
};

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    articleId: 'trump-press-secretary-credentials',
    author: "Eleanor Vance",
    location: "Philadelphia, PA",
    timestamp: "2 hours ago",
    content: "The level of casual carelessness regarding executive credentials is breathtaking. In any corporate or academic environment, misrepresenting a law degree would result in immediate disciplinary review.",
    upvotes: 382,
    isEditorPick: true
  },
  {
    id: 'c2',
    articleId: 'trump-press-secretary-credentials',
    author: "Richard H.",
    location: "Denver, CO",
    timestamp: "3 hours ago",
    content: "Schmidt and Haberman once again deliver rigorous reporting. The details about the internal transition disputes explain a great deal about the sudden messaging course-corrections.",
    upvotes: 219,
    isEditorPick: true
  },
  {
    id: 'c3',
    articleId: 'trump-press-secretary-credentials',
    author: "Marcus Aurelius B.",
    location: "Chicago, IL",
    timestamp: "1 hour ago",
    content: "Whether it was an administrative oversight or deliberate embellishment, press secretaries are paid to be meticulous with every syllable. Not an encouraging precedent.",
    upvotes: 147,
    isEditorPick: false
  },
  {
    id: 'c4',
    articleId: 'women-leaving-trump-admin',
    author: "Sarah Jenkins",
    location: "Washington, D.C.",
    timestamp: "4 hours ago",
    content: "Having worked on Capitol Hill for a decade, seeing this degree of turnover right at the close of an administration is striking. People aren't waiting for the transition parade.",
    upvotes: 184,
    isEditorPick: true
  },
  {
    id: 'c5',
    articleId: 'steep-rise-sudden-fall-guilfoyle',
    author: "David L.",
    location: "San Francisco, CA",
    timestamp: "5 hours ago",
    content: "The high-roller fundraising circuit in Florida has always been notorious for eye-watering overhead costs, but this investigative piece reveals just how fast the party turned cold.",
    upvotes: 301,
    isEditorPick: true
  }
];
