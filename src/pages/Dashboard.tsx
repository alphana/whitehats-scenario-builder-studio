import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Layout } from 'lucide-react';

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/email-builder"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Email Builder
              </h2>
              <p className="text-gray-600 mt-1">
                Create and manage email templates
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/website-builder"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Layout className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Website Builder
              </h2>
              <p className="text-gray-600 mt-1">Design and deploy websites</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
