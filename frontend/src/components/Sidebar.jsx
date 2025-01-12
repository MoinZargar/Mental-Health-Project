import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-700 text-white p-4 md:w-1/5 w-full md:block hidden">
      <h1 className="text-2xl font-bold mb-8">Mental Health App</h1>
      <ul className="space-y-8">
        <li>
          <Link to="/" className="hover:text-gray-400 text-lg">Home</Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-gray-400 text-lg">Dashboard</Link>
        </li>
        <li>
          <Link to="/tests" className="hover:text-gray-400 text-lg">Tests</Link>
        </li>
        <li>
          <Link to="/chat/depression" className="hover:text-gray-400 text-lg">Chatrooms</Link>
        </li>
        <li>
          <Link to="/facialEmotionAnalyzer" className="hover:text-gray-400 text-lg">Facial Emotion</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
