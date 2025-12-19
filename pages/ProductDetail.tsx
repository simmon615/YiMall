
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [showToast, setShowToast] = React.useState(false);

  // Mock fetching
  const product = {
    id: Number(id),
    name: 'iPhone 15 Pro Max',
    price: 1199,
    points: 600,
    description: 'Titanium design. A17 Pro chip. The longest optical zoom in iPhone history.',
    images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80']
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      points: product.points,
      image: product.images[0]
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-50 text-sm animate-fade-in-down">
          <CheckCircle size={16} className="text-green-400" />
          Added to Cart
        </div>
      )}

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between z-10 bg-gradient-to-b from-black/30 to-transparent text-white">
        <button onClick={() => navigate(-1)} className="bg-black/20 p-2 rounded-full backdrop-blur-md">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-3">
          <button className="bg-black/20 p-2 rounded-full backdrop-blur-md">
            <Share2 size={20} />
          </button>
          <button onClick={() => navigate('/cart')} className="bg-black/20 p-2 rounded-full backdrop-blur-md relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="h-96 bg-gray-100 relative">
        <img src={product.images[0]} className="w-full h-full object-cover" alt="Detail" />
      </div>

      {/* Content */}
      <div className="p-4 -mt-4 relative bg-white rounded-t-2xl shadow-lg">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="points-badge inline-block mb-1">Buy & Get {product.points} Points</div>
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
          </div>
        </div>

        <div className="text-2xl font-bold text-primary mb-4">${product.price}</div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-sm mb-2 text-gray-700">Description</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
            <br /><br />
            (Note: Supplier and Warehouse info is hidden as per PRD 5.3)
          </p>
        </div>
        
        {/* Placeholder content for long scroll */}
        <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 text-sm">
          HTML Description Content
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 max-w-[480px] mx-auto">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-gray-100 text-gray-900 font-bold py-3 rounded-lg active:bg-gray-200 transition-colors"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => {
            handleAddToCart(); // Optional: Add to cart before checkout or just direct
            navigate('/checkout');
          }}
          className="flex-1 bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 active:opacity-90"
        >
          <ShoppingCart size={18} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
