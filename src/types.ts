export interface PortfolioItem {
  id: string;
  name: string;
  url: string;
}

export interface ModuleFeature {
  id: string;
  text: string;
  isSelected: boolean;
  price?: number;
}

export interface Module {
  id: string;
  name: string;
  features: ModuleFeature[];
  price: number;
  color?: string;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface ExpansionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  features?: string[];
}

export interface PaymentTerm {
  id: string;
  label: string;
  percentage: number;
  features?: string[];
}

export interface ProposalData {
  companyName: string;
  clientName: string;
  industry: string;
  currency: Currency;
  services: string[];
  selectedModules: string[];
  customModules: Module[];
  basePrice: number;
  discount: number;
  discountType: 'percent' | 'flat';
  additionalDiscount: number;
  portfolio: PortfolioItem[];
  futureExpansion: ExpansionItem[];
  taxRate: number;
  paymentTerms: PaymentTerm[];
  flowchartImage?: string;
  selectedPages: string[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontStyle: string;
  };
  yearsExperience: number;
  projectsDelivered: number;
  clientCompany: string;
  leadId: string;
  proposalPurpose: string;
  problem: string;
  estimatedDays: number;
  proposalStatus: string;
  documentRefLabel: string;
  frameworkLabel: string;
  roadmapDescription: string;
  flowchartTitle: string;
  flowchartSubtitle: string;
  flowchartNote: string;
  architecturalNoteTitle: string;
  architecturalNoteContent: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutIntroText: string;
  aboutQuote: string;
  aboutManifesto: string;
  aboutImageTitle: string;
  aboutImageSubtitle: string;
  contactEmail: string;
  contactPhone1: string;
  contactPhone2: string;
  contactWebsite: string;
  contactAddress: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialYoutube: string;
  flowchartDemoLink: string;
  coverLogoUrl: string;
  companyTagline: string;
}

export const DEFAULT_PROPOSAL: ProposalData = {
  companyName: "Weblozy",
  clientName: "Valued Client",
  industry: "Business Automation",
  currency: "INR",
  services: [
    "Business Automation",
    "eCommerce Development",
    "Software Development",
    "Website & Portal Development",
    "Mobile Application Development",
    "Digital Marketing",
    "Search Engine Optimization (SEO)",
    "Business Intelligence & Data Analytics",
    "Cloud Software Development",
    "Blockchain Development",
    "LinkedIn Automation",
    "SaaS Consulting & Development"
  ],
  selectedModules: [],
  customModules: [],
  basePrice: 10000,
  discount: 15,
  discountType: 'percent',
  additionalDiscount: 500,
  portfolio: [
    { id: '1', name: 'Premium Hosting Portal', url: 'https://snow-wombat-148981.hostingersite.com/' },
    { id: '2', name: 'Modern UX Showcase', url: 'https://weblozydemocool.netlify.app/' },
    { id: '3', name: 'AI Analytics Engine', url: 'https://weblozyaianalyzer.vercel.app/' },
    { id: '4', name: 'Enterprise SaaS Suite', url: 'https://weblozyenterprisedemo.netlify.app/' },
  ],
  futureExpansion: [],
  taxRate: 18,
  paymentTerms: [
    { id: '1', label: 'Commencement Advance', percentage: 50, features: ['Strategic Planning', 'Architecture Setup', 'Resource Allocation'] },
    { id: '2', label: 'Progress Milestone', percentage: 30, features: ['Core Module Development', 'Beta Testing', 'UI/UX Finalization'] },
    { id: '3', label: 'Final Delivery', percentage: 20, features: ['UAT & Deployment', 'Training & Documentation', 'Global Launch'] }
  ],
  flowchartImage: "https://media.istockphoto.com/id/1650117768/vector/thin-line-black-camera-logo-like-upload-your-photo-graphic-art-design-element-isolated-on.jpg?s=612x612&w=0&k=20&c=UzYU29nhSCA4Ik9sEORBZy9Sie0muH8k3MmUopfIqeo=",
  selectedPages: ['cover', 'about', 'problem', 'flowchart', 'modules', 'expansion', 'pricing', 'portfolio', 'terms', 'cta'],
  theme: {
    primaryColor: "#1AA3D9",
    secondaryColor: "#98BF45",
    fontStyle: "Inter"
  },
  yearsExperience: 10,
  projectsDelivered: 250,
  clientCompany: "Enterprise Corp",
  leadId: "#WBL-2024-001",
  proposalPurpose: "Digital Transformation & Business Automation",
  problem: "Weblozy\u2019s Cloud Software Development Service opens a doorway to your future business. We build an avant-garde cloud solution that has to guarantee growth and triumph for your company in this digitized world. Our expert team applies advanced techniques to construct fast, secure, and user-friendly software applications. \n\nWe value your specific requirements and design tailored cloud systems to merge with your objective. With Weblozy, you will remain competitive and ready for the next big thing.\n\nOur experts in the development of cloud software can see into your operation and have the technical prowess to bring about transformation. We will move your systems to the cloud, making you efficient, collaborate more effectively, and reduce your IT costs. In partnership with us, enjoy the freedom and flexibility of seamlessly integrated cloud-based tools.",
  estimatedDays: 45,
  proposalStatus: "CONFIDENTIAL, STABLE-V2",
  documentRefLabel: "Document Reference",
  frameworkLabel: "Executive Framework",
  roadmapDescription: "Bespoke Technical & \nOperational Roadmap",
  flowchartTitle: "Flowchart.",
  flowchartSubtitle: "Section 04",
  flowchartNote: "Visualizing the logic sequence of the system.",
  architecturalNoteTitle: "Architectural Note",
  architecturalNoteContent: "The system is designed to handle asynchronous data processing, ensuring no bottleneck during peak operational hours.",
  aboutTitle: "About",
  aboutSubtitle: "Company.",
  aboutIntroText: "We at Weblozy are committed to providing you with the best solution in all our online services and the best support in the industry. Weblozy is a leading and reputed Business Automation, SaaS, web development and Digital Marketing company based out of New Delhi.",
  aboutQuote: "We have completely mastered the art of digital technology.",
  aboutManifesto: "Are you ready to break free from the monochrome monotony of traditional tech solutions? Welcome to Weblozy. Where your business isn’t just optimized – it’s immortalized.",
  aboutImageTitle: "Innovation Hub.",
  aboutImageSubtitle: "Global Delivery HQ",
  contactEmail: "info@weblozy.com",
  contactPhone1: "+91 96678 96604",
  contactPhone2: "+1 320 433 0111",
  contactWebsite: "www.weblozy.com",
  contactAddress: "Weblozy HQ, New Delhi, India",
  socialInstagram: "https://www.instagram.com/weblozy/",
  socialLinkedin: "https://www.linkedin.com/company/weblozy/",
  socialFacebook: "https://www.facebook.com/weblozy",
  socialYoutube: "https://www.youtube.com/@weblozy",
  flowchartDemoLink: "https://weblozy.com/demo",
  coverLogoUrl: "/images/banner_image.png",
  companyTagline: "SOLUTIONS • GLOBAL OPERATIONS"
};

export const AVAILABLE_MODULES: Module[] = [];

export const PAGES = [
  { id: 'cover', label: 'Cover Page' },
  { id: 'about', label: 'About Company' },
  { id: 'problem', label: 'Cloud Software Development' },
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'modules', label: 'Modules & Features' },
  { id: 'expansion', label: 'Future Expansion' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio Showcase' },
  { id: 'terms', label: 'The Automation Shift' },
  { id: 'cta', label: 'Contact Us' },
];
