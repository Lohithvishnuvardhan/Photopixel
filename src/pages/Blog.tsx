import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Best Camera Settings for Portrait Photography',
    excerpt: 'Learn the essential camera settings that will help you capture stunning portrait photographs with professional results.',
    content: 'Portrait photography is one of the most rewarding genres of photography...',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482b224b8?auto=format&fit=crop&q=80',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Canon EOS R5 vs Sony A7R V: Complete Comparison',
    excerpt: 'A detailed comparison between two flagship mirrorless cameras to help you make the right choice for your photography needs.',
    content: 'When it comes to high-resolution mirrorless cameras...',
    author: 'Michael Chen',
    date: '2024-01-12',
    category: 'Camera Reviews',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Essential Accessories Every Photographer Needs',
    excerpt: 'Discover the must-have accessories that can significantly improve your photography workflow and image quality.',
    content: 'Beyond having a great camera and lens, there are several accessories...',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    category: 'Gear Guide',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&q=80',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Understanding Lens Focal Lengths: A Beginner\'s Guide',
    excerpt: 'Learn how different focal lengths affect your images and which lenses are best for different types of photography.',
    content: 'Focal length is one of the most important concepts in photography...',
    author: 'David Park',
    date: '2024-01-08',
    category: 'Photography Basics',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Low Light Photography: Tips and Techniques',
    excerpt: 'Master the art of shooting in challenging lighting conditions with these professional tips and techniques.',
    content: 'Low light photography can be challenging but incredibly rewarding...',
    author: 'Lisa Wang',
    date: '2024-01-05',
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80',
    readTime: '9 min read'
  },
  {
    id: '6',
    title: 'The Future of Mirrorless Cameras in 2024',
    excerpt: 'Explore the latest trends and innovations in mirrorless camera technology and what to expect in the coming year.',
    content: 'The mirrorless camera market continues to evolve rapidly...',
    author: 'Alex Thompson',
    date: '2024-01-03',
    category: 'Industry News',
    image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    readTime: '10 min read'
  }
];

const categories = ['All', 'Photography Tips', 'Camera Reviews', 'Gear Guide', 'Photography Basics', 'Industry News'];

const Blog = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('blog.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => handleReadMore(post.id)}
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  {t('blog.readMore')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t('blog.noResults')}</h3>
            <p className="text-gray-600">{t('blog.noResultsDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;