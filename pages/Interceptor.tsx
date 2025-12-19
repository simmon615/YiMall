
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Interceptor = () => {
  const [referrerId, setReferrerId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleBind = () => {
    if (!referrerId.trim()) {
      setError(t('error_referrer'));
      return;
    }

    // Simulate API call to bind referrer
    // In real app: POST /api/v1/auth/bind { referrer_id: ... }
    console.log('Binding referrer:', referrerId);
    
    // Simulate successful login
    localStorage.setItem('yimall_token', 'mock_token_after_bind');
    
    // Redirect to home (Force reload to pick up auth state in this simple demo)
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
      <div className="mb-6 p-4 bg-orange-50 rounded-full">
        <UserPlus size={48} className="text-primary" />
      </div>
      
      <h1 className="text-xl font-bold mb-2 text-center">{t('interceptor_title')}</h1>
      <p className="text-gray-500 text-center mb-8 text-sm max-w-xs">
        {t('interceptor_desc')}
      </p>

      <div className="w-full max-w-xs space-y-4">
        <div>
          <input
            type="text"
            value={referrerId}
            onChange={(e) => setReferrerId(e.target.value)}
            placeholder={t('input_placeholder')}
            className="input-base text-center text-lg"
          />
          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </div>

        <button
          onClick={handleBind}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          <span>{t('btn_join')}</span>
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-12 text-xs text-gray-300 text-center">
        {t('security_text')}
      </div>
    </div>
  );
};

export default Interceptor;
