import React, { useState, useEffect } from 'react';
import { User, Edit, Lock } from 'lucide-react';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Free');
  const [editingUsername, setEditingUsername] = useState(false);

  useEffect(() => {
    // Fetch the email, plan, and username from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPlan = localStorage.getItem('plan') || 'Free'; // Default to 'Free' plan if not set
    const storedUsername = localStorage.getItem('username') || ''; // Default to empty string if no username is set
    setEmail(storedEmail || 'No Email Found');
    setPlan(storedPlan);
    setUsername(storedUsername);
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const toggleEditingUsername = () => {
    if (editingUsername) {
      // Save the new username to localStorage when editing is finished
      localStorage.setItem('username', username);
    }
    setEditingUsername((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Profile Page
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-24 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
              <h2 className="text-lg font-semibold mb-4">User Info</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Plan:</span>
                  <span className="text-white">{plan}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Edit */}
          <div className="col-span-9">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {editingUsername ? 'Edit Username' : 'Username'}
                  </h2>
                  <p className="text-gray-400 mt-1">Set your desired username</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleEditingUsername}
                    className="px-4 py-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                  >
                    {editingUsername ? <Edit className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    {editingUsername ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Username Section */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <User className="w-5 h-5 text-violet-400" />
                    Username
                  </h3>
                  {editingUsername ? (
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      className="w-full p-3 rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                      placeholder="Enter new username"
                    />
                  ) : (
                    <p className="text-gray-300">{username || 'No username set'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
