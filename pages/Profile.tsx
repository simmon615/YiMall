
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Gift, ArrowRight, Settings, LogOut, History, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mock Assets Data (PRD 4.0 Triple Wallet)
  const assets = {
    recharge: 120.50, // Wallet 1: Offline Top-up
    shopping: 50.00,  // Wallet 2: Exchanged from points
    points: 2450,     // Wallet 3: Distribution Rewards
  };

  const menuItems = [
    { icon: <History size={20} />, label: t('menu_orders'), path: '/orders' },
    { icon: <Gift size={20} />, label: t('menu_team'), path: '/team' },
    { icon: <Settings size={20} />, label: t('menu_settings'), path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 pt-10 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl border-2 border-white/50 backdrop-blur-sm">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold">Sophea Chan</h1>
            <p className="text-white/80 text-sm">{t('id')}: 882391</p>
          </div>
        </div>

        {/* Main Assets Card */}
        <div className="flex justify-between gap-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 border border-white/10 flex flex-col justify-between">
            <div className="text-xs text-white/70 mb-1">{t('points_label')}</div>
            <div className="text-xl font-bold">{assets.points}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 border border-white/10 flex flex-col justify-between">
            <div className="text-xs text-white/70 mb-1">{t('shop_wallet')}</div>
            <div className="text-lg font-bold">${assets.shopping.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex-1 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="text-xs text-white/70 mb-1">{t('cash_balance')}</div>
            <div className="text-lg font-bold">${assets.recharge.toFixed(2)}</div>
            <button 
              onClick={() => navigate('/topup')}
              className="mt-2 bg-white text-orange-600 text-[10px] font-bold py-1 px-2 rounded-lg w-full"
            >
              {t('btn_topup')}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-4 relative z-10">
        {/* Withdrawal / Topup Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <Wallet size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-800">{t('btn_withdraw')}</div>
              <div className="text-xs text-gray-500">{t('btn_withdraw_desc')}</div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/withdraw')}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform"
          >
            {t('btn_withdraw')}
          </button>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${idx !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-gray-400">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>

        {/* Logout Mock */}
        <button 
          onClick={() => {
            localStorage.removeItem('yimall_token');
            window.location.reload();
          }}
          className="mt-6 w-full flex items-center justify-center gap-2 text-red-500 font-medium p-4 bg-white rounded-xl shadow-sm"
        >
          <LogOut size={18} />
          {t('btn_logout')}
        </button>
      </div>

      {/* Bottom Nav Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 text-xs text-gray-500 font-medium">
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
          <span>🏠</span> {t('home')}
        </div>
        <div className="flex flex-col items-center gap-1 text-primary cursor-pointer">
          <span>👤</span> {t('profile')}
        </div>
      </div>
    </div>
  );
};

export default Profile;
