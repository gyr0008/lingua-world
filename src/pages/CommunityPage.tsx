import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, MessageCircle, Share2, Search,
  TrendingUp, Clock, Filter, Plus, Send
} from 'lucide-react';
import { communityPosts } from '../data/courses';
import { LANGUAGE_NAMES, Language } from '../types';
import { useAuth } from '../contexts/AuthContext';

const tags = ['全部', '英语', '日语', '韩语', '学习方法', '备考', '口语', '听力'];

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const [selectedTag, setSelectedTag] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const filteredPosts = communityPosts.filter(post => {
    const matchesTag = selectedTag === '全部' || 
      LANGUAGE_NAMES[post.language as Language] === selectedTag ||
      post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    setShowNewPost(false);
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">学习社区</h1>
              <p className="text-slate-500">与其他学习者交流分享</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索帖子..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <button
            onClick={() => setShowNewPost(true)}
            disabled={!isAuthenticated}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isAuthenticated
                ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus size={20} />
            发布帖子
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {showNewPost && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="font-bold text-slate-800 mb-4">发布新帖子</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">选择语言</label>
              <div className="flex gap-2">
                {(['en', 'ja', 'ko'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === lang
                        ? lang === 'en' ? 'bg-green-500 text-white' :
                          lang === 'ja' ? 'bg-pink-500 text-white' :
                          'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {LANGUAGE_NAMES[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">标题</label>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="输入帖子标题..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">内容</label>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="分享你的学习心得..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowNewPost(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Send size={16} />
                发布
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl">
                  {post.authorAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{post.authorName}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      post.language === 'en' ? 'bg-green-100 text-green-700' :
                      post.language === 'ja' ? 'bg-pink-100 text-pink-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {LANGUAGE_NAMES[post.language as Language]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock size={14} />
                    {post.createdAt}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm">分享</span>
                  </button>
                </div>
                <TrendingUp size={18} className="text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="text-slate-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">没有找到相关帖子</h3>
            <p className="text-slate-500">试试其他标签或搜索词</p>
          </div>
        )}
      </div>
    </div>
  );
}
