
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  engagementScore: number;
  totalDeals: number;
  dealValue: number;
  lastActivity: string;
  harmonayAnalytics: {
    responseRate: number;
    preferredChannel: string;
    timezone: string;
  };
}

export interface Deal {
  id: string;
  name: string;
  amount: number;
  closeDate: string;
  stage: string;
  probability: number;
  expectedValue: number;
  nextAction: string;
  stageColor: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  employeeCount: number;
  annualRevenue: number;
  healthScore: number;
  totalDeals: number;
  activeContacts: number;
  insights: string[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
