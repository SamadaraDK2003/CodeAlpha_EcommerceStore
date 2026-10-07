import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${product._id}`} className="card group">
      <div className="overflow-hidden h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <span className="text-xs text-primary font-semibold uppercase">{product.category}</span>
        <h3 className="font-bold text-lg mt-1 text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
          <button
            onClick={handleAdd}
            className="bg-primary text-white p-2.5 rounded-lg hover:bg-indigo-600 transition"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;