
// Main export file for HubSpot Developer Projects integration
export { default as ContactInsights } from './components/ContactInsights';
export { default as DealPipeline } from './components/DealPipeline';
export { default as CompanyMetrics } from './components/CompanyMetrics';

// Export types for TypeScript support
export type { Contact, Deal, Company, APIResponse } from './types/hubspot';

// Export API functions for custom integrations
export { fetchContactData, fetchDealData, fetchCompanyData } from './services/api';

// Default export for development preview
export { default } from './pages/Index';
