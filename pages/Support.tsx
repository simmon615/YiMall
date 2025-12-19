
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, HelpCircle, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Support = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContactSupport = () => {
    // Mock opening Telegram Support Bot
    window.open('https://t.me/YiMallSupportBot', '_blank');
  };

  const faqs = [
    { q: "How to withdraw points?", a: "Go to Profile > Withdraw, select an amount tier, and fill in your bank details." },
    { q: "How to top up balance?", a: "Go to Profile > Top Up, transfer to our ABA account, and upload the receipt." },
    { q: "When will I receive my order?", a: "Orders usually ship within 24-48 hours. Check 'Order History' for updates." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">{t('support_title')}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg">
          <MessageCircle size={48} className="mx-auto mb-3 opacity-90" />
          <h2 className="font-bold text-xl mb-2">Need Help?</h2>
          <p className="text-white/80 text-sm mb-6">Our support team is available 24/7 on Telegram.</p>
          <button 
            onClick={handleContactSupport}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors w-full flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            {t('contact_support')}
          </button>
        </div>

        {/* Quick Contacts */}
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-2 text-center">
             <Phone size={24} className="text-green-500" />
             <div className="text-xs text-gray-500">Hotline</div>
             <div className="font-bold text-sm text-gray-800">012 999 888</div>
           </div>
           <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center gap-2 text-center">
             <Mail size={24} className="text-red-500" />
             <div className="text-xs text-gray-500">Email</div>
             <div className="font-bold text-sm text-gray-800">help@yimall.com</div>
           </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <HelpCircle size={18} /> {t('faq')}
          </h3>
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="font-medium text-gray-900 text-sm mb-2">{item.q}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
