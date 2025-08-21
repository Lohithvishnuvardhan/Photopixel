import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  orderItems: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
  updatedAt: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      _id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      orderItems: [
        {
          name: 'Canon EOS R5',
          quantity: 1,
          price: 324900,
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80'
        }
      ],
      totalAmount: 324900,
      status: 'processing',
      paymentStatus: 'paid',
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        pincode: '10001'
      },
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T11:00:00Z'
    },
    {
      _id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      orderItems: [
        {
          name: 'Sony A7 IV',
          quantity: 1,
          price: 209990,
          image: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048?auto=format&fit=crop&q=80'
        }
      ],
      totalAmount: 209990,
      status: 'shipped',
      paymentStatus: 'paid',
      shippingAddress: {
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        pincode: '90210'
      },
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z'
    },
    {
      _id: 'ORD-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@example.com',
      orderItems: [
        {
          name: 'Nikon Z6 II',
          quantity: 1,
          price: 164990,
          image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80'
        }
      ],
      totalAmount: 164990,
      status: 'delivered',
      paymentStatus: 'paid',
      shippingAddress: {
        address: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        pincode: '60601'
      },
      createdAt: '2024-01-12T16:45:00Z',
      updatedAt: '2024-01-14T12:30:00Z'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order._id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-2">Track and manage customer orders</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-200">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  {filteredOrders.length} Orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{orderStats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{orderStats.processing}</p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{orderStats.shipped}</p>
              <p className="text-sm text-gray-600">Shipped</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
              <p className="text-sm text-gray-600">Cancelled</p>
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
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredOrders.length} of {orders.length} orders
              </span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order._id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {order.orderItems.slice(0, 3).map((item, index) => (
                            <img
                              key={index}
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value as Order['status'])}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all' || paymentFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No orders have been placed yet.'}
              </p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder._id}</h2>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Customer Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                      <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Order Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusIcon(selectedOrder.status)}
                          <span className="ml-1">{selectedOrder.status}</span>
                        </span>
                      </p>
                      <p><span className="font-medium">Payment:</span> 
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </p>
                      <p><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.createdAt)}</p>
                      <p><span className="font-medium">Last Updated:</span> {formatDate(selectedOrder.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Shipping Address</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                    <p>PIN: {selectedOrder.shippingAddress.pincode}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(item.price)}</p>
                          <p className="text-sm text-gray-600">
                            Total: {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                    <span className="text-2xl font-bold text-gray-900">{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;