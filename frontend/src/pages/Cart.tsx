
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{t('cart_empty_title')}</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">{t('cart_empty_desc')}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-sm active:scale-95 transition-transform"
        >
          {t('btn_start_shopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">{t('cart_title')} ({items.length})</h1>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm flex gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-xs text-orange-500 font-medium mt-1">
                  {t('gets_points')} {item.points * item.quantity} {t('pts')}
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-2">
                <div className="font-bold text-lg text-primary">${item.price}</div>
                
                {/* Qty Control */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:bg-gray-100"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 active:bg-gray-100"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg max-w-[480px] mx-auto">
        <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-500">{t('subtotal')}</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md active:opacity-90"
        >
          {t('btn_checkout')} (${totalPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default Cart;
