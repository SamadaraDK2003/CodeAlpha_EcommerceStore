import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) setUser(JSON.parse(userInfo));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Shop<span className="text-secondary">Ease</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>

            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-primary flex items-center gap-1">
                <FiPackage /> Orders
              </Link>
            )}

            <Link to="/cart" className="relative text-gray-700 hover:text-primary">
              <FiShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700"
                  title="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-primary">
                <FiUser size={20} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;