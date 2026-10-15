import React, { useState } from 'react';
import { Article, Comment } from '../types';
import { MOCK_COMMENTS } from '../data/newsData';

interface CommentsDrawerProps {
  isOpen: boolean;
  article: Article | null;
  onClose: () => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  article,
  onClose,
}) => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [tab, setTab] = useState<'all' | 'editor' | 'popular'>('all');
  const [authorName, setAuthorName] = useState('');
  const [authorLocation, setAuthorLocation] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen || !article) return null;

  const filteredComments = comments.filter((c) => {
    if (tab === 'editor') return c.isEditorPick;
    if (tab === 'popular') return c.upvotes > 200;
    return true;
  });

  const handleUpvote = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const delta = c.userUpvoted ? -1 : 1;
          return {
            ...c,
            upvotes: c.upvotes + delta,
            userUpvoted: !c.userUpvoted,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      articleId: article.id,
      author: authorName.trim() || 'Reader in New York',
      location: authorLocation.trim() || 'New York, NY',
      timestamp: 'Just now',
      content: newCommentText.trim(),
      upvotes: 1,
      userUpvoted: true,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comments-drawer-title"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
    >
      <div className="bg-white text-[#121212] w-full max-w-xl h-full shadow-2xl flex flex-col relative animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2e2e2] flex items-center justify-between bg-white">
          <div>
            <h2 id="comments-drawer-title" className="headline-font font-bold text-xl text-black">
              Reader Discussion
            </h2>
            <p className="summary-font text-xs text-[#666] truncate max-w-md mt-0.5">
              {article.headline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded cursor-pointer"
            aria-label="Close comments"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="border-b border-[#e2e2e2] px-5 flex space-x-6 text-xs font-sans font-semibold">
          <button
            onClick={() => setTab('all')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              tab === 'all' ? 'border-black text-black' : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            All Comments ({comments.length})
          </button>
          <button
            onClick={() => setTab('editor')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              tab === 'editor' ? 'border-black text-black' : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            NYT Picks ({comments.filter((c) => c.isEditorPick).length})
          </button>
          <button
            onClick={() => setTab('popular')}
            className={`py-2.5 border-b-2 cursor-pointer transition-colors ${
              tab === 'popular' ? 'border-black text-black' : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            Reader Picks
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="border-b border-[#f0f0f0] pb-4">
              <div className="flex items-center justify-between text-xs font-sans text-[#727272] mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#121212]">{comment.author}</span>
                  <span>·</span>
                  <span>{comment.location}</span>
                </div>
                <span>{comment.timestamp}</span>
              </div>

              {comment.isEditorPick && (
                <div className="inline-block bg-[#f4f7f6] border border-[#a3c2b8] text-[#1a5b4c] text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs mb-2">
                  ★ NYT Pick
                </div>
              )}

              <p className="summary-font text-[13.5px] text-[#222] leading-relaxed">
                {comment.content}
              </p>

              <div className="mt-2.5 flex items-center justify-between text-xs font-sans">
                <button
                  onClick={() => handleUpvote(comment.id)}
                  className={`flex items-center space-x-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                    comment.userUpvoted
                      ? 'text-[#326891] bg-blue-50 font-bold'
                      : 'text-[#727272] hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <span>▲</span>
                  <span>Recommend ({comment.upvotes})</span>
                </button>
                <button className="text-[#727272] hover:text-black cursor-pointer hover:underline">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* New Comment Submission Box */}
        <div className="p-4 bg-[#fafafa] border-t border-[#e2e2e2]">
          <form onSubmit={handleAddComment} className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="p-2 border border-[#ccc] rounded bg-white focus:outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="City, State"
                value={authorLocation}
                onChange={(e) => setAuthorLocation(e.target.value)}
                className="p-2 border border-[#ccc] rounded bg-white focus:outline-none focus:border-black"
              />
            </div>
            <textarea
              rows={2}
              placeholder="What are your thoughts on this story? Comments are moderated for community guidelines."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full p-2 border border-[#ccc] rounded bg-white text-xs font-sans focus:outline-none focus:border-black resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#727272] font-sans">
                Please maintain respectful civil discourse.
              </span>
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-[#121212] hover:bg-[#333] disabled:opacity-40 text-white text-xs font-sans font-bold uppercase tracking-wider px-4 py-1.5 rounded cursor-pointer transition-colors"
              >
                Submit Comment
              </button>
            </div>
            {submittedMessage && (
              <div className="text-xs text-green-700 font-sans mt-1">
                ✓ Your comment has been posted to the reader discussion.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
