
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const TopUp = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Official Bank Info (Mock)
  const bankInfo = {
    bank: 'ABA Bank',
    name: 'YiMall Cambodia Ltd',
    number: '001 999 888',
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!amount || !file) {
      alert('Please enter amount and upload payment proof.');
      return;
    }
    setIsSubmitting(true);
    
    // Simulate API upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Top-up request submitted! Admin will verify within 1 hour.');
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary p-6 pb-12 text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">Recharge Balance</h1>
        </div>
        <p className="text-white/80 text-sm">
          Transfer funds offline to the account below, then upload the receipt.
        </p>
      </div>

      <div className="-mt-6 px-4 space-y-4">
        {/* Bank Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Bank Name</div>
              <div className="font-bold text-gray-900">{bankInfo.bank}</div>
            </div>
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              ABA
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
             <div>
                <div className="text-xs text-gray-500 mb-0.5">Account Number</div>
                <div className="font-mono font-bold text-lg text-gray-800 tracking-wide">{bankInfo.number}</div>
             </div>
             <button onClick={() => handleCopy(bankInfo.number)} className="text-primary p-2">
               <Copy size={18} />
             </button>
          </div>

          <div>
             <div className="text-xs text-gray-500 mb-0.5">Account Name</div>
             <div className="font-medium text-gray-900">{bankInfo.name}</div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top-up Amount ($)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-base text-lg font-bold"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Proof</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {file ? (
                 <div className="flex flex-col items-center text-primary">
                    <CheckCircle2 size={32} className="mb-2" />
                    <span className="text-sm font-medium">{file.name}</span>
                 </div>
              ) : (
                <>
                  <Upload size={32} className="mb-2 text-gray-400" />
                  <span className="text-sm">Tap to upload screenshot</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="flex gap-2 items-start p-3 bg-orange-50 text-orange-700 rounded-lg text-xs">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Please ensure the transfer amount matches exactly. 
            Fake receipts will lead to account suspension.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-[480px] mx-auto">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md active:opacity-90 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </div>
  );
};

export default TopUp;
