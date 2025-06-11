import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Target, ArrowRight, Percent } from 'lucide-react';
import { Deal } from './types/hubspot';
import { fetchDealData } from './services/api';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';

/**
 * @hubspot/component
 * @hubspot/objectTypes DEAL
 * Deal management with probability scoring and insights
 */

interface DealPipelineProps {
  hs_object_id: string;
}

const DealPipeline: React.FC<DealPipelineProps> = ({ hs_object_id }) => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDealData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading deal data for:', hs_object_id);
        const data = await fetchDealData(hs_object_id);
        console.log('Deal data loaded:', data);
        setDeal(data);
      } catch (err) {
        console.error('Deal loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load deal data');
      } finally {
        setLoading(false);
      }
    };

    loadDealData();
  }, [hs_object_id]);

  if (loading) {
    return <LoadingSkeleton type="deal" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!deal) {
    return <ErrorMessage message="No deal data available" />;
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100';
    if (probability >= 60) return 'text-blue-600 bg-blue-100';
    if (probability >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Deal Pipeline</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Deal Details</h3>
          
          <div>
            <div className="text-sm text-gray-600">Deal Name</div>
            <div className="text-xl font-semibold text-gray-900">{deal.name}</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Amount</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ${deal.amount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Close Date</span>
            </div>
            <span className="text-gray-900 font-medium">{deal.closeDate}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Pipeline Stage</span>
            </div>
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: deal.stageColor + '20', color: deal.stageColor }}
            >
              {deal.stage}
            </span>
          </div>
        </div>

        {/* Probability & Insights */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Win Probability</h3>
          
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getProbabilityColor(deal.probability)}`}>
              <Percent className="h-5 w-5" />
              <span className="text-2xl font-bold">{deal.probability}%</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Expected Value</div>
            <div className="text-xl font-semibold text-gray-900">
              ${deal.expectedValue.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Next Action</span>
            </div>
            <div className="text-blue-700">{deal.nextAction}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Deal Progress</span>
          <span className="text-sm text-gray-500">{deal.probability}% likely to close</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${deal.probability}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DealPipeline;
