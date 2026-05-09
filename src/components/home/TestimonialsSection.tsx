import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { communityPosts } from '../../data/courses';
import { LANGUAGE_NAMES } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export default function TestimonialsSection() {
  const { isAuthenticated } = useAuth();
  const displayPosts = communityPosts.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            社区动态
          </h2>
          <p className="text-slate-600">看看其他学习者的分享和经验</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl">
                  {post.authorAvatar}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{post.authorName}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    post.language === 'en' ? 'bg-green-100 text-green-700' :
                    post.language === 'ja' ? 'bg-pink-100 text-pink-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {LANGUAGE_NAMES[post.language]}
                  </span>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{post.title}</h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-slate-200/50 rounded text-xs text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-slate-500 text-sm border-t border-slate-200 pt-4">
                <span className="flex items-center gap-1">
                  <Heart size={16} />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {post.comments}
                </span>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 size={16} />
                  分享
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={isAuthenticated ? '/community' : '/register'}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <TrendingUp size={18} />
            进入社区
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
