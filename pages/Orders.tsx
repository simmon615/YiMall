
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Orders = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tab_all');

  // Mock Orders
  const orders = [
    { 
      id: 'ORD-2023-001', 
      date: '2023-10-24', 
      status: 'Shipping', 
      total: 1204.00,
      items: [
        { name: 'iPhone 15 Pro Max', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&q=80', qty: 1 }
      ]
    },
    { 
      id: 'ORD-2023-002', 
      date: '2023-10-20', 
      status: 'Completed', 
      total: 45.00,
      items: [
        { name: 'Khmer Silk Scarf', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=100&q=80', qty: 1 }
      ]
    }
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Pending': return t('tab_pending');
      case 'Shipping': return t('tab_shipping');
      case 'Completed': return t('tab_completed');
      default: return status;
    }
  };

  const tabs = [
    { key: 'tab_all', label: t('tab_all') },
    { key: 'tab_pending', label: t('tab_pending') },
    { key: 'tab_shipping', label: t('tab_shipping') },
    { key: 'tab_completed', label: t('tab_completed') },
  ];

  const filteredOrders = activeTab === 'tab_all' 
    ? orders 
    : orders.filter(o => {
        if (activeTab === 'tab_shipping') return o.status === 'Shipping';
        if (activeTab === 'tab_pending') return o.status === 'Pending';
        if (activeTab === 'tab_completed') return o.status === 'Completed';
        return true;
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-orange-500 bg-orange-50';
      case 'Shipping': return 'text-blue-500 bg-blue-50';
      case 'Completed': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">{t('orders_title')}</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-100 flex gap-6 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Package size={48} className="mb-2 opacity-50" />
            <p>{t('no_orders')}</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                 <span className="text-xs text-gray-500">{order.date}</span>
                 <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                   {getStatusLabel(order.status)}
                 </span>
              </div>
              
              <div className="p-3 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <img src={item.image} className="w-16 h-16 object-cover rounded bg-gray-100" alt="prod" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">x{item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-50 flex justify-between items-center">
                <div className="text-sm">
                  {t('total')}: <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                {order.status === 'Shipping' && (
                  <button className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full">
                    {t('btn_confirm_received')}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
