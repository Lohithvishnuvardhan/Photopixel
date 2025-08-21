import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronDown, ChevronUp, ShoppingBag, Filter, Search, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'processing':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-blue-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-gray-500" />;
  }
};

export function Orders() {
  const { orders } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No orders found</h2>
          <p className="text-gray-300 mb-6">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="border-b border-gray-700 bg-gray-800/50 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-white">Order History</h1>
                <p className="mt-2 text-gray-400">
                  Track and manage your orders
                </p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full md:w-64 text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-white"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  <span>
                    {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-700">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-gray-800 hover:bg-gray-700/50 transition-colors">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleOrderExpansion(order._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">Order #{order._id}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p className="text-lg font-medium text-white">
                          ₹{order.totalPrice.toLocaleString()}
                        </p>
                      </div>
                      {expandedOrder === order._id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order._id && (
                  <div className="border-t border-gray-700 bg-gray-800/50 p-6">
                    <div className="space-y-4">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{item.name}</h4>
                            <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                            <p className="text-sm font-medium text-purple-400">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Subtotal</p>
                            <p className="font-medium text-white">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-white">Order Total:</span>
                          <span className="text-purple-400">₹{order.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          <Clock className="inline-block h-4 w-4 mr-1" />
                          Order placed on {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}