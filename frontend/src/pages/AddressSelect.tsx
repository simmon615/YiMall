
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Navigation } from 'lucide-react';

const AddressSelect = () => {
  const navigate = useNavigate();

  // Mock Saved Addresses
  const savedAddresses = [
    { id: 1, label: 'Home', detail: 'No. 123, St. 456, Toul Kork, Phnom Penh' },
    { id: 2, label: 'Office', detail: 'Vattanac Capital Tower, Level 12' },
  ];

  const handleSelect = (address: string) => {
    // In real app, update context/store
    console.log('Selected:', address);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-full flex items-center px-3 py-2">
            <Search size={16} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search address..." 
              className="bg-transparent outline-none text-sm w-full"
              autoFocus
            />
          </div>
        </div>
        
        <button 
          onClick={() => handleSelect('Current Location')}
          className="flex items-center gap-2 text-primary font-medium text-sm py-2 w-full"
        >
          <Navigation size={16} />
          Use Current Location
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Saved Addresses</h3>
        <div className="space-y-3">
          {savedAddresses.map(addr => (
            <div 
              key={addr.id}
              onClick={() => handleSelect(addr.detail)}
              className="bg-white p-3 rounded-xl shadow-sm flex items-start gap-3 cursor-pointer active:scale-98 transition-transform"
            >
              <div className="mt-1 text-gray-400">
                <MapPin size={18} />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">{addr.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{addr.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mock Map Placeholder */}
      <div className="mt-4 p-4">
         <div className="h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
           Google Maps Placeholder
         </div>
      </div>
    </div>
  );
};

export default AddressSelect;
