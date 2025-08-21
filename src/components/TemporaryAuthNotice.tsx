import React from 'react';
import { Info } from 'lucide-react';

export const TemporaryAuthNotice: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <Info className="h-5 w-5 text-blue-600 mr-2" />
        <div>
          <h3 className="text-sm font-medium text-blue-800">
            Demo Mode - Frontend Only
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            This is a frontend-only demo. All data is stored locally and resets on page refresh.
            No backend server is required.
          </p>
        </div>
      </div>
    </div>
  );
};