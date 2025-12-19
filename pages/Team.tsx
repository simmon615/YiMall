
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, QrCode, TrendingUp, User, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Team = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'members' | 'commissions'>('members');

  // Mock Stats
  const stats = {
    totalMembers: 12,
    totalCommission: 2450, // Points
    todayCommission: 150,
  };

  // Mock Members Data (Recursive Tree Flattened for MVP)
  const members = [
    { id: 1, name: 'Sokha Mom', level: 1, joined: '2023-10-20', sales: 1200.00, avatar: 'SM' },
    { id: 2, name: 'Dara Kim', level: 1, joined: '2023-10-22', sales: 450.50, avatar: 'DK' },
    { id: 3, name: 'Visal Lee', level: 2, joined: '2023-10-24', sales: 0.00, avatar: 'VL', upline: 'Dara Kim' },
    { id: 4, name: 'Bopha Chan', level: 1, joined: '2023-10-25', sales: 89.00, avatar: 'BC' },
  ];

  // Mock Commission History
  const commissions = [
    { id: 101, source: 'Sokha Mom', type: 'Order Reward', amount: 120, date: '2023-10-25 14:30', level: 1 },
    { id: 102, source: 'Visal Lee', type: 'Order Reward', amount: 30, date: '2023-10-24 09:15', level: 2 },
  ];

  const handleCopyInvite = () => {
    // PRD 2.2: Invite Link with start_param (uid)
    const inviteLink = 'https://t.me/YiMallBot/shop?startapp=882391';
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Dashboard */}
      <div className="bg-primary p-6 pb-12 text-white rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-5 blur-lg"></div>

        <div className="flex items-center gap-3 mb-6 relative z-10">
          <button onClick={() => navigate(-1)} className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">{t('team_title')}</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
              <Users size={14} /> {t('total_members')}
            </div>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
              <Award size={14} /> {t('commission_pts')}
            </div>
            <div className="text-2xl font-bold">{stats.totalCommission}</div>
            <div className="text-[10px] text-green-300 font-medium">+{stats.todayCommission} {t('today_gain')}</div>
          </div>
        </div>
      </div>

      {/* Invite Action */}
      <div className="mx-4 -mt-6 bg-white rounded-xl shadow-sm p-4 relative z-20 flex items-center justify-between">
        <div>
           <h3 className="font-bold text-gray-800 text-sm">{t('invite_friends')}</h3>
           <p className="text-xs text-gray-500 mt-0.5">{t('invite_desc')}</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleCopyInvite}
             className="bg-orange-50 text-primary p-2 rounded-lg flex items-center gap-2 text-xs font-bold active:bg-orange-100"
           >
             <Copy size={16} /> {t('btn_link')}
           </button>
           <button className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold">
             <QrCode size={16} />
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 px-4">
        <div className="bg-gray-200 p-1 rounded-lg flex text-sm font-medium">
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-2 rounded-md transition-all ${activeTab === 'members' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            {t('tab_members')}
          </button>
          <button 
            onClick={() => setActiveTab('commissions')}
            className={`flex-1 py-2 rounded-md transition-all ${activeTab === 'commissions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            {t('tab_commissions')}
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-3 pb-20">
        {activeTab === 'members' ? (
          // Members List
          members.map(member => (
            <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
                {member.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${member.level === 1 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {t('level')} {member.level}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                  <span>{t('joined')}: {member.joined}</span>
                  <span className="text-gray-600 font-medium">{t('sales')}: ${member.sales.toFixed(2)}</span>
                </div>
                {member.upline && (
                   <div className="text-[10px] text-gray-400 mt-1">{t('invited_by')}: {member.upline}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          // Commission History
          commissions.map(comm => (
            <div key={comm.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                   <TrendingUp size={18} />
                 </div>
                 <div>
                   <div className="font-bold text-gray-900 text-sm">+{comm.amount} Pts</div>
                   <div className="text-xs text-gray-500 mt-0.5">{t('from')} {comm.source} (L{comm.level})</div>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-xs text-gray-400">{comm.date}</div>
                 <div className="text-[10px] text-primary bg-orange-50 px-2 py-0.5 rounded mt-1 inline-block">
                   {comm.type}
                 </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Team;
