
import { Contact, Deal, Company, APIResponse } from '@/types/hubspot';

const BASE_URL = 'https://viwushnyjfdzaktsdjoo.supabase.co/functions/v1/hubspot';

const apiCall = async <T>(endpoint: string, objectId: string): Promise<T> => {
  try {
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
