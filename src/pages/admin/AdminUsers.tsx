import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  CheckCircle,
  Users,
  Mail,
  Calendar,
  MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'banned' | 'pending';
  role: 'customer' | 'admin';
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  address?: {
    city: string;
    state: string;
    country: string;
  };
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      totalOrders: 5,
      totalSpent: 125000,
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA'
      }
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      totalOrders: 3,
      totalSpent: 89000,
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      status: 'pending',
      role: 'customer',
      joinDate: '2024-01-18',
      lastLogin: '2024-01-18',
      totalOrders: 0,
      totalSpent: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
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
      day: 'numeric'
    });
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'banned') => {
    setUsers(users.map(user => 
      user._id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`User ${newStatus === 'active' ? 'activated' : 'banned'} successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage customer accounts and permissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">
                  {filteredUsers.length} Users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Users</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Banned Users</p>
                <p className="text-3xl font-bold text-red-600">
                  {users.filter(u => u.status === 'banned').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
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
                placeholder="Search users..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredUsers.length} of {users.length} users
              </span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.phone && (
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {user.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View User"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(user._id, 'banned')}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Ban User"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(user._id, 'active')}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Activate User"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all' || roleFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No users have registered yet.'}
              </p>
            </div>
          )}
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedUser.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                      {selectedUser.phone && (
                        <p><span className="font-medium">Phone:</span> {selectedUser.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Account Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Role:</span> 
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role}
                        </span>
                      </p>
                      <p><span className="font-medium">Join Date:</span> {formatDate(selectedUser.joinDate)}</p>
                      <p><span className="font-medium">Last Login:</span> {formatDate(selectedUser.lastLogin)}</p>
                    </div>
                  </div>
                </div>

                {selectedUser.address && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{selectedUser.address.city}, {selectedUser.address.state}, {selectedUser.address.country}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Order Statistics</h3>
                    <p className="text-2xl font-bold text-blue-600">{selectedUser.totalOrders}</p>
                    <p className="text-sm text-blue-700">Total Orders</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-900 mb-2">Total Spent</h3>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedUser.totalSpent)}</p>
                    <p className="text-sm text-green-700">Lifetime Value</p>
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

export default AdminUsers;