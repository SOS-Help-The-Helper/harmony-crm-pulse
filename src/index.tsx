
// Main export file for HubSpot Developer Projects integration
export { default as ContactInsights } from './components/ContactInsights';
export { default as DealPipeline } from './components/DealPipeline';
export { default as CompanyMetrics } from './components/CompanyMetrics';

// Export types for TypeScript support
export type { Contact, Deal, Company, APIResponse } from './types/hubspot';

// Export API functions for custom integrations
export { fetchContactData, fetchDealData, fetchCompanyData } from './services/api';

// Default export for development preview (when not in HubSpot)
import React from 'react';
import Index from './pages/Index';

export default Index;

// HubSpot component registration
declare global {
  interface Window {
    ContactInsights: React.ComponentType<{ hs_object_id: string }>;
    DealPipeline: React.ComponentType<{ hs_object_id: string }>;
    CompanyMetrics: React.ComponentType<{ hs_object_id: string }>;
  }
}

// Register components globally for HubSpot
if (typeof window !== 'undefined') {
  const ContactInsights = require('./components/ContactInsights').default;
  const DealPipeline = require('./components/DealPipeline').default;
  const CompanyMetrics = require('./components/CompanyMetrics').default;
  
  window.ContactInsights = ContactInsights;
  window.DealPipeline = DealPipeline;
  window.CompanyMetrics = CompanyMetrics;
}
