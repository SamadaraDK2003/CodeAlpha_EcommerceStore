import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, userInfo]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <FiPackage size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-700 mb-4">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <Link to="/" className="btn-primary inline-block">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex flex-wrap justify-between items-center gap-3 border-b pb-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">ORDER ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DATE</p>
                <p className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">TOTAL</p>
                <p className="font-bold text-primary">
                  Rs. {order.totalPrice.toLocaleString()}
                </p>
              </div>
              <div>
                {order.isPaid ? (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FiCheckCircle /> Paid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FiClock /> {order.status}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty} × Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-700">
                    Rs. {(item.qty * item.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">SHIPPING TO</p>
              <p className="text-sm text-gray-700">
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;