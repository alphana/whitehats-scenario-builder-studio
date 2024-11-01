import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import EmailBuilder from './pages/EmailBuilder';
import WebsiteBuilder from './pages/WebsiteBuilder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/email-builder" element={<EmailBuilder />} />
            <Route path="/website-builder" element={<WebsiteBuilder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;