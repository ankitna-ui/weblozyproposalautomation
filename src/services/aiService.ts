import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AIFeature {
  id: string;
  text: string;
  category?: string;
}

const FALLBACK_FEATURES: Record<string, string[]> = {
  "lead management": [
    "Lead Capture and Tracking",
    "Automated Lead Scoring",
    "Lead Distribution and Assignment",
    "Real-time Lead Activity Monitoring",
    "Interaction History Tracking",
    "Email Marketing Integration",
    "Lead Nurturing Campaigns",
    "CRM Database Management",
    "Sales Pipeline Visualization",
    "Conversion Rate Analytics",
    "Mobile Lead Access",
    "Customizable Lead Fields",
    "Import/Export Functionality",
    "Team Collaboration Tools",
    "Automated Follow-up Reminders"
  ],
  "crm": [
    "Contact and Account Management",
    "Sales Opportunity Tracking",
    "Pipeline Management",
    "Task and Activity Management",
    "Email Integration and Syncing",
    "Customer Service Case Management",
    "Marketing Campaign Tracking",
    "Detailed Sales Reporting",
    "Dashboard Visualization",
    "Document Management Suite",
    "Calendar Integration",
    "Role-based Access Control",
    "Bulk Data Operations",
    "Mobile App Access",
    "Standard API Connectors"
  ],
  "inventory": [
    "Stock Level Monitoring",
    "SKU Management and Creation",
    "Warehouse Location Tracking",
    "Order Management and Processing",
    "Purchase Order Generation",
    "Supplier Relationship Management",
    "Barcode and QR Scanning Support",
    "Inventory Valuation Reporting",
    "Low Stock Alerts",
    "Reorder Point Automation",
    "Batch and Serial Tracking",
    "Returns and RMAs Processing",
    "Multi-location Support",
    "Inventory Audit Tools",
    "Shipping and Logistics Integration"
  ]
};

const getFallbackFeatures = (moduleName: string): string[] => {
  const normalized = moduleName.toLowerCase();
  for (const key in FALLBACK_FEATURES) {
    if (normalized.includes(key)) return FALLBACK_FEATURES[key];
  }
  return [
    "Core Dashboard Access",
    "User Permissions Management",
    "Basic Reporting Tools",
    "Data Import/Export",
    "Activity Log Tracking",
    "Notification System",
    "Secure API Access",
    "Mobile Optimization",
    "Centralized Database",
    "Professional Documentation"
  ];
};

export const fetchModuleFeatures = async (moduleName: string, customPrompt?: string): Promise<string[]> => {
  try {
    const prompt = customPrompt 
      ? `You are a product management expert. Generate a comprehensive list of all key features for a software module named: "${moduleName}". 
         Additionally, follow these specific instructions: ${customPrompt}`
      : `You are a product management expert. Generate a comprehensive list of all key features for a software module named: "${moduleName}".
         The list should be extensive, professional, and relevant to modern enterprise software.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${prompt}
      Return the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A comprehensive list of at least 15 key features for the module."
            }
          },
          required: ["features"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.features || getFallbackFeatures(moduleName);
  } catch (error: any) {
    console.error("AI Feature Fetch Failed:", error);
    // Silent fallback to keep the UI usable
    return getFallbackFeatures(moduleName);
  }
};

export const suggestExtraFeatures = async (moduleName: string, existingFeatures: string[]): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `For a module named "${moduleName}" that already has these features: ${existingFeatures.join(', ')}, suggest 5 additional advanced or innovative features.
      Return the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             suggestions: {
               type: Type.ARRAY,
               items: { type: Type.STRING },
               description: "A list of 5 extra feature suggestions."
             }
          },
          required: ["suggestions"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data.suggestions || [];
  } catch (error) {
    console.error("AI Suggestion Failed:", error);
    return [
      "Advanced AI Data Analytics",
      "Interactive Dashboard Widgets",
      "Automated Workflow Engine",
      "Seamless Third-party Integration",
      "Intelligent Voice Assistant Control"
    ];
  }
};

export interface ModuleValidation {
  isValid: boolean;
  suggestion?: string;
}

export const validateModuleName = async (name: string): Promise<ModuleValidation> => {
  if (!name.trim() || name.length < 3) return { isValid: true };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert product manager. Validate this software module name: "${name}". 
      If it's misspelled or could be named better in a professional enterprise context, mark isValid as false and provide a better suggestion. 
      If it's already professional and spelled correctly, mark isValid as true.
      Return the response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN },
            suggestion: { type: Type.STRING }
          },
          required: ["isValid"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return {
      isValid: data.isValid,
      suggestion: data.suggestion
    };
  } catch (error) {
    console.error("AI Validation Failed:", error);
    return { isValid: true };
  }
};
