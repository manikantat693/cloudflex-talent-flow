// Website Knowledge Base for CloudFlex IT Solutions
export interface ServiceInfo {
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing?: string;
}

export interface JobInfo {
  title: string;
  level: string;
  requirements: string[];
  skills: string[];
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  founded: string;
  mission: string;
  values: string[];
  specialties: string[];
  industries: string[];
  location: string;
  globalReach: boolean;
}

export interface TechnicalCapability {
  area: string;
  description: string;
  technologies: string[];
  outcomes: string[];
}

export const COMPANY_INFO: CompanyInfo = {
  name: "CloudFlex IT Solutions",
  tagline: "Your Gateway to Tech Excellence",
  founded: "2020",
  mission: "Empowering professionals and organizations to achieve their technology goals through innovative solutions and exceptional talent placement services.",
  values: [
    "Excellence in service delivery",
    "Innovation and continuous learning", 
    "Client-centric approach",
    "Diversity and inclusion",
    "Professional integrity"
  ],
  specialties: [
    "Custom App Development",
    "AI & Automation Solutions",
    "Cloud & DevOps Services",
    "Data & Analytics",
    "IT Talent Staffing",
    "Immigration Services"
  ],
  industries: ["FinServ", "Healthcare", "SaaS", "Technology", "Manufacturing", "Government"],
  location: "United States",
  globalReach: true
};

export const SERVICES: ServiceInfo[] = [
  {
    name: "Custom App Development",
    description: "We build scalable, secure applications using modern technologies like Java/Spring Boot, Vue/React, and cloud-native architectures.",
    features: [
      "Java/Spring Boot backend development",
      "Vue/React frontend applications", 
      "Microservices architecture",
      "API development and integration",
      "Database design and optimization",
      "Cloud-native deployment"
    ],
    benefits: [
      "Scalable and maintainable code",
      "Modern tech stack",
      "99.9% uptime target",
      "Built-in security measures"
    ],
    pricing: "Contact for custom quotes based on project scope"
  },
  {
    name: "AI & Automation Solutions",
    description: "AI-powered chatbots, workflow automation, and intelligent analytics to transform your business processes.",
    features: [
      "AI chatbots with RAG (Retrieval-Augmented Generation)",
      "Workflow automation",
      "Intelligent document processing",
      "Real-time analytics and insights",
      "Enterprise system integrations",
      "AI guardrails and monitoring"
    ],
    benefits: [
      "Improved operational efficiency",
      "24/7 intelligent customer support",
      "Reduced manual work",
      "Data-driven decision making"
    ],
    pricing: "Starter, Growth, and Enterprise tiers available"
  },
  {
    name: "Cloud & DevOps Services",
    description: "Kubernetes deployment, CI/CD pipelines, and observability solutions for scalable cloud infrastructure.",
    features: [
      "Kubernetes auto-scaling and load balancing",
      "CI/CD pipeline setup and optimization",
      "Blue/green and canary deployments",
      "Infrastructure as Code (IaC)",
      "Observability (logs, metrics, tracing)",
      "Automated rollback mechanisms"
    ],
    benefits: [
      "Zero-downtime deployments",
      "Enhanced system reliability",
      "Faster time to market",
      "Reduced operational costs"
    ],
    pricing: "Based on infrastructure size and complexity"
  },
  {
    name: "Data & Analytics",
    description: "Transform your data into actionable insights with custom dashboards, analytics, and anomaly detection.",
    features: [
      "Custom dashboard development",
      "Real-time data processing",
      "Anomaly detection systems",
      "Predictive analytics",
      "Data pipeline automation",
      "Business intelligence solutions"
    ],
    benefits: [
      "Data-driven insights",
      "Improved business outcomes",
      "Automated reporting",
      "Competitive advantage"
    ],
    pricing: "Flexible based on data volume and complexity"
  },
  {
    name: "IT Talent Staffing",
    description: "Vetted engineers for Java, frontend, DevOps, and data roles. Contract and remote positions available.",
    features: [
      "Multi-round technical screening",
      "Communication & cultural fit evaluation",
      "U.S. client experience preferred",
      "Quick onboarding process",
      "Replacement guarantee if needed",
      "Contract and permanent placements"
    ],
    benefits: [
      "Pre-screened, qualified candidates",
      "Reduced hiring time",
      "Cultural fit assurance",
      "Ongoing support"
    ],
    pricing: "No fees for candidates - paid by client companies"
  },
  {
    name: "Immigration Support Services", 
    description: "Comprehensive visa and immigration assistance for IT professionals.",
    features: [
      "H1B visa processing and renewal",
      "L1 visa assistance",
      "OPT and STEM OPT guidance",
      "Green Card processing",
      "Document preparation and review"
    ],
    benefits: [
      "Expert legal guidance",
      "Streamlined application process",
      "Regular status updates",
      "High success rate"
    ],
    pricing: "Varies by visa type and case complexity"
  }
];

export const CURRENT_JOBS: JobInfo[] = [
  {
    title: "Java Developer",
    level: "Mid to Senior Level",
    requirements: [
      "3+ years Java development experience",
      "Spring Boot framework expertise",
      "Microservices architecture knowledge",
      "Database design and optimization"
    ],
    skills: ["Java", "Spring Boot", "REST APIs", "SQL", "Git", "Agile"]
  },
  {
    title: "DevOps Engineer", 
    level: "Senior Level",
    requirements: [
      "5+ years DevOps experience",
      "Cloud platforms (AWS/Azure/GCP)",
      "CI/CD pipeline design",
      "Infrastructure as Code"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Python"]
  },
  {
    title: "Data Scientist",
    level: "Mid Level",
    requirements: [
      "3+ years data science experience",
      "Machine learning expertise",
      "Statistical analysis skills",
      "Data visualization"
    ],
    skills: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Tableau"]
  },
  {
    title: "Cloud Architect",
    level: "Senior Level", 
    requirements: [
      "7+ years cloud architecture experience",
      "Multi-cloud expertise",
      "Security best practices",
      "Solution design"
    ],
    skills: ["AWS", "Azure", "GCP", "Kubernetes", "Security", "Architecture"]
  },
  {
    title: "React Developer",
    level: "Mid Level",
    requirements: [
      "3+ years React development",
      "Modern JavaScript/TypeScript",
      "State management",
      "Frontend optimization"
    ],
    skills: ["React", "TypeScript", "Redux", "CSS", "Node.js", "Git"]
  },
  {
    title: "Cybersecurity Specialist",
    level: "Senior Level",
    requirements: [
      "5+ years cybersecurity experience", 
      "Security frameworks knowledge",
      "Threat assessment skills",
      "Compliance expertise"
    ],
    skills: ["Security Analysis", "Penetration Testing", "CISSP", "Risk Assessment"]
  }
];

export const CONTACT_INFO = {
  phone: "336-281-2871",
  email: "admin@cloudflexit.com", 
  hrEmail: "hr@cloudflexit.com",
  address: "10926 David Taylor Dr., Ste 120 PMB369, Charlotte, NC 28262",
  website: "cloudflexit.com",
  hours: "Monday - Friday, 9:00 AM - 6:00 PM EST"
};

export const TECHNICAL_CAPABILITIES: TechnicalCapability[] = [
  {
    area: "Scalability & Uptime",
    description: "Enterprise-grade infrastructure designed for high availability and performance",
    technologies: ["Kubernetes", "Load Balancers", "Auto-scaling", "Observability Tools"],
    outcomes: ["99.9% uptime target", "Automatic scaling", "Performance monitoring", "Stress testing"]
  },
  {
    area: "Legacy Migration",
    description: "Seamless cloud migration with minimal disruption to business operations",
    technologies: ["Java", ".NET", "Oracle", "Containerization", "CI/CD"],
    outcomes: ["Modernized architecture", "Reduced operational costs", "Improved performance", "Enhanced security"]
  },
  {
    area: "Security & Compliance",
    description: "Enterprise security with industry-standard compliance frameworks",
    technologies: ["SOC2", "HIPAA", "GDPR", "Secret Management", "Access Controls"],
    outcomes: ["Regulatory compliance", "Data protection", "Risk mitigation", "Audit readiness"]
  },
  {
    area: "AI Integration",
    description: "Intelligent automation integrated with existing enterprise systems",
    technologies: ["RAG", "API Integration", "CRM/ERP", "Real-time Analytics", "AI Guardrails"],
    outcomes: ["Process automation", "Enhanced decision making", "Cost reduction", "ROI tracking"]
  }
];

export const PRICING_TIERS = {
  starter: {
    name: "Starter",
    description: "Perfect for pilot projects and small teams",
    features: ["1 pilot use case", "Basic support", "Core features"],
    pricing: "Contact for quote"
  },
  growth: {
    name: "Growth", 
    description: "Ideal for growing businesses with multiple use cases",
    features: ["2-3 use cases", "Observability included", "Priority support", "Advanced features"],
    pricing: "Contact for quote"
  },
  enterprise: {
    name: "Enterprise",
    description: "Comprehensive solution for large organizations",
    features: ["Dedicated team", "SLAs included", "Security reviews", "Custom integrations", "24/7 support"],
    pricing: "Contact for quote"
  }
};

export const DELIVERY_PROCESS = [
  {
    phase: "Discover & Design",
    description: "Assess requirements, pain points, and define solution architecture",
    deliverables: ["Requirements analysis", "Technical design", "Project timeline"]
  },
  {
    phase: "Build & Deploy", 
    description: "Develop scalable, secure applications with modern best practices",
    deliverables: ["Code development", "Testing", "Deployment", "Documentation"]
  },
  {
    phase: "Measure & Optimize",
    description: "Track KPIs, monitor performance, and continuously improve",
    deliverables: ["Performance monitoring", "Analytics setup", "Optimization recommendations"]
  }
];

export const FAQ_DATA = [
  {
    question: "How do I apply for a job?",
    answer: "You can apply by clicking on any job position in our Current Opportunities section and submitting your resume. We review all applications within 24-48 hours."
  },
  {
    question: "Do you charge fees for job placement?",
    answer: "No, our job placement services are completely free for candidates. We are paid by our client companies when we successfully place qualified professionals."
  },
  {
    question: "What is the typical visa processing time?",
    answer: "Processing times vary by visa type: H1B typically takes 2-4 months, L1 takes 1-3 months, and Green Card processing can take 1-3 years depending on your country of birth and category."
  },
  {
    question: "Do you provide remote job opportunities?",
    answer: "Yes, we offer both remote and on-site positions. Many of our clients offer flexible work arrangements including fully remote, hybrid, and traditional office-based roles."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve multiple industries including FinServ, Healthcare, SaaS, Technology, Manufacturing, and Government, all requiring skilled IT professionals."
  },
  {
    question: "Do you provide free consultations?",
    answer: "Yes, initial consultations are free. We use them to map goals, pain points, and quick wins."
  },
  {
    question: "How do you ensure scalability and uptime?",
    answer: "We use Kubernetes auto-scaling, load balancers, stress testing for transaction spikes, and built-in observability with a target uptime of 99.9%."
  },
  {
    question: "How do you handle data security & compliance?",
    answer: "We follow SOC2-friendly patterns, HIPAA-ready for healthcare, GDPR-aligned for EU users, with strong secret management and least-privilege access."
  }
];

export const IMMIGRATION_INFO = {
  visaTypes: [
    {
      type: "H1B",
      description: "For specialty occupations requiring bachelor's degree or higher",
      duration: "3 years, renewable once for total of 6 years"
    },
    {
      type: "L1",
      description: "For intra-company transfers from foreign offices", 
      duration: "1-3 years depending on role"
    },
    {
      type: "OPT/STEM OPT",
      description: "For recent graduates to gain practical training",
      duration: "12 months + 24 months STEM extension"
    },
    {
      type: "Green Card",
      description: "Permanent residence in the United States",
      duration: "Permanent (renewable every 10 years)"
    }
  ],
  process: [
    "Initial consultation and document review",
    "Application preparation and filing",
    "Regular status updates and communication",
    "Interview preparation (if required)",
    "Final approval and documentation"
  ]
};