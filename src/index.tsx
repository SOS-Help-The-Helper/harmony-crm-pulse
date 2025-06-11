
// Development preview export
import React from 'react';
import Index from './pages/Index';

export default Index;

// Individual component exports for HubSpot
export { default as ContactInsights } from './ContactInsights';
export { default as DealPipeline } from './DealPipeline';
export { default as CompanyMetrics } from './CompanyMetrics';

// Export types for TypeScript support
export type { Contact, Deal, Company, APIResponse } from './types/hubspot';

// Export API functions for custom integrations
export { fetchContactData, fetchDealData, fetchCompanyData } from './services/api';
