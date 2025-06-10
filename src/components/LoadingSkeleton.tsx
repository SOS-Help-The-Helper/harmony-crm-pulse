
import React from 'react';

interface LoadingSkeletonProps {
  type: 'contact' | 'deal' | 'company';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  const renderContactSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-200 rounded-lg w-10 h-10"></div>
        <div className="h-6 bg-gray-200 rounded w-40"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDealSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-200 rounded-lg w-10 h-10"></div>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-28"></div>
          <div className="text-center">
            <div className="h-12 bg-gray-200 rounded-full w-24 mx-auto"></div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanySkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-200 rounded-lg w-10 h-10"></div>
        <div className="h-6 bg-gray-200 rounded w-36"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-36"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'contact':
      return renderContactSkeleton();
    case 'deal':
      return renderDealSkeleton();
    case 'company':
      return renderCompanySkeleton();
    default:
      return renderContactSkeleton();
  }
};

export default LoadingSkeleton;
