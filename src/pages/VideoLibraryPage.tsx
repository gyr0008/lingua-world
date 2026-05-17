import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Star, Eye, Clock, Search, Filter, Plus, Send,
  ThumbsUp, Calendar, Play, X, Globe
} from 'lucide-react';
import { getAllVideos, getVideosByLanguage } from '../data/courses';
import { LANGUAGE_NAMES, Language } from '../types';
import { useAuth } from '../contexts/AuthContext';

const sortOptions = [
  { value: 'stars', label: '按收藏数排序', icon: Star },
  { value: 'views', label: '按播放量排序', icon: Eye },
  { value: 'newest', label: '按最新发布排序', icon: Calendar }
];

function VideoCardPlaceholder({ title, language }: { title: string; language: string }) {
  const colors = {
    en: 'from-green-400 to-emerald-500',
    ja: 'from-pink-400 to-rose-500',
    ko: 'from-blue-400 to-indigo-500'
  };
  
  const langEmoji = {
    en: '🇬🇧',
    ja: '🇯🇵',
    ko: '🇰🇷'
  };
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[language as keyof typeof colors] || colors.en} flex items-center justify-center`}>
      <div className="text-center">
        <span className="text-5xl mb-2 block">{langEmoji[language as keyof typeof langEmoji] || '🌐'}</span>
        <p className="text-white/80 text-sm font-medium px-4">{title.slice(0, 20)}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
          <Play size={28} className="text-gray-700 ml-1" />
        </div>
      </div>
    </div>
  );
}

export default function VideoLibraryPage() {
  const { isAuthenticated, user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof getAllVideos()[0] | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<typeof getAllVideos()>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoUrl: '',
    language: 'en' as Language,
    tags: ''
  });

  const allVideos = [...getAllVideos(), ...uploadedVideos];
  const videos = selectedLanguage === 'all' 
    ? allVideos 
    : allVideos.filter(v => v.language === selectedLanguage);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === 'stars') return b.stars - a.stars;
    if (sortBy === 'views') return b.views - a.views;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatViews = (views: number) => {
    if (views >= 10000) {
      return (views / 10000).toFixed(1) + '万';
    }
    return views.toString();
  };

  const handleSubmitVideo = () => {
    if (!newVideo.title.trim() || !newVideo.videoUrl.trim()) return;
    
    const video = {
      id: `vid-user-${Date.now()}`,
      authorId: user?.id || 'guest',
      authorName: user?.nickname || '匿名用户',
      authorAvatar: user?.avatar || '👤',
      language: newVideo.language,
      title: newVideo.title,
      description: newVideo.description,
      videoUrl: newVideo.videoUrl,
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/640/360`,
      stars: 0,
      views: 0,
      duration: '00:00',
      createdAt: new Date().toISOString().split('T')[0],
      tags: newVideo.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    setUploadedVideos(prev => [video, ...prev]);
    setShowUploadModal(false);
    setNewVideo({ title: '', description: '', videoUrl: '', language: 'en', tags: '' });
  };

  const handleImageError = (videoId: string) => {
    setImageErrors(prev => ({ ...prev, [videoId]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Video className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">视频学习库</h1>
              <p className="text-slate-500">发现优质学习视频，由社区用户共同推荐</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索视频..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            disabled={!isAuthenticated}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isAuthenticated
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus size={20} />
            上传视频
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedLanguage === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              全部 ({allVideos.length})
            </button>
            {(['en', 'ja', 'ko'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLanguage === lang
                    ? lang === 'en' ? 'bg-green-500 text-white' :
                      lang === 'ja' ? 'bg-pink-500 text-white' :
                      'bg-blue-500 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {LANGUAGE_NAMES[lang]} ({getAllVideos().filter(v => v.language === lang).length})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Filter size={18} className="text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {sortedVideos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <Video className="text-slate-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">没有找到相关视频</h3>
            <p className="text-slate-500 mb-4">成为第一个上传学习视频的人吧！</p>
            {isAuthenticated && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium"
              >
                上传视频
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {imageErrors[video.id] ? (
                    <VideoCardPlaceholder title={video.title} language={video.language} />
                  ) : (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(video.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={28} className="text-amber-500 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star size={16} className="text-amber-500 fill-amber-500" />
                      {video.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {formatViews(video.views)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-sm">
                      {video.authorAvatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{video.authorName}</p>
                      <p className="text-xs text-slate-400">{video.createdAt}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">上传学习视频</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">视频标题 *</label>
                  <input
                    type="text"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    placeholder="例如：从零学英语入门教程"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">视频链接 *</label>
                  <input
                    type="text"
                    value={newVideo.videoUrl}
                    onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                    placeholder="粘贴 YouTube、B站或其他视频链接"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">语言分类</label>
                  <div className="flex gap-2">
                    {(['en', 'ja', 'ko'] as Language[]).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setNewVideo({ ...newVideo, language: lang })}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                          newVideo.language === lang
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">视频描述</label>
                  <textarea
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                    placeholder="介绍这个视频的学习价值..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">标签</label>
                  <input
                    type="text"
                    value={newVideo.tags}
                    onChange={(e) => setNewVideo({ ...newVideo, tags: e.target.value })}
                    placeholder="入门, 发音, 语法 （用逗号分隔）"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSubmitVideo}
                    disabled={!newVideo.title.trim() || !newVideo.videoUrl.trim()}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    <Send size={16} />
                    发布视频
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden"
            >
              <div className="relative aspect-video bg-slate-900">
                {imageErrors[selectedVideo.id] ? (
                  <VideoCardPlaceholder title={selectedVideo.title} language={selectedVideo.language} />
                ) : (
                  <img
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedVideo.id)}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <a 
                    href={selectedVideo.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Play size={40} className="text-amber-500 ml-2" />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedVideo.title}</h3>
                <p className="text-slate-600 mb-4">{selectedVideo.description}</p>
                
                <div className="flex items-center gap-6 mb-4">
                  <span className="flex items-center gap-2">
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                    <span className="font-medium">{selectedVideo.stars} 收藏</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye size={18} />
                    <span>{formatViews(selectedVideo.views)} 播放</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{selectedVideo.duration}</span>
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedVideo.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center text-lg">
                      {selectedVideo.authorAvatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{selectedVideo.authorName}</p>
                      <p className="text-sm text-slate-500">发布于 {selectedVideo.createdAt}</p>
                    </div>
                  </div>
                  
                  <a 
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                  >
                    <Globe size={18} />
                    在新窗口打开
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}