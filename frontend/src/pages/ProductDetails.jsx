import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingCart, FiArrowLeft, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl p-6 shadow-md">
        <div className="rounded-xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
        </div>

        <div>
          <span className="text-sm text-primary font-semibold uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              {product.rating} ({product.numReviews} reviews)
            </span>
          </div>

          <p className="text-gray-600 mt-5 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <span className="text-4xl font-bold text-primary">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, qty);
                  toast.success('Added to cart!');
                }}
                className="btn-primary flex items-center gap-2"
              >
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;