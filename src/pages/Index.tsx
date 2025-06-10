
import React, { useState } from 'react';
import { User, TrendingUp, Building, Settings } from 'lucide-react';
import ContactInsights from '@/components/ContactInsights';
import DealPipeline from '@/components/DealPipeline';
import CompanyMetrics from '@/components/CompanyMetrics';

type TabType = 'contact' | 'deal' | 'company';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('contact');
  const [contactId, setContactId] = useState('demo-contact-001');
  const [dealId, setDealId] = useState('demo-deal-001');
  const [companyId, setCompanyId] = useState('demo-company-001');

  const tabs = [
    {
      id: 'contact' as TabType,
      label: 'Contact Insights',
      icon: User,
      color: 'blue',
    },
    {
      id: 'deal' as TabType,
      label: 'Deal Pipeline',
      icon: TrendingUp,
      color: 'green',
    },
    {
      id: 'company' as TabType,
      label: 'Company Metrics',
      icon: Building,
      color: 'purple',
    },
  ];

  const getTabClassName = (tabId: TabType, color: string) => {
    const isActive = activeTab === tabId;
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200';
    
    if (isActive) {
      switch (color) {
        case 'blue':
          return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`;
        case 'green':
          return `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
        case 'purple':
          return `${baseClasses} bg-purple-100 text-purple-700 border border-purple-200`;
        default:
          return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
      }
    }
    
    return `${baseClasses} text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-transparent`;
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactInsights contactId={contactId} />;
      case 'deal':
        return <DealPipeline dealId={dealId} />;
      case 'company':
        return <CompanyMetrics companyId={companyId} />;
      default:
        return <ContactInsights contactId={contactId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Harmony HubSpot Components
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Business Intelligence for HubSpot CRM
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={getTabClassName(tab.id, tab.color)}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Demo ID Inputs */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contact ID</label>
                <input
                  type="text"
                  value={contactId}
                  onChange={(e) => setContactId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter contact ID"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Deal ID</label>
                <input
                  type="text"
                  value={dealId}
                  onChange={(e) => setDealId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter deal ID"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Company ID</label>
                <input
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter company ID"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Component */}
        <div className="animate-fade-in">
          {renderActiveComponent()}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Harmony Business Solutions HubSpot Integration</p>
            <p className="mt-1">Built for seamless CRM enhancement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
