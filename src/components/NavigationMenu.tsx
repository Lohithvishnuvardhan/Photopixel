import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'cameras',
    name: 'Cameras',
    path: '/cameras',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    path: '/lenses',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    path: '/accessories',
  },
  {
    id: 'batteries',
    name: 'Batteries',
    path: '/batteries',
  }
];

export function NavigationMenu() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 py-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {category.name}
            </Link>
          ))}
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
} 