import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';
import { Contact } from '@/types/hubspot';
import { fetchContactData } from '@/services/api';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

/**
 * @hubspot/component
 * @hubspot/objectTypes CONTACT
 * Enhanced contact analytics and engagement metrics from Harmony Business Solutions
 */

interface ContactInsightsProps {
  hs_object_id: string;
}

const ContactInsights: React.FC<ContactInsightsProps> = ({ hs_object_id }) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchContactData(hs_object_id);
        setContact(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contact data');
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, [hs_object_id]);

  if (loading) {
    return <LoadingSkeleton type="contact" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!contact) {
    return <ErrorMessage message="No contact data available" />;
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Contact Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
          
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-gray-900 font-medium">{contact.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{contact.email}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{contact.phone}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">{contact.company}</span>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Engagement Metrics</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Engagement Score</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEngagementColor(contact.engagementScore)}`}>
              {contact.engagementScore}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Total Deals</span>
            </div>
            <span className="text-gray-900 font-medium">{contact.totalDeals}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Deal Value</span>
            </div>
            <span className="text-gray-900 font-medium">
              ${contact.dealValue.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Last Activity</span>
            </div>
            <span className="text-gray-600">{contact.lastActivity}</span>
          </div>
        </div>
      </div>

      {/* Harmony Analytics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Harmony Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Response Rate</div>
            <div className="text-xl font-semibold text-blue-600">
              {contact.harmonayAnalytics.responseRate}%
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Preferred Channel</div>
            <div className="text-xl font-semibold text-green-600">
              {contact.harmonayAnalytics.preferredChannel}
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Timezone</div>
            <div className="text-xl font-semibold text-purple-600">
              {contact.harmonayAnalytics.timezone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInsights;
