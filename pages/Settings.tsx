
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Info, ChevronRight, FileText, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'km', label: 'ខ្មែរ (Khmer)', icon: '🇰🇭' },
    { code: 'en', label: 'English', icon: '🇺🇸' },
    { code: 'zh', label: '中文 (Chinese)', icon: '🇨🇳' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">{t('settings_title')}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Language Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            <h2 className="font-bold text-gray-800">{t('language_label')}</h2>
          </div>
          <div>
            {languages.map((lang) => (
              <div 
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  language === lang.code ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.icon}</span>
                  <span className={`font-medium ${language === lang.code ? 'text-primary' : 'text-gray-700'}`}>
                    {lang.label}
                  </span>
                </div>
                {language === lang.code && (
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Info size={18} className="text-gray-500" />
            <h2 className="font-bold text-gray-800">{t('about_us')}</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3 text-gray-600">
               <FileText size={18} />
               <span className="text-sm">Terms of Service</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3 text-gray-600">
               <Shield size={18} />
               <span className="text-sm">Privacy Policy</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8">
           {t('app_name')} v3.0.1
        </div>
      </div>
    </div>
  );
};

export default Settings;
