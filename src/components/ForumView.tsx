import React, { useState, useEffect } from 'react';
import { ForumPost, ForumComment } from '../types';
import { ThumbsUp, MessageSquare, Share2, Image, Link as LinkIcon, Send, Sparkles, CheckCircle2, Pencil, Trash2, Check, X, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForumView() {
  const { currentUser, setShowAuthModal, setAuthModalTab } = useAuth();

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('fptu_assistance_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [postContent, setPostContent] = useState('');
  
  // Comment typing states
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});
  
  // Expansion state to view comments
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});

  const [notification, setNotification] = useState<string | null>(null);

  // Edit states
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  // Save to localStorage when posts change
  useEffect(() => {
    localStorage.setItem('fptu_assistance_posts', JSON.stringify(posts));
  }, [posts]);

  // Submit Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    let finalAuthor = 'Ẩn danh';
    let finalAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(7)}`;
    let currentUserId: string | undefined = undefined;

    if (currentUser) {
      finalAuthor = currentUser.fullName;
      finalAvatar = currentUser.avatarSeed;
      currentUserId = currentUser.id;
    } else {
      finalAuthor = authorName.trim() || 'Ẩn danh (Khách)';
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: finalAuthor,
      avatarSeed: finalAvatar,
      content: postContent,
      category: 'general',
      likes: 0,
      likedByMe: false,
      comments: [],
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN'),
      isOwn: true,
      userId: currentUserId
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setAuthorName('');
    
    // Show temporary success feedback
    setNotification('Đăng bài thành công!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Like Toggle
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByMe;
        return {
          ...post,
          likedByMe: liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  // Expand Comments Toggle
  const toggleComments = (postId: string) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId]
    });
  };

  // Submit Comment
  const handleCreateComment = (postId: string) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    let finalAuthor = 'Ẩn danh';
    let finalAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(7)}`;
    let currentUserId: string | undefined = undefined;

    if (currentUser) {
      finalAuthor = currentUser.fullName;
      finalAvatar = currentUser.avatarSeed;
      currentUserId = currentUser.id;
    } else {
      finalAuthor = 'Khách viếng thăm';
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: ForumComment = {
          id: `comment-${Date.now()}`,
          author: finalAuthor,
          avatarSeed: finalAvatar,
          content: text.trim(),
          createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          userId: currentUserId
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    // Reset comment field
    setCommentText({
      ...commentText,
      [postId]: ''
    });

    // Auto-expand comments
    setExpandedComments({
      ...expandedComments,
      [postId]: true
    });
  };

  // Start editing a post
  const startEdit = (postId: string, content: string) => {
    setEditingPostId(postId);
    setEditingContent(content);
  };

  // Save edited post
  const handleSaveEdit = (postId: string) => {
    if (!editingContent.trim()) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          content: editingContent.trim()
        };
      }
      return post;
    }));
    setEditingPostId(null);
    setEditingContent('');
    setNotification('Đã cập nhật bài viết!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingContent('');
  };

  // Delete a post
  const handleDeletePost = (postId: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá bài viết này không?')) {
      setPosts(posts.filter(post => post.id !== postId));
      setNotification('Đã xoá bài viết!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in max-w-5xl mx-auto mt-6 font-retro">
      
      {/* Intro Header Section */}
      <div className="text-center space-y-3">
        <h1 className="font-display font-bold text-lg sm:text-xl text-[#FF9C2A] uppercase tracking-wide leading-none">
          [ DIỄN ĐÀN SINH VIÊN ]
        </h1>
        <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed">
          Kết nối với hàng ngàn sinh viên khác tại FUDA Đà Nẵng, chia sẻ kinh nghiệm thích nghi và bứt phá học đường.
        </p>
      </div>

      {/* Success Notification Alert */}
      {notification && (
        <div className="bg-[#9DD044] border-2 border-black p-3 flex items-center space-x-2 text-black text-[10px] font-bold uppercase max-w-sm mx-auto animate-bounce font-display">
          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Layout: Left (Post Form), Right (Post Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Create Post Form Card (Left Column) */}
        <div className="lg:col-span-5 bg-white border-4 border-[#FF9C2A] p-6 pixel-shadow-orange space-y-6 text-black">
          <div>
            <h3 className="font-display font-bold text-xs text-[#FF9C2A] uppercase tracking-wider font-display">
              Đăng bài mới
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Bạn có câu hỏi hay tâm sự gì? Hãy đăng tại đây!
            </p>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-4">
            
            {/* User identification header inside form */}
            {currentUser ? (
              <div className="flex items-center space-x-2.5 p-3 bg-slate-50 border-2 border-[#FF9C2A] rounded-none">
                <img
                  src={currentUser.avatarSeed}
                  alt={currentUser.fullName}
                  className="w-8 h-8 bg-white border border-[#FF9C2A] shrink-0"
                />
                <div>
                  <span className="text-[8px] font-display uppercase font-bold text-slate-500 block tracking-wider">ĐANG ĐĂNG VỚI TƯ CÁCH</span>
                  <span className="text-xs font-bold text-black">{currentUser.fullName} (@{currentUser.username})</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Warning / Call to Action */}
                <div className="p-3 bg-slate-50 border-2 border-[#FF9C2A] text-black text-xs leading-relaxed font-retro">
                  🔒 Bạn đang ở trạng thái Khách. Bài viết sẽ được gắn nhãn ẩn danh và không thể quản lý lâu dài. 
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalTab('login');
                      setShowAuthModal(true);
                    }}
                    className="text-[#FF9C2A] font-bold underline ml-1 cursor-pointer hover:text-black"
                  >
                    Đăng nhập ngay
                  </button>
                </div>

                {/* Name Input for Guest */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-display text-[9px] block">Biệt danh của bạn</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: K22 Đà Nẵng, Sinh viên ẩn danh..."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border-2 border-slate-200 bg-white text-black text-xs focus:outline-none focus:border-[#FF9C2A] font-sans"
                  />
                </div>
              </div>
            )}

            {/* Content Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-display text-[9px] block">Nội dung bài viết</label>
              <textarea
                placeholder="Chia sẻ suy nghĩ, nỗi sốc hay thắc mắc của bạn tại đây..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
                required
                className="w-full px-3.5 py-2.5 border-2 border-slate-200 bg-white text-black text-xs focus:outline-none focus:border-[#FF9C2A] font-sans"
              ></textarea>
            </div>

            {/* Form actions */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex space-x-2 text-slate-600">
                <button
                  type="button"
                  title="Thêm hình ảnh (minh hoạ)"
                  onClick={() => alert('Chức năng tải ảnh trực tuyến tự động lưu trữ trong session của bạn.')}
                  className="p-2 border border-transparent hover:border-black hover:text-black transition-colors"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 font-display font-bold text-[10px] uppercase text-black border-2 border-black pixel-shadow-orange cursor-pointer transition-all"
              >
                Đăng bài
              </button>
            </div>

          </form>
        </div>

        {/* Post Feed List (Right Column) */}
        <div className="lg:col-span-7 space-y-6 text-black">
          {posts.map((post) => {
            // Determine if current user is owner of the post
            const isPostOwner = currentUser 
              ? post.userId === currentUser.id 
              : post.isOwn && !post.userId;

            return (
              <div key={post.id} className="bg-white border-4 border-[#FF9C2A] p-6 pixel-shadow-orange space-y-4 text-black">
                
                {/* Header: Author + Avatar + Options */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.avatarSeed}
                      alt={post.author}
                      className="w-10 h-10 border-2 border-black bg-slate-100"
                    />
                    <div>
                      <h4 className="font-display font-bold text-[11px] text-black flex items-center gap-1.5 uppercase">
                        <span>{post.author}</span>
                        {post.userId && (
                          <span className="text-[8px] bg-[#FF9C2A] text-black border-2 border-black px-1.5 py-0.5 font-display font-bold uppercase tracking-wider scale-95">
                            Đã xác minh
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-[#FF9C2A] font-mono">{post.createdAt}</span>
                    </div>
                  </div>

                  {/* Edit & Delete Controls for verified owner */}
                  {isPostOwner && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => startEdit(post.id, post.content)}
                        title="Chỉnh sửa"
                        className="p-1 text-slate-400 hover:text-[#FF9C2A] hover:bg-slate-100 border border-transparent transition-all cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        title="Xoá bài viết"
                        className="p-1 text-slate-400 hover:text-[#FF9C2A] hover:bg-slate-100 border border-transparent transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                {editingPostId === post.id ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={4}
                      required
                      className="w-full px-3.5 py-2.5 border-2 border-black bg-white text-black text-xs focus:outline-none font-sans"
                    />
                    <div className="flex justify-end space-x-2 font-display text-[9px]">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 border-2 border-slate-300 hover:border-black text-slate-700 uppercase transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3 mr-1 inline" /> Huỷ
                      </button>
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="px-3 py-1.5 bg-[#9DD044] text-black border-2 border-black uppercase transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3 mr-1 inline" /> Lưu thay đổi
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                    {post.content}
                  </p>
                )}

                {/* Footer Actions Row */}
                <div className="flex items-center space-x-6 pt-3 border-t-2 border-slate-100 text-[10px] text-slate-500 font-display uppercase tracking-wider">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      post.likedByMe ? 'text-[#FF9C2A] font-bold' : 'hover:text-black'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${post.likedByMe ? 'fill-[#FF9C2A]' : ''}`} />
                    <span>Thích ({post.likes})</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Bình luận ({post.comments.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Đã copy liên kết chia sẻ vào Clipboard!');
                    }}
                    className="flex items-center space-x-1.5 hover:text-black transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                {/* Comment Drawer / Expandable List */}
                {expandedComments[post.id] && (
                  <div className="pt-4 border-t-2 border-slate-100 space-y-4 bg-slate-50 border border-slate-200 p-4 mt-2">
                    
                    {/* Actual comment thread */}
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2.5 text-xs">
                          <img
                             src={comment.avatarSeed}
                             alt={comment.author}
                             className="w-7 h-7 border-2 border-slate-200 bg-slate-100"
                          />
                          <div className="bg-white border-2 border-slate-200 p-2.5 flex-1 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-display font-bold text-[9px] text-[#FF9C2A] flex items-center gap-1 uppercase">
                                {comment.author}
                                {comment.userId && (
                                  <span className="text-[7px] text-black bg-[#9DD044] px-1 border border-black uppercase font-bold font-display">LỚP</span>
                                )}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">{comment.createdAt}</span>
                            </div>
                            <p className="text-[11px] text-slate-800 font-sans leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Comment submit typing form */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={currentUser ? "Viết phản hồi..." : "Hãy đăng nhập để bình luận ổn định hơn..."}
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentText({
                          ...commentText,
                          [post.id]: e.target.value
                        })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCreateComment(post.id);
                        }}
                        className="flex-1 px-3 py-2 border-2 border-slate-200 bg-white text-black text-xs focus:outline-none focus:border-[#FF9C2A] font-sans"
                      />
                      <button
                        onClick={() => handleCreateComment(post.id)}
                        className="p-2 bg-[#FF9C2A] hover:bg-[#FF9C2A]/80 text-black border-2 border-black cursor-pointer transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}

          {posts.length === 0 && (
            <div className="text-center bg-white p-12 border-4 border-[#FF9C2A] pixel-shadow-orange text-black">
              <Sparkles className="w-12 h-12 text-[#FF9C2A] mx-auto mb-4" />
              <p className="text-xs font-display font-bold text-black uppercase tracking-wider">Chưa có bài viết nào trên diễn đàn.</p>
              <p className="text-xs text-slate-600 mt-2">Hãy là người đầu tiên chia sẻ tâm sự của mình!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
