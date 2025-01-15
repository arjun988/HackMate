import React, { useState, useEffect } from 'react';
import { User, Edit, Lock, Check, CreditCard, Mail, Crown } from 'lucide-react';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Free');
  const [editingUsername, setEditingUsername] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: ['Basic access', '100 credits/month', 'Email support']
    },
    pro: {
      name: 'Pro',
      price: { 
        monthly: { original: 20, discounted: 10 },
        yearly: { original: 200, discounted: 150 }
      },
      features: ['Unlimited access', 'Unlimited credits', 'Priority support', 'Advanced features', 'API access']
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPlan = localStorage.getItem('plan') || 'Free';
    const storedUsername = localStorage.getItem('username') || '';
    setEmail(storedEmail || 'No Email Found');
    setPlan(storedPlan);
    setUsername(storedUsername);
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const toggleEditingUsername = () => {
    if (editingUsername) {
      localStorage.setItem('username', username);
    }
    setEditingUsername((prev) => !prev);
  };

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan);
    localStorage.setItem('plan', selectedPlan);
  };

  const PricingCard = ({ planType, isActive }) => {
    const planData = plans[planType.toLowerCase()];
    const price = planData.price[billingCycle];
    const isFreePlan = planType.toLowerCase() === 'free';

    return (
      <div
        className={`relative bg-black/40 backdrop-blur-sm border ${
          isActive ? 'border-violet-500' : 'border-gray-800/50'
        } rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10`}
      >
        {isActive && (
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Current Plan
          </div>
        )}
        <div className="flex items-center gap-3 mb-4">
          {isFreePlan ? (
            <User className="w-6 h-6 text-violet-400" />
          ) : (
            <Crown className="w-6 h-6 text-violet-400" />
          )}
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
            {planData.name}
          </h3>
        </div>
        <div className="mt-4 mb-8">
          {isFreePlan ? (
            <div className="text-4xl font-bold text-white">Free</div>
          ) : (
            <div className="space-y-1">
              <div className="text-gray-400 line-through text-lg">
                ${typeof price === 'object' ? price.original : price}
                {billingCycle === 'monthly' ? '/month' : '/year'}
              </div>
              <div className="text-4xl font-bold text-white">
                ${typeof price === 'object' ? price.discounted : price}
                <span className="text-lg text-gray-400">
                  {billingCycle === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
            </div>
          )}
        </div>
        <ul className="space-y-4 mb-8">
          {planData.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-violet-400" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePlanSelect(planData.name)}
          className={`w-full py-3 rounded-lg ${
            isActive
              ? 'bg-gray-800 cursor-not-allowed'
              : 'bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600'
          } text-white transition-all duration-300 font-medium`}
          disabled={isActive}
        >
          {isActive ? 'Current Plan' : 'Select Plan'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md z-10 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Profile Page
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-28 bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
              <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                User Info
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                  <Mail className="w-5 h-5 text-violet-400" />
                  <div>
                    <span className="text-sm text-gray-400 block">Email</span>
                    <span className="text-white">{email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                  <Crown className="w-5 h-5 text-violet-400" />
                  <div>
                    <span className="text-sm text-gray-400 block">Current Plan</span>
                    <span className="text-white">{plan}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 space-y-8">
            {/* Profile Edit Section */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {editingUsername ? 'Edit Username' : 'Profile Settings'}
                  </h2>
                  <p className="text-gray-400 mt-2">Manage your profile information</p>
                </div>
                <button
                  onClick={toggleEditingUsername}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white transition-all duration-300 flex items-center gap-2 font-medium"
                >
                  {editingUsername ? <Edit className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  {editingUsername ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Username</h3>
                    <p className="text-gray-400 text-sm">This is your public display name</p>
                  </div>
                </div>
                {editingUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full p-4 rounded-lg bg-black/50 text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-300"
                    placeholder="Enter your username"
                  />
                ) : (
                  <p className="text-gray-300 text-lg">{username || 'No username set'}</p>
                )}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    Subscription Plans
                  </h2>
                  <p className="text-gray-400 mt-2">Choose the plan that works best for you</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-lg">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium ${
                      billingCycle === 'monthly'
                        ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium ${
                      billingCycle === 'yearly'
                        ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <PricingCard planType="Free" isActive={plan === 'Free'} />
                <PricingCard planType="Pro" isActive={plan === 'Pro'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;