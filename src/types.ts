export interface Article {
  id: string;
  headline: string;
  summary: string;
  fullContent?: string[];
  kicker?: string;
  kickerColor?: 'red' | 'blue' | 'black';
  byline?: string;
  readTime?: string;
  commentCount?: number;
  category: 'U.S.' | 'World' | 'Business' | 'Arts' | 'Lifestyle' | 'Opinion' | 'Video' | 'Shows' | 'Games' | 'Cooking' | 'Wirecutter' | 'The Athletic';
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  date?: string;
  isLive?: boolean;
  trendingRank?: number;
  authorTitle?: string;
  authorBio?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  location: string;
  timestamp: string;
  content: string;
  upvotes: number;
  isEditorPick?: boolean;
  userUpvoted?: boolean;
}

export interface LivePlayEvent {
  id: string;
  time: string;
  inning: string;
  description: string;
  score: string;
  highlight?: boolean;
}
