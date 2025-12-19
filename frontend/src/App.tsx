
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Interceptor from './pages/Interceptor';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Withdraw from './pages/Withdraw';
import TopUp from './pages/TopUp';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import AddressSelect from './pages/AddressSelect';
import AddressForm from './pages/AddressForm';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Support from './pages/Support';
import { Loader2 } from 'lucide-react';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Simulated Auth Context
const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (param: string) => void;
}>({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
});

// Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = React.useContext(AuthContext);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/interceptor" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Phase 3.1: Simulate Telegram Auth & Interceptor Logic
    const initApp = async () => {
      // In a real TMA, we read window.Telegram.WebApp.initData
      // Here we simulate checking for a "token" or "start_param"
      const hasToken = localStorage.getItem('yimall_token');
      
      if (hasToken) {
        setIsAuthenticated(true);
      } else {
        // No token, wait for Interceptor to handle login
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    setTimeout(initApp, 500); // Simulate network delay
  }, []);

  const login = (param: string) => {
    // Simulate Login API Call
    console.log(`Logging in with param: ${param}`);
    localStorage.setItem('yimall_token', 'mock_jwt_token');
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login }}>
      <LanguageProvider>
        <CartProvider>
          <Routes>
            <Route path="/interceptor" element={<Interceptor />} />
            
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
            <Route path="/topup" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/address-select" element={<ProtectedRoute><AddressSelect /></ProtectedRoute>} />
            <Route path="/address/new" element={<ProtectedRoute><AddressForm /></ProtectedRoute>} />
            <Route path="/address/edit/:id" element={<ProtectedRoute><AddressForm /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </LanguageProvider>
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <AppContent />
      </div>
    </HashRouter>
  );
}
