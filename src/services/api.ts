import { Contact, Deal, Company, APIResponse } from '../types/hubspot';

const BASE_URL = 'https://viwushnyjfdzaktsdjoo.supabase.co/functions/v1/hubspot';

// Mock data for demo purposes
const mockContact: Contact = {
  id: 'demo-contact-001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  company: 'Acme Corporation',
  engagementScore: 85,
  totalDeals: 3,
  dealValue: 150000,
  lastActivity: '2 days ago',
  harmonayAnalytics: {
    responseRate: 92,
    preferredChannel: 'Email',
    timezone: 'PST'
  }
};

const mockDeal: Deal = {
  id: 'demo-deal-001',
  name: 'Enterprise Software License',
  amount: 75000,
  closeDate: '2024-01-15',
  stage: 'Proposal',
  probability: 75,
  expectedValue: 56250,
  nextAction: 'Schedule follow-up call with decision maker',
  stageColor: '#3B82F6'
};

const mockCompany: Company = {
  id: 'demo-company-001',
  name: 'Acme Corporation',
  industry: 'Technology',
  location: 'San Francisco, CA',
  website: 'https://acme.com',
  employeeCount: 500,
  annualRevenue: 50000000,
  healthScore: 88,
  totalDeals: 12,
  activeContacts: 45,
  insights: [
    'Revenue growth of 25% compared to last quarter',
    'High engagement across multiple touchpoints',
    'Strong potential for upselling opportunities'
  ]
};

const apiCall = async <T>(endpoint: string, objectId: string): Promise<T> => {
  try {
    console.log(`Making API call to ${BASE_URL}${endpoint} for object ${objectId}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objectId }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const result: APIResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'API call failed');
    }

    return result.data;
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    
    // For demo purposes, return mock data when API fails
    if (endpoint === '/contacts') {
      console.log('Returning mock contact data for demo');
      return mockContact as T;
    } else if (endpoint === '/deals') {
      console.log('Returning mock deal data for demo');
      return mockDeal as T;
    } else if (endpoint === '/companies') {
      console.log('Returning mock company data for demo');
      return mockCompany as T;
    }
    
    throw error;
  }
};

export const fetchContactData = (contactId: string): Promise<Contact> => {
  return apiCall<Contact>('/contacts', contactId);
};

export const fetchDealData = (dealId: string): Promise<Deal> => {
  return apiCall<Deal>('/deals', dealId);
};

export const fetchCompanyData = (companyId: string): Promise<Company> => {
  return apiCall<Company>('/companies', companyId);
};
