import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter
} from 'lucide-react';

interface RevenueData {
  period: string;
  revenue: number;
  orders: number;
  growth: number;
}

interface CategoryRevenue {
  category: string;
  revenue: number;
  percentage: number;
  color: string;
}

interface TopProduct {
  name: string;
  revenue: number;
  units: number;
}

const AdminRevenue = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { period: 'Jan 15', revenue: 45000, orders: 12, growth: 15.2 },
    { period: 'Jan 16', revenue: 52000, orders: 15, growth: 18.5 },
    { period: 'Jan 17', revenue: 38000, orders: 9, growth: -12.3 },
    { period: 'Jan 18', revenue: 61000, orders: 18, growth: 22.1 },
    { period: 'Jan 19', revenue: 48000, orders: 13, growth: 8.7 },
    { period: 'Jan 20', revenue: 55000, orders: 16, growth: 16.4 },
    { period: 'Jan 21', revenue: 72000, orders: 21, growth: 28.9 }
  ]);

  const [categoryRevenue, setCategoryRevenue] = useState<CategoryRevenue[]>([
    { category: 'Cameras', revenue: 1250000, percentage: 45, color: 'bg-blue-500' },
    { category: 'Lenses', revenue: 850000, percentage: 30, color: 'bg-green-500' },
    { category: 'Accessories', revenue: 450000, percentage: 16, color: 'bg-yellow-500' },
    { category: 'Batteries', revenue: 250000, percentage: 9, color: 'bg-purple-500' }
  ]);

  const [topProducts, setTopProducts] = useState<TopProduct[]>([
    { name: 'Canon EOS R5', revenue: 324900, units: 45 },
    { name: 'Sony A7 IV', revenue: 209990, units: 38 },
    { name: 'Nikon Z6 II', revenue: 164990, units: 32 },
    { name: 'Canon RF 24-70mm', revenue: 219990, units: 28 },
    { name: 'Sony FE 70-200mm', revenue: 259990, units: 25 }
  ]);

  const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = revenueData.reduce((sum, data) => sum + data.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const overallGrowth = revenueData.reduce((sum, data) => sum + data.growth, 0) / revenueData.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log('Exporting revenue data...');
    alert('Revenue data exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="text-gray-600 mt-2">Track your sales performance and revenue trends</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={handleExportData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  {overallGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${overallGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(overallGrowth)}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(totalOrders / revenueData.length)} avg/day
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
                <p className="text-sm text-green-600 mt-2">+12.5% vs last period</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">3.2%</p>
                <p className="text-sm text-green-600 mt-2">+0.8% vs last period</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <PieChart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-gray-600">{data.period}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(data.revenue / Math.max(...revenueData.map(d => d.revenue))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(data.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{data.orders} orders</p>
                    <div className="flex items-center">
                      {data.growth >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(data.growth)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Category</h2>
            <div className="space-y-4">
              {categoryRevenue.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="font-medium text-gray-900">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(category.revenue)}</p>
                    <p className="text-sm text-gray-600">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex h-4 rounded-full overflow-hidden">
                {categoryRevenue.map((category, index) => (
                  <div
                    key={index}
                    className={category.color}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products by Revenue</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.units} units sold</p>
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
  );
};

export default AdminRevenue;