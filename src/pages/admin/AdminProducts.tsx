import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Package,
  AlertTriangle,
  Camera,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  specs?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
  isStatic?: boolean; // To identify static vs admin-added products
}

// Import all static products from different pages
const staticCameras = [
  {
    _id: '1',
    name: 'Canon EOS R5',
    price: 324900,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: '45MP Full-Frame Mirrorless Camera',
    category: 'Cameras',
    stock: 10,
    status: 'active' as const,
    createdAt: '2024-01-01',
    isStatic: true,
    specs: ['45MP Full-Frame CMOS Sensor', '8K RAW Video Recording', 'Dual Card Slots', 'In-Body Image Stabilization'],
    features: ['Advanced Dual Pixel CMOS AF II', 'Up to 20fps Electronic Shutter', 'Subject Detection AF', 'Weather-Sealed Construction'],
    rating: 4.9,
    reviews: 128
  },
  {
    _id: '2',
    name: 'Sony A7 IV',
    price: 209990,
    imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
    description: '33MP Full-Frame Mirrorless Camera',
    category: 'Cameras',
    stock: 15,
    status: 'active' as const,
    createdAt: '2024-01-02',
    isStatic: true,
    specs: ['33MP Full-Frame Sensor', '4K 60p Video', '10fps Continuous Shooting', 'Advanced AF System'],
    features: ['Real-time Eye AF', 'Creative Look Presets', 'S-Cinetone Color Science', 'Enhanced Heat Dissipation'],
    rating: 4.8,
    reviews: 95
  },
  {
    _id: '3',
    name: 'Nikon Z6 II',
    price: 164990,
    imageUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80',
    description: '24.5MP Full-Frame Mirrorless Camera',
    category: 'Cameras',
    stock: 12,
    status: 'active' as const,
    createdAt: '2024-01-03',
    isStatic: true,
    specs: ['24.5MP BSI Sensor', 'Dual EXPEED 6 Processors', '14fps Continuous Shooting', 'Dual Memory Card Slots'],
    features: ['273-Point AF System', 'ProRes RAW Output', 'Weather-Sealed Body', '5-Axis VR Stabilization'],
    rating: 4.7,
    reviews: 82
  },
  {
    _id: '4',
    name: 'Fujifilm X-T4',
    price: 149990,
    imageUrl: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
    description: '26.1MP APS-C Mirrorless Camera',
    category: 'Cameras',
    stock: 8,
    status: 'active' as const,
    createdAt: '2024-01-04',
    isStatic: true,
    specs: ['26.1MP X-Trans Sensor', '6.5-Stop IBIS', '4K/60p Video', '15fps Mechanical Shutter'],
    features: ['Film Simulation Modes', 'Vari-angle LCD Screen', 'Enhanced Battery Life', 'Dual UHS-II Card Slots'],
    rating: 4.8,
    reviews: 76
  }
];

const staticLenses = [
  {
    _id: '5',
    name: 'Canon RF 24-70mm f/2.8L IS USM',
    price: 219990,
    imageUrl: "https://i.pcmag.com/imagery/reviews/03Urtsla2p00JqUsuhKXvij-1..v1623334533.jpg",
    description: 'Professional Standard Zoom Lens',
    category: 'Lenses',
    stock: 8,
    status: 'active' as const,
    createdAt: '2024-01-05',
    isStatic: true,
    specs: ['Constant f/2.8 Aperture', 'Image Stabilization', 'Nano USM AF System', 'Weather-Sealed Construction'],
    features: ['Customizable Control Ring', 'Dust and Water Resistant', 'Minimum Focus Distance: 0.21m', 'Advanced Optical Design'],
    rating: 4.9,
    reviews: 156
  },
  {
    _id: '6',
    name: 'Sony FE 70-200mm f/2.8 GM II',
    price: 259990,
    imageUrl: "https://i.postimg.cc/qqYB6V8L/sony-fe-70-200mm-f2-8-gm-oss-ii-front-element-2-PA010004.webp",
    description: 'Professional Telephoto Zoom Lens',
    category: 'Lenses',
    stock: 5,
    status: 'active' as const,
    createdAt: '2024-01-06',
    isStatic: true,
    specs: ['Constant f/2.8 Aperture', 'Dual XD Linear Motors', 'Optical SteadyShot', 'Nano AR Coating II'],
    features: ['Advanced AF System', 'Improved Close-up Performance', 'Reduced Weight Design', 'Dust and Moisture Resistant'],
    rating: 4.8,
    reviews: 92
  },
  {
    _id: '7',
    name: 'Nikon Z 50mm f/1.2 S',
    price: 199990,
    imageUrl: "https://i.postimg.cc/mDsHhMbD/Nikon-Nikkor-Z-50mm-f1-2-S-lens.jpg",
    description: 'Professional Prime Lens',
    category: 'Lenses',
    stock: 6,
    status: 'active' as const,
    createdAt: '2024-01-07',
    isStatic: true,
    specs: ['Ultra-Fast f/1.2 Aperture', 'Multi-Focus System', 'ARNEO Coating', 'Customizable Control Ring'],
    features: ['Superior Edge-to-Edge Sharpness', 'Beautiful Bokeh Rendering', 'Weather-Sealed Design', 'Nano Crystal Coat'],
    rating: 4.9,
    reviews: 78
  },
  {
    _id: '8',
    name: 'Sigma 14-24mm f/2.8 DG DN Art',
    price: 129990,
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
    description: 'Ultra-Wide Zoom Lens',
    category: 'Lenses',
    stock: 10,
    status: 'active' as const,
    createdAt: '2024-01-08',
    isStatic: true,
    specs: ['Constant f/2.8 Aperture', 'Mirrorless Design', 'Super Multi-Layer Coating', 'Brass Bayonet Mount'],
    features: ['Zero Distortion Design', 'Weather-Sealed Construction', 'Minimum Focus: 28cm', 'Advanced Optical Elements'],
    rating: 4.7,
    reviews: 64
  }
];

const staticAccessories = [
  {
    _id: '9',
    name: 'Peak Design Camera Strap',
    price: 5990,
    imageUrl: "https://i.postimg.cc/qvDwt1Y7/Access1.avif",
    description: 'Professional Camera Strap with Quick-Release System',
    category: 'Accessories',
    stock: 20,
    status: 'active' as const,
    createdAt: '2024-01-09',
    isStatic: true,
    specs: ['Quick-Release System', 'Adjustable Length 38"-57"', 'Aircraft-Grade Aluminum', 'Weatherproof Construction'],
    features: ['Compatible with All Cameras', 'Comfort-Padded Design', 'Anti-Slip Technology'],
    rating: 4.8,
    reviews: 145
  },
  {
    _id: '10',
    name: 'Manfrotto MT055XPRO4 Tripod',
    price: 24990,
    imageUrl: "https://m.media-amazon.com/images/I/51UFAE2RyDL._AC_UF1000,1000_QL80_.jpg",
    description: 'Professional Carbon Fiber Tripod',
    category: 'Accessories',
    stock: 12,
    status: 'active' as const,
    createdAt: '2024-01-10',
    isStatic: true,
    specs: ['Carbon Fiber Construction', 'Max Height: 170cm', 'Load Capacity: 9kg', 'Weight: 2.1kg'],
    features: ['90° Column System', 'Easy Link Connection', 'Bubble Level Included'],
    rating: 4.7,
    reviews: 89
  },
  {
    _id: '11',
    name: 'Godox V1 Flash',
    price: 32990,
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80',
    description: 'Professional Round Head Flash',
    category: 'Accessories',
    stock: 7,
    status: 'active' as const,
    createdAt: '2024-01-11',
    isStatic: true,
    specs: ['Round Head Design', '2.4GHz Wireless', 'High-Speed Sync', 'Li-ion Battery'],
    features: ['TTL Auto Flash', 'Built-in X System', 'Magnetic Mount'],
    rating: 4.6,
    reviews: 67
  },
  {
    _id: '12',
    name: 'Peak Design Everyday Backpack',
    price: 21990,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80',
    description: 'Professional Camera Backpack',
    category: 'Accessories',
    stock: 15,
    status: 'active' as const,
    createdAt: '2024-01-12',
    isStatic: true,
    specs: ['30L Capacity', 'Weatherproof Canvas', 'Laptop Sleeve 15"', 'Weight: 1.8kg'],
    features: ['MagLatch Top Access', 'Dual Side Access', 'FlexFold Dividers'],
    rating: 4.9,
    reviews: 123
  }
];

const staticBatteries = [
  {
    _id: '13',
    name: 'Canon LP-E6NH Battery',
    price: 14000,
    imageUrl: "https://i.postimg.cc/yx6sb6Tn/battery.avif",
    description: 'High Capacity Battery for Canon EOS R Series',
    category: 'Batteries',
    stock: 25,
    status: 'active' as const,
    createdAt: '2024-01-13',
    isStatic: true,
    specs: ['2130mAh Capacity', 'Up to 2030 Shots', 'USB-C Charging', 'Info Communication'],
    features: ['Enhanced Heat Resistance', 'Cold Weather Performance', 'Real-time Battery Info'],
    rating: 4.8,
    reviews: 234
  },
  {
    _id: '14',
    name: 'Sony NP-FZ100 Battery',
    price: 12990,
    imageUrl: "https://i.postimg.cc/3RRtSPvm/battery1.avif",
    description: 'Professional Battery for Sony Alpha Cameras',
    category: 'Batteries',
    stock: 30,
    status: 'active' as const,
    createdAt: '2024-01-14',
    isStatic: true,
    specs: ['2280mAh Capacity', 'Up to 710 Shots', 'Info-Lithium Technology', 'Fast Charging'],
    features: ['Accurate Power Indication', 'Over-charge Protection', 'Memory Effect Free'],
    rating: 4.7,
    reviews: 189
  },
  {
    _id: '15',
    name: 'Nikon EN-EL15c Battery',
    price: 11990,
    imageUrl: "https://i.postimg.cc/gcLCGZxR/battery2.avif",
    description: 'Advanced Battery for Nikon Z Series',
    category: 'Batteries',
    stock: 18,
    status: 'active' as const,
    createdAt: '2024-01-15',
    isStatic: true,
    specs: ['2280mAh Capacity', 'USB Charging Compatible', 'Enhanced Performance', 'Long Battery Life'],
    features: ['Smart Battery Management', 'Overcharge Protection', 'Temperature Monitoring'],
    rating: 4.6,
    reviews: 156
  },
  {
    _id: '16',
    name: 'Fujifilm NP-W235 Battery',
    price: 9990,
    imageUrl: "https://i.postimg.cc/3RsbktkG/battery3.avif",
    description: 'High-Performance Battery for Fujifilm Cameras',
    category: 'Batteries',
    stock: 22,
    status: 'active' as const,
    createdAt: '2024-01-16',
    isStatic: true,
    specs: ['2200mAh Capacity', 'Up to 500 Shots', 'Quick Charging', 'Battery Level Indicator'],
    features: ['Advanced Power Management', 'Protection Circuit Built-in', 'Extended Lifespan Design'],
    rating: 4.5,
    reviews: 98
  }
];

// Combine all static products
const allStaticProducts = [
  ...staticCameras,
  ...staticLenses,
  ...staticAccessories,
  ...staticBatteries
];

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const categories = ['Cameras', 'Lenses', 'Accessories', 'Batteries'];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      
      // Fetch admin-added products from API
      const response = await api.get('/products');
      const adminProducts = response.data.map((product: any) => ({
        ...product,
        isStatic: false,
        status: product.status || 'active',
        createdAt: product.createdAt || new Date().toISOString(),
        specs: product.specs || [],
        features: product.features || [],
        rating: product.rating || 4.5,
        reviews: product.reviews || 0
      }));

      // Combine static products with admin-added products
      const combinedProducts = [
        ...allStaticProducts,
        ...adminProducts.filter((adminProduct: Product) => 
          !allStaticProducts.some(staticProduct => staticProduct._id === adminProduct._id)
        )
      ];

      setProducts(combinedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // If API fails, show only static products
      setProducts(allStaticProducts);
      toast.error('Failed to fetch some products from server');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDeleteProduct = (productId: string, isStatic: boolean) => {
    if (isStatic) {
      toast.error('Cannot delete static products');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== productId));
      toast.success('Product deleted successfully');
    }
  };

  const handleToggleStatus = (productId: string, isStatic: boolean) => {
    if (isStatic) {
      toast.error('Cannot modify static product status');
      return;
    }

    setProducts(products.map(p => 
      p._id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
    toast.success('Product status updated');
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (stock <= 5) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-100' };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cameras':
        return <Camera className="h-4 w-4" />;
      case 'Lenses':
        return <Eye className="h-4 w-4" />;
      case 'Accessories':
        return <Package className="h-4 w-4" />;
      case 'Batteries':
        return <Zap className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const productStats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    inactive: products.filter(p => p.status === 'inactive').length,
    lowStock: products.filter(p => p.stock <= 5).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    static: products.filter(p => p.isStatic).length,
    adminAdded: products.filter(p => !p.isStatic).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your complete product inventory</p>
          </div>
          <Link
            to="/admin/products/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{productStats.total}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{productStats.active}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{productStats.inactive}</p>
              <p className="text-sm text-gray-600">Inactive</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{productStats.lowStock}</p>
              <p className="text-sm text-gray-600">Low Stock</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{productStats.outOfStock}</p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{productStats.static}</p>
              <p className="text-sm text-gray-600">Static Products</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{productStats.adminAdded}</p>
              <p className="text-sm text-gray-600">Admin Added</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredProducts.length} of {products.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryIcon(product.category)}
                          <span className="ml-1">{product.category}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {product.stock} units
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{stockStatus.text}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(product._id, product.isStatic || false)}
                          disabled={product.isStatic}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } ${product.isStatic ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                        >
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isStatic 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.isStatic ? 'Static' : 'Custom'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm font-medium text-gray-900">
                            {product.rating?.toFixed(1) || 'N/A'}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Product Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {!product.isStatic && (
                            <>
                              <Link
                                to={`/admin/products/edit/${product._id}`}
                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit Product"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteProduct(product._id, product.isStatic || false)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {product.isStatic && (
                            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                              Read-only
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first product.'}
              </p>
              {!searchQuery && categoryFilter === 'all' && statusFilter === 'all' && (
                <Link
                  to="/admin/products/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Product Details Modal */}
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                      <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedProduct.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedProduct.stock} units</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryIcon(selectedProduct.category)}
                          <span className="ml-1">{selectedProduct.category}</span>
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium">{selectedProduct.rating?.toFixed(1) || 'N/A'}</span>
                          <span className="text-gray-500">({selectedProduct.reviews || 0} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProduct.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedProduct.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProduct.isStatic 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedProduct.isStatic ? 'Static Product' : 'Admin Added'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProduct.specs.map((spec, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    Created: {new Date(selectedProduct.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;