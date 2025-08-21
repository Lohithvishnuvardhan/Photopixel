import { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  newUsersToday: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  amount: number;
  status: string;
  date: string;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1250,
    totalProducts: 156,
    totalOrders: 892,
    totalRevenue: 2450000,
    monthlyRevenue: 450000,
    pendingOrders: 23,
    lowStockProducts: 8,
    newUsersToday: 12
  });

  const [recentOrders] = useState<RecentOrder[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      amount: 324900,
      status: 'Processing',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      amount: 199990,
      status: 'Shipped',
      date: '2024-01-15'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Johnson',
      amount: 89990,
      status: 'Delivered',
      date: '2024-01-14'
    }
  ]);

  const [topProducts] = useState<TopProduct[]>([
    {
      id: '1',
      name: 'Canon EOS R5',
      sales: 45,
      revenue: 1462050
    },
    {
      id: '2',
      name: 'Sony A7 IV',
      sales: 38,
      revenue: 797620
    },
    {
      id: '3',
      name: 'Nikon Z6 II',
      sales: 32,
      revenue: 527680
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+{stats.newUsersToday} today</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-sm text-orange-600 mt-1">{stats.lowStockProducts} low stock</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-sm text-yellow-600 mt-1">{stats.pendingOrders} pending</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-green-600 mt-1">+15% this month</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Manage Products</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">View Orders</h3>
                <p className="text-sm text-gray-600">Manage customer orders</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <p className="text-sm text-gray-600">Manage user accounts</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/revenue"
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Revenue Analytics</h3>
                <p className="text-sm text-gray-600">View sales reports</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                <Link
                  to="/admin/products"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;