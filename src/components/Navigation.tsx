import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Layout } from 'lucide-react';
import logo from '../assets/logo_small.jpg';

function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" style={{ height: 80, width: 80 }} />
              <span className="font-bold text-l text-gray-900">
                Whitehats'
                <br />
                Scenario Builder
                <br />
                Studio
              </span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/email-builder"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/email-builder')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email Builder</span>
            </Link>

            <Link
              to="/website-builder"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/website-builder')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Website Builder</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
