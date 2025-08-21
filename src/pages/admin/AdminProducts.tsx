import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Package,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

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
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      _id: '1',
      name: 'Canon EOS R5',
      price: 324900,
      category: 'Cameras',
      stock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
      description: '45MP Full-Frame Mirrorless Camera',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      _id: '2',
      name: 'Sony A7 IV',
      price: 209990,
      category: 'Cameras',
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80',
      description: '33MP Full-Frame Mirrorless Camera',
      status: 'active',
      createdAt: '2024-01-02'
    },
    {
      _id: '3',
      name: 'Canon RF 24-70mm f/2.8L',
      price: 219990,
      category: 'Lenses',
      stock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80',
      description: 'Professional Standard Zoom Lens',
      status: 'active',
      createdAt: '2024-01-03'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = ['Cameras', 'Lenses', 'Accessories', 'Batteries'];

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

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== productId));
      toast.success('Product deleted successfully');
    }
  };

  const handleToggleStatus = (productId: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>
          <Link
            to="/admin/products/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </Link>
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
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(product._id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Product"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
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
      </div>
    </div>
  );
};

export default AdminProducts;