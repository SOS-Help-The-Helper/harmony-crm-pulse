import React, { useState, useEffect } from 'react';
import { Building, MapPin, Globe, Users, DollarSign, TrendingUp, Target, Heart } from 'lucide-react';
import { Company } from './types/hubspot';
import { fetchCompanyData } from './services/api';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';

/**
 * @hubspot/component
 * @hubspot/objectTypes COMPANY
 * Business intelligence and company health metrics
 */

interface CompanyMetricsProps {
  hs_object_id: string;
}

const CompanyMetrics: React.FC<CompanyMetricsProps> = ({ hs_object_id }) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading company data for:', hs_object_id);
        const data = await fetchCompanyData(hs_object_id);
        console.log('Company data loaded:', data);
        setCompany(data);
      } catch (err) {
        console.error('Company loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load company data');
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [hs_object_id]);

  if (loading) {
    return <LoadingSkeleton type="company" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!company) {
    return <ErrorMessage message="No company data available" />;
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthScoreIcon = (score: number) => {
    if (score >= 80) return '💚';
    if (score >= 60) return '💛';
    return '❤️';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Building className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Company Metrics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Company Information</h3>
          
          <div>
            <div className="text-sm text-gray-600">Company Name</div>
            <div className="text-xl font-semibold text-gray-900">{company.name}</div>
          </div>
          
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Industry:</span>
            <span className="text-gray-900 font-medium">{company.industry}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Location:</span>
            <span className="text-gray-900">{company.location}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Website:</span>
            <a href={company.website} target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:text-blue-800 underline">
              {company.website}
            </a>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Business Metrics</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Employees</span>
            </div>
            <span className="text-gray-900 font-medium">
              {company.employeeCount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Annual Revenue</span>
            </div>
            <span className="text-gray-900 font-medium">
              ${company.annualRevenue.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Health Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getHealthScoreIcon(company.healthScore)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(company.healthScore)}`}>
                {company.healthScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Metrics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">CRM Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Total Deals</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{company.totalDeals}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Active Contacts</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{company.activeContacts}</div>
          </div>
        </div>
      </div>

      {/* Business Intelligence Insights */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Intelligence Insights</h3>
        <div className="space-y-3">
          {company.insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyMetrics;
