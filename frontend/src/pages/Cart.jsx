import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <Link to="/" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow-md flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <Link
                  to={`/product/${item._id}`}
                  className="font-bold text-lg hover:text-primary"
                >
                  {item.name}
                </Link>
                <p className="text-gray-500 text-sm">{item.category}</p>
                <p className="text-primary font-bold mt-2">
                  Rs. {item.price.toLocaleString()}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md h-fit sticky top-20">
          <h2 className="text-xl font-bold mb-4 border-b pb-3">Order Summary</h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.reduce((acc, i) => acc + i.qty, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">Rs. {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
          >
            Proceed to Checkout <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;