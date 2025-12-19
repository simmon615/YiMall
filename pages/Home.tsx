
import React from 'react';
import { MapPin, Search, Globe, Filter, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

// Mock Data
const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 1199, points: 600, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80' },
  { id: 2, name: 'Khmer Silk Scarf', price: 45, points: 22, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80' },
  { id: 3, name: 'Organic Jasmine Rice', price: 25, points: 12, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
  { id: 4, name: 'Sony WH-1000XM5', price: 349, points: 175, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80' },
  { id: 5, name: 'Dior Sauvage Elixir', price: 180, points: 90, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80' },
  { id: 6, name: 'MacBook Air M2', price: 999, points: 500, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80' },
];

const Home = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  
  // Cycle languages for the quick button
  const toggleLang = () => {
    const nextLang = language === 'km' ? 'en' : (language === 'en' ? 'zh' : 'km');
    setLanguage(nextLang);
  };

  // PRD 5.1: Top Bar
  const TopBar = () => (
    <div className="top-bar px-4 py-3 flex items-center justify-between gap-3">
      {/* Left: Location */}
      <div 
        className="flex items-center text-gray-500 cursor-pointer hover:text-primary transition-colors"
        onClick={() => navigate('/address-select')}
      >
        <MapPin size={20} />
        <span className="text-xs font-medium ml-1 truncate max-w-[60px]">{t('location')}</span>
      </div>

      {/* Center: Search */}
      <div className="flex-1 relative">
        <input 
          type="text" 
          placeholder={t('search_placeholder')} 
          className="input-base pl-9 py-2"
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      {/* Right: Cart & Language */}
      <div className="flex items-center gap-3">
        <div className="relative text-gray-500 cursor-pointer" onClick={() => navigate('/cart')}>
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold border border-white">
              {totalItems}
            </span>
          )}
        </div>
        
        <div 
          className="flex items-center text-gray-500 cursor-pointer uppercase"
          onClick={toggleLang}
        >
          <Globe size={20} />
          <span className="text-xs font-bold ml-1">{language}</span>
        </div>
      </div>
    </div>
  );

  // PRD 5.2: Quick Access
  const QuickAccess = () => (
    <div className="flex justify-between px-6 py-4 bg-white mb-2 shadow-sm">
      {[
        { icon: '💎', label: t('qa_topup'), path: '/topup' }, 
        { icon: '💰', label: t('qa_points'), path: '/profile' },
        { icon: '👤', label: t('qa_profile'), path: '/profile' },
        { icon: '🎧', label: t('qa_support'), path: '/support' },
      ].map((item, idx) => (
        <div 
          key={idx} 
          onClick={() => item.path && navigate(item.path)}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl shadow-sm border border-gray-100">
            {item.icon}
          </div>
          <span className="text-xs text-gray-600 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar />
      
      <div className="main-content">
        <QuickAccess />

        {/* Banner Placeholder */}
        <div className="mx-4 mb-4 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-sm flex items-center justify-center text-white font-bold text-center px-4">
          {t('banner_text')}
        </div>

        {/* PRD 5.2: Product Feed */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-gray-800">{t('recommendation')}</h2>
            <Filter size={16} className="text-gray-400" />
          </div>

          <div className="grid-cols-2">
            {PRODUCTS.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer active:opacity-90 transition-opacity"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="h-40 bg-gray-200 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {/* Points Badge */}
                  <div className="absolute top-2 right-2 points-badge shadow-sm">
                    +{product.points} pts
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <button className="bg-gray-100 p-1.5 rounded-full text-gray-600">
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
