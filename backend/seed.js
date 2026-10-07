const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('mongoose').connect;

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30hr battery life.',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 15,
    rating: 4.7,
    numReviews: 120
  },
  {
    name: 'Smart Watch Pro',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 20,
    rating: 4.5,
    numReviews: 85
  },
  {
    name: 'Leather Backpack',
    description: 'Durable genuine leather backpack perfect for daily commute.',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Fashion',
    stock: 30,
    rating: 4.6,
    numReviews: 200
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning technology.',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 25,
    rating: 4.4,
    numReviews: 150
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches.',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    stock: 18,
    rating: 4.8,
    numReviews: 95
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic espresso coffee maker with milk frother.',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home',
    stock: 12,
    rating: 4.5,
    numReviews: 67
  },
  {
    name: 'Sunglasses Classic',
    description: 'UV400 protection polarized sunglasses with premium frame.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Fashion',
    stock: 40,
    rating: 4.3,
    numReviews: 110
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with deep bass.',
    price: 6499,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 22,
    rating: 4.6,
    numReviews: 140
  }
];

const seedDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('✅ Database seeded successfully with', products.length, 'products');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();