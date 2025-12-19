
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, Circle, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();

  // Shipping Logic (Mock PRD 3.4 Shipping Service)
  const shippingFee = 5.00;
  const finalTotal = totalPrice + shippingFee;

  // Mock Wallets (PRD 4.0)
  const wallets = {
    shopping: { balance: 50.00, label: t('wallet_shopping') },
    recharge: { balance: 1500.00, label: t('wallet_recharge') },
  };

  // State: 'shopping' | 'recharge'
  const [paymentMethod, setPaymentMethod] = useState<'shopping' | 'recharge'>('recharge');

  const handlePay = () => {
    const selectedWallet = wallets[paymentMethod];
    if (selectedWallet.balance < finalTotal) {
      alert(`${t('insufficient_balance')} in ${selectedWallet.label}. Needed: $${finalTotal.toFixed(2)}, Have: $${selectedWallet.balance.toFixed(2)}`);
      return;
    }
    alert(t('pay_success'));
    clearCart(); // Clear cart after successful payment
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">{t('cart_empty_title')}</p>
        <button onClick={() => navigate('/')} className="text-primary font-bold">{t('btn_start_shopping')}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg">{t('checkout_title')}</h1>
      </div>

      {/* Address */}
      <div className="m-4 bg-white p-4 rounded-xl shadow-sm flex items-start gap-3">
        <div className="bg-orange-100 p-2 rounded-full text-primary mt-1">
          <MapPin size={18} />
        </div>
        <div>
          <div className="font-bold text-gray-800">Sophea Chan <span className="text-gray-500 font-normal ml-2">012 345 678</span></div>
          <p className="text-sm text-gray-500 mt-1">
            No. 123, St. 456, Toul Kork, Phnom Penh
          </p>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="m-4 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <ShoppingBag size={16} /> {t('order_summary')}
        </h3>
        
        <div className="space-y-3 mb-3">
          {items.map(item => (
            <div key={item.id} className="flex gap-3">
              <img src={item.image} className="w-12 h-12 object-cover rounded bg-gray-100" alt="prod" />
              <div className="flex-1">
                <div className="flex justify-between">
                   <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                   <span className="text-xs text-gray-500">x{item.quantity}</span>
                </div>
                <div className="text-sm font-bold text-primary mt-1">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-dashed border-gray-200 my-3"></div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{t('subtotal')}</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-1"><Truck size={14}/> {t('shipping_fee')}</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg pt-2">
            <span>{t('total')}</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method (PRD 4.1 Mutex Logic) */}
      <div className="m-4 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">{t('payment_method')}</h3>
        
        {/* Option 1: Recharge Wallet */}
        <div 
          className={`flex items-center justify-between p-3 rounded-lg border mb-3 cursor-pointer transition-colors ${paymentMethod === 'recharge' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}
          onClick={() => setPaymentMethod('recharge')}
        >
          <div>
            <div className="font-medium text-gray-900">{wallets.recharge.label}</div>
            <div className="text-sm text-gray-500">{t('balance')}: <span className="font-bold text-gray-900">${wallets.recharge.balance.toFixed(2)}</span></div>
          </div>
          {paymentMethod === 'recharge' ? <CheckCircle2 className="text-primary" /> : <Circle className="text-gray-300" />}
        </div>

        {/* Option 2: Shopping Wallet */}
        <div 
          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'shopping' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}
          onClick={() => setPaymentMethod('shopping')}
        >
          <div>
            <div className="font-medium text-gray-900">{wallets.shopping.label}</div>
            <div className="text-sm text-gray-500">{t('balance')}: <span className="font-bold text-gray-900">${wallets.shopping.balance.toFixed(2)}</span></div>
            {wallets.shopping.balance < finalTotal && <div className="text-xs text-red-500 mt-1">{t('insufficient_balance')}</div>}
          </div>
          {paymentMethod === 'shopping' ? <CheckCircle2 className="text-primary" /> : <Circle className="text-gray-300" />}
        </div>
        
        <p className="text-xs text-gray-400 mt-3 text-center">
          {t('mixed_payment_error')}
        </p>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 max-w-[480px] mx-auto">
        <button 
          onClick={handlePay}
          className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 active:opacity-90"
        >
          {t('btn_pay')} ${finalTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
