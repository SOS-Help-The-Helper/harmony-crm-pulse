
# Harmony HubSpot Components

A professional React application designed for HubSpot Developer Projects integration, providing business intelligence components that enhance HubSpot's CRM interface with data from Harmony Business Solutions' existing Supabase backend.

## 🚀 Features

### Three Main CRM Components

#### 1. ContactInsights Component
- **Purpose**: Enhanced contact analytics and engagement metrics
- **Props**: `contactId: string`
- **Features**:
  - Contact basic information display (name, email, phone, company)
  - Engagement score visualization with color-coded indicators
  - Total deals and deal value metrics
  - Last activity tracking
  - Harmony-specific analytics (response rate, preferred channel, timezone)

#### 2. DealPipeline Component
- **Purpose**: Deal management with probability scoring and insights
- **Props**: `dealId: string`
- **Features**:
  - Deal name, amount, and close date
  - Pipeline stage with color coding
  - Win probability calculation with visual indicators
  - Expected value computation
  - Next action recommendations
  - Interactive progress bar

#### 3. CompanyMetrics Component
- **Purpose**: Business intelligence and company health metrics
- **Props**: `companyId: string`
- **Features**:
  - Company basic info (name, industry, location, website)
  - Employee count and annual revenue
  - Health score with color indicators and emoji icons
  - Total deals and active contacts count
  - Business intelligence insights

## 🛠 Technology Stack

- **React 18.3.1** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Supabase** backend integration

## 🔗 Backend Integration

Each component connects to the existing Harmony Supabase backend:

- **Base URL**: `https://viwushnyjfdzaktsdjoo.supabase.co/functions/v1/hubspot/`
- **Endpoints**:
  - Contacts: `POST /contacts` with `{ objectId: contactId }`
  - Deals: `POST /deals` with `{ objectId: dealId }`
  - Companies: `POST /companies` with `{ objectId: companyId }`

## 🎨 UI/UX Features

- **Clean, Professional Design**: Modern interface using Tailwind CSS
- **Responsive Layout**: Works on different screen sizes
- **Loading States**: Skeleton loading animations for better UX
- **Error Handling**: User-friendly error messages with retry options
- **Color-Coded Metrics**: Semantic colors for quick data interpretation
- **Smooth Animations**: Fade-in transitions and hover effects

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for HubSpot

```bash
# Build as library for HubSpot integration
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ContactInsights.tsx    # Contact analytics component
│   ├── DealPipeline.tsx       # Deal management component
│   ├── CompanyMetrics.tsx     # Company intelligence component
│   ├── LoadingSkeleton.tsx    # Loading state component
│   └── ErrorMessage.tsx       # Error handling component
├── services/
│   └── api.ts                 # Supabase backend integration
├── types/
│   └── hubspot.ts            # TypeScript type definitions
├── pages/
│   └── Index.tsx             # Development preview page
└── index.tsx                 # Main export for HubSpot integration
```

## 🔧 HubSpot Integration

### Import Components

```typescript
import { ContactInsights, DealPipeline, CompanyMetrics } from './harmony-hubspot-components';

// Use in your HubSpot app
<ContactInsights contactId="contact-123" />
<DealPipeline dealId="deal-456" />
<CompanyMetrics companyId="company-789" />
```

### Available Exports

```typescript
// Components
export { ContactInsights, DealPipeline, CompanyMetrics }

// Types
export type { Contact, Deal, Company, APIResponse }

// API Functions
export { fetchContactData, fetchDealData, fetchCompanyData }
```

## 🎯 Key Success Criteria

✅ Components successfully fetch data from existing Harmony backend  
✅ All three components render correctly with real HubSpot data  
✅ Professional UI that matches HubSpot's design standards  
✅ Proper error handling and loading states  
✅ Ready for HubSpot Developer Projects import  
✅ Maintains separation from main Harmony application  

## 🔒 Configuration

### HubSpot Project Configuration

The project includes `hsproject.json` for HubSpot Developer Projects:

```json
{
  "name": "harmony-hubspot-components",
  "version": "1.0.0",
  "description": "Harmony Business Solutions HubSpot CRM Components",
  "srcDir": "src",
  "platformVersion": "2025.1",
  "app": {
    "displayName": "Harmony CRM Components",
    "description": "Business intelligence components for HubSpot CRM",
    "public": false,
    "appType": "PRIVATE"
  }
}
```

## 📈 Development Preview

The application includes a development preview with:
- Tab-based navigation between components
- Demo data inputs for testing
- Live component switching
- Professional header and footer

## 🤝 Contributing

This project is specifically designed for Harmony Business Solutions' HubSpot integration. For questions or support, please contact the Harmony development team.

---

**Built with ❤️ by Harmony Business Solutions**
