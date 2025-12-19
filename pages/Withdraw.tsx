
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle, Building2 } from 'lucide-react';

// PRD 4.2: Tiered Card Selector
const WITHDRAWAL_TIERS = [
  { id: 1, points: 150, amount: 10 },
  { id: 2, points: 750, amount: 50 },
  { id: 3, points: 1500, amount: 100 },
  { id: 4, points: 7500, amount: 500 },
];

const Withdraw = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [accountInfo, setAccountInfo] = useState({
    bankName: 'ABA Bank',
    accountNumber: '',
    accountName: ''
  });

  const myPoints = 2450; // Mock current points

  const handleSubmit = () => {
    if (!selectedTier) return;
    if (!accountInfo.accountNumber || !accountInfo.accountName) {
      alert('Please fill in your account details.');
      return;
    }
    
    // Logic: Deduct points (Freeze) -> Create Request
    alert('Withdrawal request submitted! Admin will audit within 24 hours.');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary p-6 pb-12 text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">Withdraw Points</h1>
        </div>
        <div className="text-center">
          <div className="text-white/80 text-sm mb-1">Available Points</div>
          <div className="text-4xl font-bold">{myPoints}</div>
        </div>
      </div>

      <div className="-mt-6 px-4 space-y-6">
        {/* Tier Selector */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            Select Amount
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {WITHDRAWAL_TIERS.map(tier => {
              const isActive = selectedTier === tier.id;
              const isDisabled = myPoints < tier.points;
              
              return (
                <div 
                  key={tier.id}
                  onClick={() => !isDisabled && setSelectedTier(tier.id)}
                  className={`border-2 rounded-xl p-3 relative cursor-pointer transition-all
                    ${isActive ? 'border-primary bg-orange-50' : 'border-transparent bg-gray-50'}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                  `}
                >
                  <div className="text-gray-500 text-xs mb-1">{tier.points} Points</div>
                  <div className="text-xl font-bold text-gray-900">${tier.amount}</div>
                  {isActive && (
                    <div className="absolute top-2 right-2 text-primary">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            Receive Account
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Bank Name</label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Building2 size={18} className="text-gray-400" />
                <select 
                  className="bg-transparent flex-1 outline-none text-sm font-medium"
                  value={accountInfo.bankName}
                  onChange={e => setAccountInfo({...accountInfo, bankName: e.target.value})}
                >
                  <option>ABA Bank</option>
                  <option>ACLEDA Bank</option>
                  <option>Wing Bank</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Account Number</label>
              <input 
                type="number" 
                className="input-base" 
                placeholder="000 000 000"
                value={accountInfo.accountNumber}
                onChange={e => setAccountInfo({...accountInfo, accountNumber: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Account Name</label>
              <input 
                type="text" 
                className="input-base" 
                placeholder="SOPHEA CHAN"
                value={accountInfo.accountName}
                onChange={e => setAccountInfo({...accountInfo, accountName: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="flex gap-2 items-start p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Withdrawals are audited manually. Please ensure your account details are correct. 
            Funds usually arrive within 24 hours.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-[480px] mx-auto">
        <button 
          onClick={handleSubmit}
          disabled={!selectedTier}
          className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all
            ${selectedTier ? 'bg-gray-900 text-white active:opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
